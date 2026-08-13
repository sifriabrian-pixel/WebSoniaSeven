"use client";

import { motion, type Variants } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";

/**
 * PLACEHOLDER: testimonios ficticios, reemplazar por reales antes de
 * publicar. Sonia debe proveer los casos reales (nombre real o iniciales
 * autorizadas) — ver README, sección "Pendientes de contenido".
 */
const PLACEHOLDER_TESTIMONIALS = [
  {
    quote:
      "Sonia nos mostró la proyección de plusvalía de la zona antes de mostrarnos la propiedad. Terminamos comprando en Villa Morra en vez de donde íbamos a comprar por instinto — y hoy esa decisión se nota.",
    author: "R. Duarte, inversor",
  },
  {
    quote:
      "Buscaba renta, no una casa para vivir. Fue la primera asesora que entendió esa diferencia y me trajo solo oportunidades con números que cerraban.",
    author: "C. Benítez",
  },
  {
    quote:
      "El análisis de zona nos ahorró meses de mirar propiedades que no tenían sentido para lo que buscábamos. Se nota la mirada de contadora, no de vendedora.",
    author: "Familia Acosta",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <section className="bg-cream px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-heading text-3xl text-navy">Testimonios</h2>
        <SectionDivider />

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PLACEHOLDER_TESTIMONIALS.map((t) => (
            <motion.div
              key={t.author}
              variants={item}
              className="bg-white p-6 text-left shadow-sm"
            >
              <p className="font-serif text-3xl text-gold">&ldquo;</p>
              <p className="text-sm italic text-text/80">{t.quote}</p>
              <p className="mt-4 text-xs tracking-wide text-navy">
                — {t.author}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
