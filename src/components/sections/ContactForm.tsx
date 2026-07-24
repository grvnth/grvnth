import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const budgets = ["< ₹10k", "₹10k – ₹50k", "₹50k – ₹1L", "₹1L+", "Let's discuss"];

const RECIPIENT = "grvnth.design@gmail.com";
const WHATSAPP = "919549946123";

type Method = "whatsapp" | "email";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", budget: budgets[1], message: "" });
  const [method, setMethod] = useState<Method>("whatsapp");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    else if (form.name.length > 100) e.name = "Name too long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Tell me a bit about the project";
    else if (form.message.length > 2000) e.message = "Message too long";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    const subject = `New project enquiry from ${form.name}`;
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Budget: ${form.budget}`,
      "",
      "Message:",
      form.message,
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
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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
                <label htmlFor="cf-name" className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
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
                <label htmlFor="cf-email" className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
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
              <label htmlFor="cf-message" className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
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
              <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Send via
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { id: "whatsapp", label: "WhatsApp", hint: "Recommended" },
                  { id: "email", label: "Email", hint: null },
                ] as { id: Method; label: string; hint: string | null }[]).map((m) => (
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium tracking-tight text-background transition hover:bg-foreground/90"
            >
              {method === "whatsapp" ? "Send via WhatsApp" : "Send via Email"}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
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
