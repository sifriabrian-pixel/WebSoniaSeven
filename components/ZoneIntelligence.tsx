import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import DataPlaceholder from "@/components/DataPlaceholder";
import { getZoneInsight } from "@/lib/zoneInsights";
import type { Zone } from "@/lib/data";

export default function ZoneIntelligence({ zones }: { zones: Zone[] }) {
  if (zones.length === 0) return null;

  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-navy">
            Dónde está moviéndose el mercado en Asunción y Central
          </h2>
          <SectionDivider />
          <p className="mx-auto mt-2 max-w-md text-sm text-text/60">
            Data por zona, no promedios genéricos de portal.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {zones.map((zone) => {
            const insight = getZoneInsight(zone.slug);
            return (
              <div key={zone.slug} className="bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg text-navy">{zone.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-text/70">
                  <p>
                    Plusvalía 24m:{" "}
                    {insight.appreciation24m !== null ? (
                      <span className="text-navy">
                        +{insight.appreciation24m}%
                      </span>
                    ) : (
                      <DataPlaceholder suffix="%" />
                    )}
                  </p>
                  <p>
                    Precio prom. m²:{" "}
                    {insight.avgPricePerM2 !== null ? (
                      <span className="text-navy">
                        USD {insight.avgPricePerM2}
                      </span>
                    ) : (
                      <DataPlaceholder />
                    )}
                  </p>
                  <p>
                    Demanda de alquiler:{" "}
                    {insight.rentalDemand ? (
                      <span className="text-navy">{insight.rentalDemand}</span>
                    ) : (
                      <DataPlaceholder />
                    )}
                  </p>
                </div>
                <Link
                  href={`/propiedades/zona/${zone.slug}`}
                  className="mt-4 inline-block text-xs tracking-wide text-gold underline hover:text-navy"
                >
                  Ver propiedades en esta zona →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
