/**
 * Años de trayectoria de Sonia en el mercado inmobiliario/financiero.
 * Todavía no confirmado — Brian va a pasar el número real. En cuanto lo
 * tengas, cambiá `null` por el número (ej. `8`) y se va a mostrar
 * automáticamente en la home y en /sobre-mi. Mientras esté en `null`,
 * el sitio usa el texto genérico "amplia trayectoria".
 */
export const YEARS_OF_EXPERIENCE: number | null = null;

export interface Testimonial {
  quote: string;
  author: string;
  /** Foto del cliente. Opcional — si no hay, se muestra sin avatar. */
  avatar?: string;
  /** Link a la reseña original (Google, etc.), para dar más credibilidad. */
  sourceUrl?: string;
}

/**
 * Testimonios de ejemplo. Reemplazar por reseñas reales cuando estén
 * disponibles — agregar `avatar` (ruta de imagen) y `sourceUrl` (link a la
 * reseña, si existe) para que se muestren automáticamente en la home.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sonia nos acompañó en todo el proceso con una profesionalidad excepcional. Encontramos la casa perfecta en tiempo récord.",
    author: "Familia Gómez",
  },
  {
    quote:
      "Su conocimiento del mercado inmobiliario de Asunción es inigualable. Recomendable sin dudarlo.",
    author: "M. Etchevarne",
  },
  {
    quote:
      "Vendimos nuestra propiedad al mejor precio posible gracias a su estrategia y su red de contactos.",
    author: "L. Bertolino",
  },
];
