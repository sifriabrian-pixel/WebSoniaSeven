import { TRUST_BAR } from "@/lib/content";
import DataPlaceholder from "@/components/DataPlaceholder";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

const STATS = [
  {
    value: <AnimatedCounter value={TRUST_BAR.propertiesManaged} prefix="+" />,
    label: "Propiedades gestionadas",
  },
  {
    value:
      TRUST_BAR.avgAppreciationPct !== null ? (
        <AnimatedCounter
          value={TRUST_BAR.avgAppreciationPct}
          prefix="+"
          suffix="%"
        />
      ) : (
        <DataPlaceholder suffix="%" dark />
      ),
    label: "Plusvalía prom. zona (24 meses)",
  },
  {
    value:
      TRUST_BAR.avgClosingDays !== null ? (
        <AnimatedCounter value={TRUST_BAR.avgClosingDays} suffix=" días" />
      ) : (
        <DataPlaceholder suffix=" días" dark />
      ),
    label: "Tiempo prom. de cierre",
  },
  {
    value: "C21",
    label: "Oficial Century 21",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-navy-dark px-6 py-8 text-cream">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
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
