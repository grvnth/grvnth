import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "grvnth.design@gmail.com";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Portfolio sign in — Granth Agrawal" },
    { name: "description", content: "Secure sign-in for the Granth Agrawal portfolio management area." },
    { property: "og:title", content: "Portfolio sign in — Granth Agrawal" },
    { property: "og:description", content: "Secure sign-in for portfolio management." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "create">("sign-in");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) { toast.error("This dashboard is only available to its owner."); return; }
    if (password.length < 8) { toast.error("Enter a password with at least 8 characters."); return; }
    setBusy(true);
    try {
      const result = mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password })
        : await supabase.auth.signUp({ email: ADMIN_EMAIL, password });
      if (result.error) throw result.error;
      if (!result.data.session) { toast.success("Check your email to confirm your account, then sign in."); setMode("sign-in"); return; }
      if (result.data.user?.email?.toLowerCase() !== ADMIN_EMAIL) { await supabase.auth.signOut(); throw new Error("This account is not permitted to manage this portfolio."); }
      await navigate({ to: "/dashboard", replace: true });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }

  return <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground"><div className="w-full max-w-md"><a href="/" className="font-display text-2xl font-bold">Granth<span className="text-muted-foreground">.</span></a><p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground">Private workspace</p><h1 className="mt-3 font-display text-4xl font-bold">{mode === "sign-in" ? "Welcome back." : "Set up your access."}</h1><p className="mt-3 text-sm text-muted-foreground">Only the portfolio owner can sign in.</p><form className="mt-8 space-y-4" onSubmit={submit}><label className="block space-y-2 text-sm">Owner email<Input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={255}/></label><label className="block space-y-2 text-sm">Password<Input type="password" required minLength={8} maxLength={128} autoComplete={mode === "sign-in" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)}/></label><Button className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create owner account"}</Button></form><button type="button" className="mt-4 text-sm text-muted-foreground underline underline-offset-4" onClick={() => setMode(mode === "sign-in" ? "create" : "sign-in")}>{mode === "sign-in" ? "First time? Create your owner account" : "Already have access? Sign in"}</button><p className="mt-8 text-xs text-muted-foreground">{ADMIN_EMAIL}</p></div></main>;
}