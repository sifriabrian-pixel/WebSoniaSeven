import SectionDivider from "@/components/SectionDivider";
import Reveal from "@/components/Reveal";

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
    title: "Contacto directo con las principales constructoras del país",
    text: "Relación directa con las desarrolladoras detrás de cada proyecto — información de primera mano sobre avance de obra y disponibilidad real.",
  },
];

export default function ValueProposition() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="text-center">
        <h2 className="font-serif text-3xl text-navy">
          No vendo propiedades. Te ayudo a leer el mercado antes de comprar.
        </h2>
        <SectionDivider />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="h-full bg-navy p-8 text-cream">
            <h3 className="font-serif text-xl text-cream">
              Análisis de zona, no solo de propiedad
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Antes de mostrarte una propiedad, te muestro cómo se movió esa
              zona en los últimos 24 meses: plusvalía, demanda de alquiler,
              proyectos nuevos que van a impactar el precio. Comprás con
              información, no con feeling.
            </p>
          </div>
        </Reveal>

        {SUPPORT_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={(i + 1) * 100}>
            <div className="h-full bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg text-navy">{card.title}</h3>
              <p className="mt-2 text-sm text-text/70">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
