import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "grvnth.design@gmail.com";
type Section = { id: string; name: string; slug: string; description: string; cover_path: string | null; display_order: number; visible: boolean };
type Project = { id: string; section_id: string; title: string; description: string; media_paths: string[]; video_path: string | null; video_url: string | null; tags: string[]; client_name: string | null; project_year: number | null; featured: boolean; display_order: number; published: boolean; created_at: string };
type Tab = "Dashboard" | "Projects" | "Sections" | "Upload" | "Settings";

const blankProject = { title: "", section_id: "", description: "", tags: "", client_name: "", project_year: "", featured: false, display_order: "0", published: true, video_url: "" };
const blankSection = { name: "", slug: "", description: "", display_order: "0", visible: true };
const fieldClass = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function PortfolioAdmin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [sections, setSections] = useState<Section[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uploadState, setUploadState] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState(blankProject);
  const [sectionForm, setSectionForm] = useState(blankSection);
  const [projectFiles, setProjectFiles] = useState<File[]>([]);
  const [sectionCover, setSectionCover] = useState<File | null>(null);

  async function load() {
    setLoading(true);
    const [{ data: sectionRows, error: sectionError }, { data: projectRows, error: projectError }] = await Promise.all([
      supabase.from("portfolio_sections").select("*").order("display_order"),
      supabase.from("portfolio_projects").select("*").order("display_order").order("created_at", { ascending: false }),
    ]);
    if (sectionError || projectError) toast.error("Could not load portfolio content. Check your account access.");
    setSections((sectionRows ?? []) as Section[]);
    setProjects((projectRows ?? []) as Project[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const matchesSearch = `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === "all" || project.section_id === filter);
  }), [projects, search, filter]);

  function resetProject() {
    setProjectForm({ ...blankProject, section_id: sections[0]?.id ?? "" });
    setProjectFiles([]);
    setEditingProject(null);
  }

  function startProjectEdit(project: Project) {
    setTab("Upload");
    setEditingProject(project.id);
    setProjectForm({ title: project.title, section_id: project.section_id, description: project.description, tags: project.tags.join(", "), client_name: project.client_name ?? "", project_year: project.project_year?.toString() ?? "", featured: project.featured, display_order: project.display_order.toString(), published: project.published, video_url: project.video_url ?? "" });
    setProjectFiles([]);
  }

  function startSectionEdit(section: Section) {
    setEditingSection(section.id);
    setSectionForm({ name: section.name, slug: section.slug, description: section.description, display_order: section.display_order.toString(), visible: section.visible });
    setSectionCover(null);
  }

  async function uploadFile(file: File, folder: string) {
    const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-120);
    const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file, { contentType: file.type || undefined, upsert: false });
    if (error) throw error;
    return path;
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectForm.title.trim() || !projectForm.section_id) { toast.error("Add a title and choose a section."); return; }
    setBusy(true);
    try {
      const old = editingProject ? projects.find((item) => item.id === editingProject) : undefined;
      const mediaPaths = [...(old?.media_paths ?? [])];
      for (let i = 0; i < projectFiles.length; i += 1) {
        setUploadState(`Uploading ${i + 1} of ${projectFiles.length}…`);
        mediaPaths.push(await uploadFile(projectFiles[i], `projects/${editingProject ?? crypto.randomUUID()}`));
      }
      const videoFile = projectFiles.find((file) => file.type.startsWith("video/"));
      const uploadedVideoPath = videoFile ? mediaPaths[mediaPaths.length - 1] : old?.video_path ?? null;
      const imagePaths = mediaPaths.filter((path) => !path.toLowerCase().match(/\.(mp4|mov|webm)$/));
      const payload = {
        title: projectForm.title.trim(), section_id: projectForm.section_id, description: projectForm.description.trim(),
        media_paths: imagePaths, video_path: uploadedVideoPath, video_url: projectForm.video_url.trim() || null,
        tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 24),
        client_name: projectForm.client_name.trim() || null, project_year: projectForm.project_year ? Number(projectForm.project_year) : null,
        featured: projectForm.featured, display_order: Number(projectForm.display_order) || 0, published: projectForm.published, updated_at: new Date().toISOString(),
      };
      const result = editingProject
        ? await supabase.from("portfolio_projects").update(payload).eq("id", editingProject)
        : await supabase.from("portfolio_projects").insert(payload);
      if (result.error) throw result.error;
      toast.success(projectForm.published ? "Project published." : "Project saved as a draft.");
      resetProject();
      await load();
      setTab("Projects");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save this project.");
    } finally { setBusy(false); setUploadState(""); }
  }

  async function saveSection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = sectionForm.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!sectionForm.name.trim() || !slug) { toast.error("Add a section name and valid slug."); return; }
    setBusy(true);
    try {
      let coverPath = editingSection ? sections.find((item) => item.id === editingSection)?.cover_path ?? null : null;
      if (sectionCover) { setUploadState("Uploading cover…"); coverPath = await uploadFile(sectionCover, "sections"); }
      const payload = { name: sectionForm.name.trim(), slug, description: sectionForm.description.trim(), display_order: Number(sectionForm.display_order) || 0, visible: sectionForm.visible, cover_path: coverPath, updated_at: new Date().toISOString() };
      const result = editingSection
        ? await supabase.from("portfolio_sections").update(payload).eq("id", editingSection)
        : await supabase.from("portfolio_sections").insert(payload);
      if (result.error) throw result.error;
      toast.success(editingSection ? "Section updated." : "Section created.");
      setEditingSection(null); setSectionForm(blankSection); setSectionCover(null);
      await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to save this section."); }
    finally { setBusy(false); setUploadState(""); }
  }

  async function deleteProject(project: Project) {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", project.id);
    if (error) toast.error(error.message); else { toast.success("Project deleted."); await load(); }
  }

  async function deleteSection(section: Section) {
    const items = projects.filter((project) => project.section_id === section.id);
    let moveTo: string | null = null;
    if (items.length) {
      const choices = sections.filter((item) => item.id !== section.id);
      if (!choices.length) { toast.error("Create another section before removing this one."); return; }
      const selected = window.prompt(`Move ${items.length} project(s) to which section? Enter the exact name: ${choices.map((item) => item.name).join(", ")}`);
      if (!selected) return;
      moveTo = choices.find((item) => item.name.toLowerCase() === selected.trim().toLowerCase())?.id ?? null;
      if (!moveTo) { toast.error("Section name did not match. Nothing was changed."); return; }
      const moved = await supabase.from("portfolio_projects").update({ section_id: moveTo }).eq("section_id", section.id);
      if (moved.error) { toast.error(moved.error.message); return; }
    }
    if (!window.confirm(`Delete section “${section.name}”?${items.length ? ` Its ${items.length} project(s) will move first.` : ""}`)) return;
    const { error } = await supabase.from("portfolio_sections").delete().eq("id", section.id);
    if (error) toast.error(error.message); else { toast.success("Section deleted."); await load(); }
  }

  async function updateVisibility(project: Project) {
    const { error } = await supabase.from("portfolio_projects").update({ published: !project.published }).eq("id", project.id);
    if (error) toast.error(error.message); else { toast.success(project.published ? "Project unpublished." : "Project published."); await load(); }
  }

  async function reorderSection(section: Section, offset: number) {
    const ordered = [...sections].sort((a, b) => a.display_order - b.display_order);
    const index = ordered.findIndex((item) => item.id === section.id);
    const target = index + offset;
    if (target < 0 || target >= ordered.length) return;
    [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
    const results = await Promise.all(ordered.map((item, order) => supabase.from("portfolio_sections").update({ display_order: order }).eq("id", item.id)));
    if (results.some((result) => result.error)) toast.error("Could not reorder sections."); else await load();
  }

  async function logout() {
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  const recent = [...projects].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  const tabs: Tab[] = ["Dashboard", "Projects", "Sections", "Upload", "Settings"];

  return <main className="min-h-screen bg-background text-foreground">
    <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="border-b border-border px-4 py-4 md:border-b-0 md:border-r md:px-5 md:py-8">
        <div className="flex items-center justify-between md:block"><Link to="/" className="font-display text-2xl font-bold">Granth<span className="text-muted-foreground">.</span></Link><span className="text-xs text-muted-foreground md:mt-2 md:block">Portfolio studio</span></div>
        <nav className="mt-5 flex gap-1 overflow-x-auto md:mt-10 md:flex-col" aria-label="Dashboard navigation">
          {tabs.map((item) => <Button key={item} variant={tab === item ? "secondary" : "ghost"} className="shrink-0 justify-start" onClick={() => { setTab(item); if (item === "Upload") resetProject(); }}>{item}</Button>)}
        </nav>
        <div className="mt-5 flex gap-2 md:mt-12 md:flex-col"><Button variant="outline" className="flex-1 md:flex-none" onClick={() => void load()}>Refresh</Button><Button variant="ghost" className="flex-1 justify-start md:flex-none" onClick={() => void logout()}>Sign out</Button></div>
      </aside>

      <section className="min-w-0 px-4 py-6 sm:px-7 md:px-10 md:py-10">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5"><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Portfolio management</p><h1 className="mt-2 font-display text-3xl font-bold">{tab}</h1></div><p className="max-w-full break-all text-xs text-muted-foreground">{ADMIN_EMAIL}</p></header>
        {loading ? <p className="py-16 text-center text-sm text-muted-foreground">Loading your portfolio…</p> : null}

        {!loading && tab === "Dashboard" && <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Projects", projects.length], ["Sections", sections.length], ["Published", projects.filter((item) => item.published).length], ["Featured", projects.filter((item) => item.featured).length]].map(([label, value]) => <div key={String(label)} className="border-b border-border py-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 font-display text-4xl font-bold">{value}</p></div>)}</div>
          <div className="flex flex-wrap gap-2"><Button onClick={() => { resetProject(); setTab("Upload"); }}>Add project</Button><Button variant="outline" onClick={() => { setTab("Sections"); setEditingSection(null); setSectionForm(blankSection); }}>Add section</Button></div>
          <div><h2 className="mb-3 font-display text-xl font-semibold">Recently added</h2>{recent.length ? <div className="divide-y divide-border">{recent.map((project) => <ProjectRow key={project.id} project={project} section={sections.find((item) => item.id === project.section_id)?.name ?? "—"} onEdit={() => startProjectEdit(project)} onDelete={() => void deleteProject(project)} onPublish={() => void updateVisibility(project)} />)}</div> : <EmptyState message="Your published work will appear here." />}</div>
        </div>}

        {!loading && tab === "Projects" && <div><div className="mb-4 grid gap-2 sm:grid-cols-[1fr_220px]"><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" aria-label="Search projects"/><select className={fieldClass} value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All sections</option>{sections.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)}</select></div><div className="divide-y divide-border">{filteredProjects.map((project) => <ProjectRow key={project.id} project={project} section={sections.find((item) => item.id === project.section_id)?.name ?? "—"} onEdit={() => startProjectEdit(project)} onDelete={() => void deleteProject(project)} onPublish={() => void updateVisibility(project)} />)}</div>{filteredProjects.length === 0 && <EmptyState message="No projects match this search." />}</div>}

        {!loading && tab === "Sections" && <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]"><div className="divide-y divide-border">{sections.map((section) => <div key={section.id} className="py-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h2 className="font-semibold">{section.name}</h2><p className="mt-1 break-all text-xs text-muted-foreground">/{section.slug} · {projects.filter((item) => item.section_id === section.id).length} projects · {section.visible ? "Visible" : "Hidden"}</p>{section.description && <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>}</div><div className="flex shrink-0 flex-wrap gap-1"><Button variant="ghost" size="sm" aria-label={`Move ${section.name} up`} onClick={() => void reorderSection(section, -1)}>↑</Button><Button variant="ghost" size="sm" aria-label={`Move ${section.name} down`} onClick={() => void reorderSection(section, 1)}>↓</Button><Button variant="outline" size="sm" onClick={() => startSectionEdit(section)}>Edit</Button><Button variant="ghost" size="sm" onClick={() => void deleteSection(section)}>Delete</Button></div></div></div>)}{sections.length === 0 && <EmptyState message="Create your first portfolio section." />}</div>
          <form className="space-y-3 border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0" onSubmit={saveSection}><h2 className="font-display text-xl font-semibold">{editingSection ? "Edit section" : "Add section"}</h2><Input className={fieldClass} placeholder="Section name" required maxLength={100} value={sectionForm.name} onChange={(event) => setSectionForm({ ...sectionForm, name: event.target.value, slug: editingSection ? sectionForm.slug : event.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })}/><Input className={fieldClass} placeholder="URL slug" required value={sectionForm.slug} onChange={(event) => setSectionForm({ ...sectionForm, slug: event.target.value })}/><Textarea className={fieldClass} placeholder="Optional description" maxLength={1200} value={sectionForm.description} onChange={(event) => setSectionForm({ ...sectionForm, description: event.target.value })}/><Input className={fieldClass} type="number" placeholder="Display order" value={sectionForm.display_order} onChange={(event) => setSectionForm({ ...sectionForm, display_order: event.target.value })}/><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sectionForm.visible} onChange={(event) => setSectionForm({ ...sectionForm, visible: event.target.checked })}/>Show on public portfolio</label><label className="block text-sm text-muted-foreground">Optional cover image<Input type="file" accept="image/*" className="mt-2" onChange={(event) => setSectionCover(event.target.files?.[0] ?? null)}/></label>{uploadState && <p className="text-sm text-muted-foreground">{uploadState}</p>}<div className="flex gap-2"><Button disabled={busy}>{busy ? "Saving…" : editingSection ? "Save section" : "Create section"}</Button>{editingSection && <Button type="button" variant="ghost" onClick={() => { setEditingSection(null); setSectionForm(blankSection); }}>Cancel</Button>}</div></form>
        </div>}

        {!loading && tab === "Upload" && <form className="mx-auto max-w-2xl space-y-4" onSubmit={saveProject} onChange={() => {}}><h2 className="font-display text-xl font-semibold">{editingProject ? "Edit project" : "New project"}</h2><Input className={fieldClass} required maxLength={160} placeholder="Project title" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}/><select required className={fieldClass} value={projectForm.section_id} onChange={(event) => setProjectForm({ ...projectForm, section_id: event.target.value })}><option value="">Choose a section</option>{sections.map((section) => <option key={section.id} value={section.id}>{section.name}</option>)}</select><Textarea className={fieldClass} maxLength={4000} placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}/><label className="block text-sm text-muted-foreground">Cover and additional images or video<Input type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime,application/pdf" className="mt-2" onChange={(event) => setProjectFiles(Array.from(event.target.files ?? []))}/></label>{projectFiles.length > 0 && <p className="text-xs text-muted-foreground">{projectFiles.map((file) => file.name).join(" · ")}</p>}{editingProject && <p className="text-xs text-muted-foreground">Existing media remains unless replaced through project management.</p>}<Input className={fieldClass} placeholder="Video URL (optional)" type="url" value={projectForm.video_url} onChange={(event) => setProjectForm({ ...projectForm, video_url: event.target.value })}/><div className="grid gap-3 sm:grid-cols-2"><Input className={fieldClass} placeholder="Tags, separated by commas" value={projectForm.tags} onChange={(event) => setProjectForm({ ...projectForm, tags: event.target.value })}/><Input className={fieldClass} placeholder="Client name" maxLength={120} value={projectForm.client_name} onChange={(event) => setProjectForm({ ...projectForm, client_name: event.target.value })}/><Input className={fieldClass} placeholder="Year" type="number" min="1900" max="2100" value={projectForm.project_year} onChange={(event) => setProjectForm({ ...projectForm, project_year: event.target.value })}/><Input className={fieldClass} placeholder="Display order" type="number" value={projectForm.display_order} onChange={(event) => setProjectForm({ ...projectForm, display_order: event.target.value })}/></div><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={projectForm.featured} onChange={(event) => setProjectForm({ ...projectForm, featured: event.target.checked })}/>Featured project</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={projectForm.published} onChange={(event) => setProjectForm({ ...projectForm, published: event.target.checked })}/>Publish on the public portfolio</label>{uploadState && <p role="status" className="text-sm text-muted-foreground">{uploadState}</p>}<div className="flex flex-wrap gap-2"><Button disabled={busy}>{busy ? "Saving…" : projectForm.published ? "Publish project" : "Save draft"}</Button><Button type="button" variant="ghost" onClick={resetProject}>Clear</Button></div></form>}

        {!loading && tab === "Settings" && <div className="max-w-xl space-y-4"><h2 className="font-display text-xl font-semibold">Publishing & storage</h2><p className="text-sm text-muted-foreground">Published sections and projects appear on your public portfolio. Media uploads are stored separately from project details. Current account access is restricted to {ADMIN_EMAIL}.</p><div className="border-t border-border pt-4"><p className="text-sm">Storage accepts common image, video and PDF formats, up to the configured 5 GB file limit.</p></div><Button asChild variant="outline"><Link to="/">View public portfolio</Link></Button></div>}
      </section>
    </div>
  </main>;
}

function ProjectRow({ project, section, onEdit, onDelete, onPublish }: { project: Project; section: string; onEdit: () => void; onDelete: () => void; onPublish: () => void }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="truncate font-medium">{project.title}</p><p className="mt-1 text-xs text-muted-foreground">{section} · {new Date(project.created_at).toLocaleDateString()} · {project.published ? "Published" : "Draft"}{project.featured ? " · Featured" : ""}</p></div><div className="flex gap-1"><Button variant="ghost" size="sm" onClick={onPublish}>{project.published ? "Unpublish" : "Publish"}</Button><Button variant="outline" size="sm" onClick={onEdit}>Edit</Button><Button variant="ghost" size="sm" onClick={onDelete}>Delete</Button></div></div>;
}

function EmptyState({ message }: { message: string }) { return <p className="border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">{message}</p>; }