/**
 * Años de trayectoria de Sonia en el mercado inmobiliario/financiero.
 * Todavía no confirmado — Brian va a pasar el número real. En cuanto lo
 * tengas, cambiá `null` por el número (ej. `8`) y se va a mostrar
 * automáticamente en la home y en /sobre-mi. Mientras esté en `null`,
 * el sitio usa el texto genérico "amplia trayectoria".
 */
export const YEARS_OF_EXPERIENCE: number | null = null;

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
 * Testimonios de ejemplo. Reemplazar por reseñas reales cuando estén
 * disponibles — agregar `avatar` (ruta de imagen) y `sourceUrl` (link a la
 * reseña, si existe) para que se muestren automáticamente en la home.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sonia nos ayudó a identificar la zona correcta antes de invertir. Hoy esa propiedad se revalorizó [DATO]% en menos de un año.",
    author: "Familia Gómez",
  },
  {
    quote:
      "Su conocimiento del mercado inmobiliario de Asunción es inigualable. Recomendable sin dudarlo.",
    author: "M. Etchevarne",
  },
  {
    quote:
      "Su análisis de mercado nos permitió vender al mejor precio posible en [DATO] días, cuando el promedio de la zona es de [DATO].",
    author: "L. Bertolino",
  },
];
