import { TRUST_BAR } from "@/lib/content";
import DataPlaceholder from "@/components/DataPlaceholder";

const STATS = [
  {
    value: `+${TRUST_BAR.propertiesManaged}`,
    label: "Propiedades gestionadas",
  },
  {
    value:
      TRUST_BAR.avgAppreciationPct !== null ? (
        `+${TRUST_BAR.avgAppreciationPct}%`
      ) : (
        <DataPlaceholder suffix="%" />
      ),
    label: "Plusvalía prom. zona (24 meses)",
  },
  {
    value:
      TRUST_BAR.avgClosingDays !== null ? (
        `${TRUST_BAR.avgClosingDays} días`
      ) : (
        <DataPlaceholder suffix=" días" />
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
          <div key={i}>
            <p className="font-serif text-2xl text-gold md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-cream/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
