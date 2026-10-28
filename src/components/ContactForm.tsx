"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { business } from "@/content/site";
import { cn } from "@/lib/cn";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "success" | "error";

const field =
  "peer w-full rounded-2xl border border-line bg-white px-4 pt-6 pb-2.5 text-base text-ink outline-none transition-colors placeholder-transparent focus:border-ink";
const label =
  "pointer-events-none absolute top-2 left-4 text-xs font-semibold text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold";

function Field({ name, label: text, type = "text", autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div className="relative">
      <input id={`cf-${name}`} name={name} type={type} required placeholder={text} autoComplete={autoComplete} className={field} />
      <label htmlFor={`cf-${name}`} className={label}>
        {text} *
      </label>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.botcheck) return;

    // No form service configured yet: fall back to the visitor's mail client.
    if (!endpoint) {
      const body = `${data.bericht}\n\n— ${data.naam} (${data.email})${data.nieuwsbrief ? "\nIk wil graag de nieuwsbrief ontvangen." : ""}`;
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(data.onderwerp)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(web3formsKey ? { access_key: web3formsKey, from_name: "corptex.be" } : {}),
          subject: `Contactformulier: ${data.onderwerp}`,
          name: data.naam,
          email: data.email,
          onderwerp: data.onderwerp,
          message: data.bericht,
          nieuwsbrief: data.nieuwsbrief ? "ja" : "nee",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className={cn("space-y-4 transition-opacity", status === "success" && "pointer-events-none opacity-0")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="naam" label="Naam" autoComplete="name" />
          <Field name="email" label="E-mail" type="email" autoComplete="email" />
        </div>
        <Field name="onderwerp" label="Onderwerp" />
        <div className="relative">
          <textarea id="cf-bericht" name="bericht" required rows={5} placeholder="Bericht" className={cn(field, "resize-y")} />
          <label htmlFor="cf-bericht" className={label}>
            Bericht *
          </label>
        </div>
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-muted">
          <input type="checkbox" name="nieuwsbrief" value="ja" className="mt-1 size-4 accent-ink" />
          Ja, ik wil graag de nieuwsbrief ontvangen met nieuws en acties.
        </label>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            We gebruiken je gegevens enkel om je te antwoorden. Zie onze{" "}
            <Link href="/privacy/" className="underline underline-offset-2 hover:text-ink">
              privacyverklaring
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white transition-colors hover:bg-navy disabled:opacity-60"
          >
            {status === "sending" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {status === "sending" ? "Versturen…" : "Verstuur bericht"}
          </button>
        </div>

        <p role="status" aria-live="polite" className="min-h-0 text-sm font-medium text-red-700">
          {status === "error" &&
            `Er ging iets mis bij het versturen. Probeer opnieuw of mail ons rechtstreeks via ${business.email}.`}
        </p>
      </form>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-hivis text-ink">
              <Check className="size-7" strokeWidth={3} aria-hidden="true" />
            </span>
            <p className="mt-6 text-2xl font-extrabold">Bedankt voor je bericht!</p>
            <p className="mt-2 text-muted">We nemen zo snel mogelijk contact met je op.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold underline underline-offset-4">
              Nog een bericht sturen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
