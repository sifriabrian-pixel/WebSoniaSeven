"use client";

import { useState } from "react";
import { WhatsAppInline } from "@/components/WhatsAppButton";

// TODO: reemplazar GFORM_ACTION_URL y entry IDs una vez creado el formulario real
const GFORM_ACTION_URL = process.env.NEXT_PUBLIC_GFORM_ACTION_URL;
const GFORM_ENTRY_NOMBRE = process.env.NEXT_PUBLIC_GFORM_ENTRY_NOMBRE;
const GFORM_ENTRY_CONTACTO = process.env.NEXT_PUBLIC_GFORM_ENTRY_CONTACTO;
const GFORM_ENTRY_BUSQUEDA = process.env.NEXT_PUBLIC_GFORM_ENTRY_BUSQUEDA;
const GFORM_ENTRY_PRESUPUESTO = process.env.NEXT_PUBLIC_GFORM_ENTRY_PRESUPUESTO;
const GFORM_ENTRY_ZONA = process.env.NEXT_PUBLIC_GFORM_ENTRY_ZONA;

const isGformConfigured = Boolean(
  GFORM_ACTION_URL &&
    GFORM_ENTRY_NOMBRE &&
    GFORM_ENTRY_CONTACTO &&
    GFORM_ENTRY_BUSQUEDA &&
    GFORM_ENTRY_PRESUPUESTO &&
    GFORM_ENTRY_ZONA
);

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
  const [intent, setIntent] = useState("Invertir");
  const isDark = variant === "dark";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = new URLSearchParams();
    body.append(GFORM_ENTRY_NOMBRE!, String(formData.get("name") ?? ""));
    body.append(
      GFORM_ENTRY_CONTACTO!,
      `${formData.get("countryCode") ?? ""} ${formData.get("whatsapp") ?? ""}`.trim()
    );
    body.append(GFORM_ENTRY_BUSQUEDA!, intent);
    body.append(
      GFORM_ENTRY_PRESUPUESTO!,
      String(formData.get("budget") ?? "")
    );
    body.append(GFORM_ENTRY_ZONA!, String(formData.get("zona") ?? ""));

    // "no-cors" no permite leer la respuesta del servidor: no hay forma de
    // confirmar server-side que Google Forms recibió el envío sin backend
    // propio, así que el estado de éxito se muestra de forma optimista.
    fetch(GFORM_ACTION_URL!, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }).catch(() => {});

    setSent(true);
  }

  if (!isGformConfigured) {
    return (
      <WhatsAppInline
        message="Hola, quiero recibir oportunidades de inversión curadas."
        className={`inline-block px-6 py-2.5 text-sm tracking-wide transition-colors ${
          isDark
            ? "bg-cream text-navy hover:bg-white"
            : "bg-navy text-cream hover:bg-navy-dark"
        }`}
      >
        Quiero recibir oportunidades
      </WhatsAppInline>
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
      <form onSubmit={handleSubmit} className="space-y-3">
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
                    ? isDark
                      ? "border-cream bg-cream text-navy"
                      : "border-navy bg-navy text-cream"
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

        <div
          className={compact ? "space-y-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}
        >
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
          <div>
            <label className={labelClass}>Zona de interés</label>
            <input
              type="text"
              name="zona"
              placeholder="Ej. Recoleta, Villa Morra..."
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-navy px-5 py-2.5 text-sm tracking-wide text-cream transition-colors hover:bg-navy-dark"
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
    </div>
  );
}
