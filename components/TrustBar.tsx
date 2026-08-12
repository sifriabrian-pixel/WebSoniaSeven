import { TRUST_BAR, YEARS_OF_EXPERIENCE } from "@/lib/content";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

const STATS = [
  {
    value: <AnimatedCounter value={TRUST_BAR.propertiesManaged} prefix="+" />,
    label: "Propiedades gestionadas",
  },
  ...(TRUST_BAR.avgAppreciationPct !== null
    ? [
        {
          value: (
            <AnimatedCounter
              value={TRUST_BAR.avgAppreciationPct}
              prefix="+"
              suffix="%"
            />
          ),
          label: "Plusvalía prom. zona (24 meses)",
        },
      ]
    : []),
  ...(TRUST_BAR.avgClosingDays !== null
    ? [
        {
          value: (
            <AnimatedCounter value={TRUST_BAR.avgClosingDays} suffix=" días" />
          ),
          label: "Tiempo prom. de cierre",
        },
      ]
    : []),
  ...(YEARS_OF_EXPERIENCE !== null
    ? [
        {
          value: (
            <AnimatedCounter
              value={YEARS_OF_EXPERIENCE}
              prefix="+"
              suffix=" años"
            />
          ),
          label: "Trayectoria financiera",
        },
      ]
    : []),
];

export default function TrustBar() {
  return (
    <section className="bg-navy-dark px-6 py-8 text-cream">
      <div
        className={`mx-auto grid max-w-5xl gap-6 text-center ${
          STATS.length > 2 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"
        }`}
      >
        {STATS.map((stat, i) => (
          <Reveal key={i} delay={i * 80}>
            <p className="font-serif text-2xl text-cream md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-cream/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
