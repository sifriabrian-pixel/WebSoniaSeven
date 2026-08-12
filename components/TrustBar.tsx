import { TRUST_BAR } from "@/lib/content";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

const hasExtendedStats =
  TRUST_BAR.avgAppreciationPct !== null && TRUST_BAR.avgClosingDays !== null;

const STATS = hasExtendedStats
  ? [
      {
        value: (
          <AnimatedCounter value={TRUST_BAR.propertiesManaged} prefix="+" />
        ),
        label: "Propiedades gestionadas",
      },
      {
        value: (
          <AnimatedCounter
            value={TRUST_BAR.avgAppreciationPct as number}
            prefix="+"
            suffix="%"
          />
        ),
        label: "Plusvalía prom. zona (24 meses)",
      },
      {
        value: (
          <AnimatedCounter
            value={TRUST_BAR.avgClosingDays as number}
            suffix=" días"
          />
        ),
        label: "Tiempo prom. de cierre",
      },
      {
        value: "CENTURY 21",
        label: "Oficial",
      },
    ]
  : [
      {
        value: (
          <AnimatedCounter value={TRUST_BAR.propertiesManaged} prefix="+" />
        ),
        label: "Propiedades gestionadas",
      },
      {
        value: "CENTURY 21",
        label: "Oficial",
      },
    ];

export default function TrustBar() {
  return (
    <section className="bg-navy-dark px-6 py-8 text-cream">
      <div
        className={`mx-auto grid max-w-5xl gap-6 text-center ${
          hasExtendedStats ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"
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
