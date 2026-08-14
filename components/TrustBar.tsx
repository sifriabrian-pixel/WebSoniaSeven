import { TRUST_BAR } from "@/lib/content";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

const STATS = [
  {
    value: <AnimatedCounter value={TRUST_BAR.propertiesManaged} prefix="+" />,
    label: "Propiedades gestionadas",
  },
  {
    value: (
      <AnimatedCounter value={TRUST_BAR.dollarsSoldMillions} prefix="+" suffix="M" />
    ),
    label: "Millones USD vendidos",
  },
  {
    value: (
      <AnimatedCounter
        value={TRUST_BAR.realEstateYears}
        prefix="+"
        suffix=" años"
      />
    ),
    label: "Experiencia en real estate",
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
];

export default function TrustBar() {
  return (
    <section className="bg-navy-dark px-6 py-8 text-cream">
      <div
        className={`mx-auto grid max-w-5xl gap-6 text-center ${
          STATS.length > 3 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"
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
