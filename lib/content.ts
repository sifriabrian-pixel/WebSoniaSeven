/**
 * Años de trayectoria de Sonia como Contadora y Analista Financiera.
 * Confirmado por Brian: 12 años. Se muestra automáticamente en la home
 * y en /sobre-mi.
 */
export const YEARS_OF_EXPERIENCE: number | null = 12;

/**
 * Barra de confianza (franja de números debajo del hero). `propertiesManaged`
 * es un dato real; los otros dos todavía no están documentados — se muestran
 * como [DATO] en el sitio hasta que Brian los confirme (no publicar un
 * número que no se pueda sostener frente a un inversor).
 */
export interface TrustBarStats {
  propertiesManaged: number;
  avgAppreciationPct: number | null;
  avgClosingDays: number | null;
}

export const TRUST_BAR: TrustBarStats = {
  propertiesManaged: 50,
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
