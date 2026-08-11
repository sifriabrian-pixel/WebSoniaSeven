"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/components/WhatsAppButton";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hola Sonia, soy ${name || "un potencial cliente"}${
      phone ? ` (tel. ${phone})` : ""
    }. ${message || "Me gustaría más información."}`;
    window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6">
      <div>
        <label className="mb-1 block text-xs tracking-wide text-text/60">
          NOMBRE
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-navy/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs tracking-wide text-text/60">
          TELÉFONO
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-navy/20 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs tracking-wide text-text/60">
          MENSAJE
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="w-full border border-navy/20 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-navy px-6 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-navy-dark"
      >
        ENVIAR POR WHATSAPP
      </button>
    </form>
  );
}
