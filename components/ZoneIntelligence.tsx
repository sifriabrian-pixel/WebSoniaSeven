import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import { getZoneInsight } from "@/lib/zoneInsights";
import Reveal from "@/components/Reveal";
import type { Zone } from "@/lib/data";

const MIN_COMPLETE_ZONES = 2;

export default function ZoneIntelligence({ zones }: { zones: Zone[] }) {
  const complete = zones
    .map((zone) => ({ zone, insight: getZoneInsight(zone.slug) }))
    .filter(
      ({ insight }) =>
        insight.appreciation24m !== null &&
        insight.avgPricePerM2 !== null &&
        insight.rentalDemand !== null
    );

  if (complete.length < MIN_COMPLETE_ZONES) return null;

  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-navy">
            Dónde está moviéndose el mercado en Asunción y Central
          </h2>
          <SectionDivider />
          <p className="mx-auto mt-2 max-w-md text-sm text-text/60">
            Data por zona, no promedios genéricos de portal.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {complete.map(({ zone, insight }, i) => (
            <Reveal key={zone.slug} delay={i * 100}>
              <div className="h-full bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg text-navy">{zone.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-text/70">
                  <p>
                    Plusvalía 24m:{" "}
                    <span className="text-navy">
                      +{insight.appreciation24m}%
                    </span>
                  </p>
                  <p>
                    Precio prom. m²:{" "}
                    <span className="text-navy">
                      USD {insight.avgPricePerM2}
                    </span>
                  </p>
                  <p>
                    Demanda de alquiler:{" "}
                    <span className="text-navy">{insight.rentalDemand}</span>
                  </p>
                </div>
                <Link
                  href={`/propiedades/zona/${zone.slug}`}
                  className="mt-4 inline-block text-xs tracking-wide text-gold underline hover:text-navy"
                >
                  Ver propiedades en esta zona →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
