"use client";

import { useState } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const BUDGET_OPTIONS = [
  { value: "150000", label: "Hasta USD 150.000" },
  { value: "300000", label: "Hasta USD 300.000" },
  { value: "600000", label: "Hasta USD 600.000" },
  { value: "600000+", label: "+USD 600.000" },
];

const INTENT_OPTIONS = ["Invertir", "Vivir", "Vender"];

interface ConversionFormProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export default function ConversionForm({
  variant = "light",
  compact = false,
}: ConversionFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [intent, setIntent] = useState("Invertir");
  const isDark = variant === "dark";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  if (!FORMSPREE_ID) {
    return (
      <p className={`text-sm ${isDark ? "text-cream/60" : "text-text/60"}`}>
        Formulario en configuración. Mientras tanto, escribinos por WhatsApp
        para que te avisemos de nuevas oportunidades.
      </p>
    );
  }

  if (sent) {
    return (
      <p className={`text-sm ${isDark ? "text-cream/80" : "text-text/80"}`}>
        ¡Listo! Te contactamos por WhatsApp a la brevedad.
      </p>
    );
  }

  const inputClass = isDark
    ? "w-full border border-cream/20 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/40"
    : "w-full border border-navy/20 bg-white px-3 py-2 text-sm";

  const labelClass = `mb-1 block text-xs tracking-wide ${
    isDark ? "text-cream/60" : "text-text/60"
  }`;

  return (
    <div>
      <form
        action={`https://formspree.io/f/${FORMSPREE_ID}`}
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <div
          className={compact ? "space-y-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}
        >
          <div>
            <label className={labelClass}>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                defaultValue="+595"
                className={`${inputClass} w-24 shrink-0`}
              >
                <option value="+595">🇵🇾 +595</option>
                <option value="+54">🇦🇷 +54</option>
                <option value="other">Otro</option>
              </select>
              <input
                type="tel"
                name="whatsapp"
                placeholder="971 561916"
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>¿Qué buscás?</label>
          <div className="flex flex-wrap gap-2">
            {INTENT_OPTIONS.map((option) => (
              <label
                key={option}
                className={`cursor-pointer border px-3 py-1.5 text-xs tracking-wide transition-colors ${
                  intent === option
                    ? "border-gold bg-gold text-navy"
                    : isDark
                      ? "border-cream/30 text-cream/70"
                      : "border-navy/20 text-navy"
                }`}
              >
                <input
                  type="radio"
                  name="intent"
                  value={option}
                  checked={intent === option}
                  onChange={() => setIntent(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Presupuesto estimado</label>
          <select name="budget" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Seleccioná un rango
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gold px-5 py-2.5 text-sm tracking-wide text-navy transition-colors hover:bg-cream"
        >
          Quiero recibir oportunidades
        </button>
      </form>

      <p
        className={`mt-3 text-xs ${isDark ? "text-cream/50" : "text-text/50"}`}
      >
        Te escribimos por WhatsApp a la brevedad. Sin spam, sin compartir tu
        número con terceros.
      </p>

      {error && (
        <p className="mt-2 text-xs text-red-500">
          No pudimos enviar tu consulta. Probá de nuevo o escribinos por
          WhatsApp.
        </p>
      )}
    </div>
  );
}
