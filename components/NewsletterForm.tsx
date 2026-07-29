"use client";

import { useState } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

interface NewsletterFormProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

export default function NewsletterForm({
  variant = "light",
  compact = false,
}: NewsletterFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
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

  // Sin NEXT_PUBLIC_FORMSPREE_ID configurado todavía no hay forma de recibir
  // el envío, así que no mostramos un formulario que fallaría en silencio.
  if (!FORMSPREE_ID) {
    return (
      <p className={`text-sm ${isDark ? "text-cream/60" : "text-text/60"}`}>
        Formulario de novedades en configuración. Mientras tanto, escribinos
        por WhatsApp para que te avisemos de nuevas propiedades.
      </p>
    );
  }

  if (sent) {
    return (
      <p className={`text-sm ${isDark ? "text-cream/80" : "text-text/80"}`}>
        ¡Listo! Te vamos a avisar de nuevas propiedades.
      </p>
    );
  }

  const inputClass = isDark
    ? "flex-1 border border-cream/20 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/40"
    : "flex-1 border border-navy/20 bg-white px-3 py-2 text-sm";

  return (
    <div>
      <form
        action={`https://formspree.io/f/${FORMSPREE_ID}`}
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row"
      >
        {!compact && (
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className={inputClass}
          />
        )}
        <input
          type="text"
          name="contact"
          placeholder="Email o WhatsApp"
          required
          className={inputClass}
        />
        <button
          type="submit"
          className="bg-gold px-5 py-2 text-sm tracking-wide text-navy transition-colors hover:bg-cream"
        >
          Quiero recibir novedades
        </button>
      </form>
      {error && (
        <p className="mt-2 text-xs text-red-500">
          No pudimos enviar tu consulta. Probá de nuevo o escribinos por
          WhatsApp.
        </p>
      )}
    </div>
  );
}
