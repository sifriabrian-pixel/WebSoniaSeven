"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import SectionDivider from "@/components/SectionDivider";
import { useInvestorMode } from "@/components/InvestorModeContext";
import Reveal from "@/components/Reveal";
import type { Property, DealType } from "@/lib/types";

const DEAL_FILTERS: { label: string; value: DealType | "todas" }[] = [
  { label: "Todas", value: "todas" },
  { label: "Renta actual", value: "Renta" },
  { label: "Plusvalía", value: "Reventa" },
  { label: "Pozo / Desarrollo", value: "Desarrollo en pozo" },
];

export default function FeaturedPropertiesSection({
  properties,
}: {
  properties: Property[];
}) {
  const { mode } = useInvestorMode();
  const [dealFilter, setDealFilter] = useState<DealType | "todas">("todas");

  const visible =
    mode === "invertir" && dealFilter !== "todas"
      ? properties.filter((p) => p.investment?.dealType === dealFilter)
      : properties;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-heading text-3xl text-navy">
          {mode === "invertir" ? "Oportunidades activas" : "Propiedades destacadas"}
        </h2>
        <SectionDivider />
        {mode === "invertir" && (
          <p className="mx-auto mt-2 max-w-md text-sm text-text/60">
            Seleccionadas por potencial de retorno, no solo por
            disponibilidad.
          </p>
        )}
      </div>

      {mode === "invertir" && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {DEAL_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setDealFilter(f.value)}
              className={`border px-4 py-1.5 text-xs tracking-wide transition-colors duration-200 ${
                dealFilter === f.value
                  ? "border-navy bg-navy text-cream"
                  : "border-navy/20 text-navy hover:border-gold hover:text-gold"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <PropertyCard property={property} mode={mode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>

      <div className="mt-12 text-center">
        <Link
          href="/propiedades"
          className="border border-navy px-8 py-3 text-sm tracking-wide text-navy transition-colors hover:border-gold hover:text-gold"
        >
          VER TODAS LAS PROPIEDADES
        </Link>
      </div>
    </section>
  );
}
