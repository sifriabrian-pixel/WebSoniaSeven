/**
 * Años de trayectoria de Sonia como Contadora y Analista Financiera.
 * Confirmado por Brian: 12 años. Se muestra automáticamente en la home
 * y en /sobre-mi.
 */
export const YEARS_OF_EXPERIENCE: number | null = 12;

/**
 * Barra de confianza (franja de números debajo del hero). `propertiesManaged`,
 * `dollarsSoldMillions` y `realEstateYears` son datos reales confirmados por
 * Sonia. `avgAppreciationPct`/`avgClosingDays` todavía no están documentados
 * — se ocultan en el sitio hasta que se confirmen (no publicar un número que
 * no se pueda sostener frente a un inversor).
 */
export interface TrustBarStats {
  propertiesManaged: number;
  /** Millones de USD vendidos en la trayectoria de Sonia. */
  dollarsSoldMillions: number;
  /** Años de experiencia de Sonia en el mercado inmobiliario (distinto de `YEARS_OF_EXPERIENCE`, que son sus años como Contadora/Analista Financiera). */
  realEstateYears: number;
  avgAppreciationPct: number | null;
  avgClosingDays: number | null;
}

export const TRUST_BAR: TrustBarStats = {
  propertiesManaged: 500,
  dollarsSoldMillions: 40,
  realEstateYears: 9,
  avgAppreciationPct: null,
  avgClosingDays: null,
};

export interface Testimonial {
  quote: string;
  author: string;
  /** Foto del cliente. Opcional — si no hay, se muestra sin avatar. */
  avatar?: string;
  /** Link a la reseña original (Google, etc.), para dar más credibilidad. */
  sourceUrl?: string;
  /** Resultado numérico verificable, ej. "+18% en 10 meses". Opcional. */
  result?: string;
}

/**
 * Testimonios reales. Vacío hasta tener mínimo 2 casos verificables (nombre
 * real o iniciales autorizadas por el cliente) — mientras esté vacío, la
 * home muestra el copy de transición "Los primeros resultados están en
 * camino" en vez del carousel. Agregar `avatar` (ruta de imagen) y
 * `sourceUrl` (link a la reseña, si existe) cuando corresponda.
 */
export const TESTIMONIALS: Testimonial[] = [];
