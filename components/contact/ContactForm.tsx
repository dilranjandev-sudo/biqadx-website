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
        className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55"
      >
        {label}
        {optional && <span className="ml-2 text-ink/35">optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 font-body text-sm text-ink/80">
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
      <div role="status" className="rounded-xl border border-[var(--border-light)] bg-white/60 p-8">
        <p className="font-display text-xl leading-snug text-ink">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="enquiryType" label="Inquiry category" error={errors.enquiryType}>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          aria-required="true"
          aria-invalid={errors.enquiryType ? "true" : undefined}
          aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
          defaultValue=""
          className="input"
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
        <p role="alert" className="font-body text-sm text-ink/80">
          {formError}
        </p>
      )}

      <button type="submit" className="btn-ink" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
