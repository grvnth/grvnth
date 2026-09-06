import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const budgets = ["< ₹10k", "₹10k – ₹50k", "₹50k – ₹1L", "₹1L+", "Let's discuss"];

const RECIPIENT = "hello@grvnth.cc.cd";
const WHATSAPP = "919549946123";

type Method = "whatsapp" | "email";

const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/wav",
  "audio/mp4",
  "application/pdf",
] as const;

const attachmentSchema = z.object({
  name: z.string().trim().min(1).max(160),
  type: z.enum(ALLOWED_ATTACHMENT_TYPES),
  size: z.number().int().positive().max(MAX_ATTACHMENT_SIZE),
});

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", budget: budgets[1], message: "" });
  const [method, setMethod] = useState<Method>("whatsapp");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    else if (form.name.length > 100) e.name = "Name too long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Tell me a bit about the project";
    else if (form.message.length > 2000) e.message = "Message too long";
    if (attachment) {
      const attachmentResult = attachmentSchema.safeParse({
        name: attachment.name,
        type: attachment.type,
        size: attachment.size,
      });
      if (!attachmentResult.success) {
        e.attachment =
          attachment.size > MAX_ATTACHMENT_SIZE
            ? "File must be 20 MB or smaller"
            : "Choose an image, video, audio file, or PDF";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setUploading(true);
    setErrors({});

    try {
      let attachmentLink = "";

      if (attachment) {
        const safeName = attachment.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-160);
        const path = `inquiries/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("contact-attachments")
          .upload(path, attachment, { contentType: attachment.type, upsert: false });

        if (uploadError) throw uploadError;

        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from("contact-attachments")
          .createSignedUrl(path, 60 * 60 * 24 * 7);

        if (signedUrlError || !signedUrlData?.signedUrl) {
          throw signedUrlError ?? new Error("Unable to create the attachment link");
        }

        attachmentLink = signedUrlData.signedUrl;
      }

      const subject = `New project enquiry from ${form.name}`;
      const lines = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Budget: ${form.budget}`,
        "",
        "Message:",
        form.message,
        ...(attachmentLink ? ["", "Attached media:", attachmentLink] : []),
      ];
      if (method === "whatsapp") {
        const text = [subject, "", ...lines].join("\n");
        const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const url = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
        window.location.href = url;
      }
      setSent(true);
    } catch (error) {
      console.error("Contact attachment upload failed", error);
      setErrors({ attachment: "That file could not be uploaded. Please try again." });
    } finally {
      setUploading(false);
    }
  }

  const field =
    "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-white/30 focus:bg-white/[0.06]";

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="glass-strong mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl">
              {method === "whatsapp" ? "Opening WhatsApp…" : "Message ready to send"}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {method === "whatsapp"
                ? "WhatsApp just opened with your message pre-filled. Hit send and I'll reply within 24 hours."
                : "Your email app just opened with everything filled in. Hit send and I'll get back to you within 24 hours."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", budget: budgets[1], message: "" });
                 setAttachment(null);
                 setErrors({});
              }}
              className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cf-name"
                  className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="cf-name"
                  name="name"
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label
                  htmlFor="cf-email"
                  className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="cf-email"
                  name="email"
                  className={field}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@domain.com"
                  maxLength={255}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    className={`rounded-full border px-4 py-2 text-xs tracking-wide transition ${
                      form.budget === b
                        ? "border-white/40 bg-white/[0.08] text-foreground"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="cf-message"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                className={`${field} min-h-32 resize-y`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, timeline, and goals…"
                maxLength={2000}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <div>
              <label
                htmlFor="cf-attachment"
                className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
              >
                Attach media <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>
              </label>
              <input
                id="cf-attachment"
                name="attachment"
                type="file"
                accept="image/*,video/*,audio/*,application/pdf"
                onChange={(event) => {
                  const nextFile = event.target.files?.[0] ?? null;
                  setAttachment(nextFile);
                  setErrors((current) => ({ ...current, attachment: "" }));
                }}
                className="block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-white/[0.08] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-foreground hover:border-white/30"
              />
              <p className="mt-2 text-xs text-muted-foreground/70">
                {attachment ? `${attachment.name} · ${(attachment.size / 1024 / 1024).toFixed(1)} MB` : "Images, videos, audio, or PDFs up to 20 MB"}
              </p>
              {errors.attachment && <p className="mt-1 text-xs text-red-400">{errors.attachment}</p>}
            </div>

            <div>
              <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Send via
              </label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "whatsapp", label: "WhatsApp", hint: "Recommended" },
                    { id: "email", label: "Email", hint: null },
                  ] as { id: Method; label: string; hint: string | null }[]
                ).map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-wide transition ${
                      method === m.id
                        ? "border-white/40 bg-white/[0.08] text-foreground"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    {m.label}
                    {m.hint && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-foreground/80">
                        {m.hint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={uploading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium tracking-tight text-background transition hover:bg-foreground/90 disabled:cursor-wait disabled:opacity-60"
            >
              {uploading ? "Preparing…" : method === "whatsapp" ? "Send via WhatsApp" : "Send via Email"}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.button>
            <p className="text-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/70">
              {method === "whatsapp"
                ? "Opens WhatsApp with your message · replies within 24h"
                : "Opens in your email app · replies within 24h"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
