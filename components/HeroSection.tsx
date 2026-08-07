"use client";

import Image from "next/image";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { useInvestorMode } from "@/components/InvestorModeContext";
import type { Zone } from "@/lib/data";

export default function HeroSection({ zones }: { zones: Zone[] }) {
  const { mode, setMode } = useInvestorMode();

  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
        alt="Propiedad en Asunción"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1C2841]/60 via-[#1C2841]/30 to-[#1C2841]/70" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-cream">
        <Wordmark size="lg" className="mb-6" />

        <h1 className="font-serif text-3xl leading-tight md:text-5xl">
          {mode === "invertir"
            ? "Invertí en las oportunidades de mayor valor de Asunción"
            : "Propiedades para quienes valoran la calidad antes que el precio"}
        </h1>
        <p className="mt-4 max-w-xl text-sm text-cream/80 md:text-base">
          {mode === "invertir"
            ? "Selección curada para el segmento de ticket alto — plusvalía por zona, rentabilidad estimada y timing de entrada, con el mismo rigor con el que evaluarías cualquier inversión de peso."
            : "Casas, departamentos y desarrollos seleccionados en las zonas más consolidadas de Asunción y Central."}
        </p>

        <div className="mt-6 inline-flex border border-cream/30 bg-black/20 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("vivir")}
            className={`px-5 py-2 tracking-wide transition-colors ${
              mode === "vivir"
                ? "bg-gold text-navy"
                : "text-cream/80 hover:text-cream"
            }`}
          >
            Quiero VIVIR
          </button>
          <button
            type="button"
            onClick={() => setMode("invertir")}
            className={`px-5 py-2 tracking-wide transition-colors ${
              mode === "invertir"
                ? "bg-gold text-navy"
                : "text-cream/80 hover:text-cream"
            }`}
          >
            Quiero INVERTIR
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/propiedades"
            className="inline-block bg-gold px-8 py-3 text-sm tracking-wide text-navy transition-colors hover:bg-cream"
          >
            {mode === "invertir"
              ? "VER OPORTUNIDADES DE INVERSIÓN"
              : "VER PROPIEDADES"}
          </Link>
          {mode === "invertir" && (
            <button
              type="button"
              onClick={() => setMode("vivir")}
              className="text-xs text-cream/70 underline underline-offset-2 hover:text-cream"
            >
              ¿Sos comprador para vivir? Ver propiedades →
            </button>
          )}
        </div>

        <form
          action="/propiedades"
          className="mt-10 flex w-full max-w-2xl flex-col gap-2 bg-white/95 p-3 text-text shadow-lg md:flex-row"
        >
          <select
            name="type"
            className="flex-1 border border-navy/10 px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="">Tipo</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Comercial</option>
          </select>
          <select
            name="neighborhood"
            className="flex-1 border border-navy/10 px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="">Zona</option>
            {zones.map((zone) => (
              <option key={zone.slug} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
          <select
            name="maxPrice"
            className="flex-1 border border-navy/10 px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="">Precio máx.</option>
            <option value="150000">Hasta USD 150.000</option>
            <option value="300000">Hasta USD 300.000</option>
            <option value="600000">Hasta USD 600.000</option>
          </select>
          <button
            type="submit"
            className="bg-navy px-6 py-2 text-sm tracking-wide text-cream transition-colors hover:bg-gold"
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
