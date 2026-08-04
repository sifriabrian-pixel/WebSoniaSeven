import SectionDivider from "@/components/SectionDivider";

const SUPPORT_CARDS = [
  {
    title: "Acceso off-market",
    text: "Propiedades antes de que lleguen al portal.",
  },
  {
    title: "Cierre asistido completo",
    text: "Desde la reserva hasta la escritura, acompaño cada paso.",
  },
  {
    title: "Red C21 internacional",
    text: "Respaldo de una marca con presencia en +80 países.",
  },
];

export default function ValueProposition() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-navy">
          No vendo propiedades. Te ayudo a leer el mercado antes de comprar.
        </h2>
        <SectionDivider />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-navy p-8 text-cream md:col-span-2">
          <h3 className="font-serif text-xl text-gold">
            Análisis de zona, no solo de propiedad
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            Antes de mostrarte una propiedad, te muestro cómo se movió esa
            zona en los últimos 24 meses: plusvalía, demanda de alquiler,
            proyectos nuevos que van a impactar el precio. Comprás con
            información, no con feeling.
          </p>
        </div>

        {SUPPORT_CARDS.map((card) => (
          <div key={card.title} className="bg-white p-6 shadow-sm">
            <h3 className="font-serif text-lg text-navy">{card.title}</h3>
            <p className="mt-2 text-sm text-text/70">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
