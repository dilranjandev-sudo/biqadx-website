"use client";

import { useState, type ReactNode } from "react";
import { contactCategories, contact } from "@/lib/copy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/65"
      >
        {label}
        {optional && <span className="ml-2 text-ink/65">optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 font-body text-sm text-ink/75">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      enquiryType: String(fd.get("enquiryType") || ""),
      name: String(fd.get("name") || "").trim(),
      organization: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      program: String(fd.get("program") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      nda: fd.get("nda") === "on",
      company: String(fd.get("company") || ""), // honeypot
    };

    const fe: Record<string, string> = {};
    if (!contactCategories.includes(payload.enquiryType as (typeof contactCategories)[number]))
      fe.enquiryType = "Please choose an inquiry category.";
    if (!payload.name) fe.name = "Please enter your name.";
    if (!EMAIL_RE.test(payload.email)) fe.email = "Please enter a valid email address.";
    if (!payload.message) fe.message = "Please describe your purpose and proposed scope.";
    setErrors(fe);
    setFormError("");
    if (Object.keys(fe).length) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: string[];
      };

      if (res.ok && data.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      if (res.status === 503 || data.error === "not_configured") {
        setStatus("error");
        setFormError("Our contact inbox is not live yet. Please check back soon.");
      } else if (data.error === "validation" && Array.isArray(data.fields)) {
        const fe2: Record<string, string> = {};
        data.fields.forEach((f) => (fe2[f] = "Please check this field."));
        setErrors(fe2);
        setStatus("error");
      } else {
        setStatus("error");
        setFormError("That did not go through. Please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setFormError("That did not go through. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      // The form is replaced outright, and until now that swap was a hard cut —
      // the one moment on the site where a visitor most needs to feel that
      // something completed. It rises in, and the prism rule draws itself out
      // from nothing, so the panel reads as an arrival rather than a jump.
      <div
        role="status"
        className="fade-up rounded-2xl border border-[var(--border-light)] bg-white/60 p-8 sm:p-10"
      >
        <span
          aria-hidden="true"
          className="rule-draw block h-[3px] w-12 rounded-full"
          style={{ background: "var(--prism-gradient)" }}
        />
        <p className="mt-5 font-display text-xl leading-snug text-ink">
          {contact.success}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border-light)] bg-white/60 p-6 sm:p-8">
      <div className="mb-7 flex items-baseline justify-between border-b border-[var(--border-light)] pb-5">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">
          Send an inquiry
        </h2>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/50">
          All in confidence
        </span>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="enquiryType" label="Inquiry category" error={errors.enquiryType}>
        {/* Custom chevron — the browser's default select arrow is the biggest
            "generic form" tell; appearance-none hands it to us. */}
        <div className="relative">
          <select
            id="enquiryType"
            name="enquiryType"
            required
            aria-required="true"
            aria-invalid={errors.enquiryType ? "true" : undefined}
            aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
            defaultValue=""
            className="input cursor-pointer appearance-none pr-10"
          >
            <option value="" disabled>
              Select one
            </option>
            {contactCategories.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50"
          >
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" type="text" required aria-required="true" aria-invalid={errors.name ? "true" : undefined} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" className="input" />
        </Field>
        <Field id="organization" label="Organization" optional>
          <input id="organization" name="organization" type="text" autoComplete="organization" className="input" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="email" label="Professional email" error={errors.email}>
          <input id="email" name="email" type="email" required aria-required="true" aria-invalid={errors.email ? "true" : undefined} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" className="input" />
        </Field>
        <Field id="location" label="Country & city" optional>
          <input id="location" name="location" type="text" className="input" />
        </Field>
      </div>

      <Field id="program" label="Program of interest" optional>
        <input id="program" name="program" type="text" placeholder="METACARD, OMEGA-PRO, UDOS…" className="input" />
      </Field>

      <Field id="message" label="Purpose & proposed scope" error={errors.message}>
        <textarea id="message" name="message" rows={5} required aria-required="true" aria-invalid={errors.message ? "true" : undefined} aria-describedby={errors.message ? "message-error" : undefined} className="input resize-y" />
      </Field>

      <label className="flex items-start gap-3 font-body text-sm text-ink/75">
        <input type="checkbox" name="nda" className="mt-1 h-4 w-4 accent-[color:var(--ink)]" />
        Request an NDA-level discussion.
      </label>

      {formError && (
        <p role="alert" className="font-body text-sm text-ink/75">
          {formError}
        </p>
      )}

        {/* Sending is the one state where nothing on screen used to move, on the
            one action where a visitor most wants to know something is happening.
            The label still carries the meaning for a screen reader and for
            anyone whose motion is reduced; the arc is decorative. */}
        <button
          type="submit"
          className="btn-ink w-full sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.28"
              />
              <path
                d="M10 2 a8 8 0 0 1 8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
      </form>
    </div>
  );
}
