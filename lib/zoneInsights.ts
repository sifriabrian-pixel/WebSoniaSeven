/**
 * Datos de inteligencia de mercado por zona (plusvalía, precio prom. por m²,
 * demanda de alquiler). Ninguno está confirmado todavía — se muestran como
 * [DATO] en el sitio. Cuando Brian tenga el número real de una zona,
 * completar acá y aparece solo en /  (sección "Inteligencia de zona").
 */
export interface ZoneInsight {
  appreciation24m: number | null;
  avgPricePerM2: number | null;
  rentalDemand: "Alta" | "Media" | "Baja" | null;
}

const EMPTY_INSIGHT: ZoneInsight = {
  appreciation24m: null,
  avgPricePerM2: null,
  rentalDemand: null,
};

const ZONE_INSIGHTS: Record<string, ZoneInsight> = {
  recoleta: { ...EMPTY_INSIGHT },
  "la-encarnacion": { ...EMPTY_INSIGHT },
  trinidad: { ...EMPTY_INSIGHT },
  "villa-morra": { ...EMPTY_INSIGHT },
};

export function getZoneInsight(zoneSlug: string): ZoneInsight {
  return ZONE_INSIGHTS[zoneSlug] ?? EMPTY_INSIGHT;
}
