# Seven Inmobiliaria

Sitio web de Seven Inmobiliaria, de Sonia García (asesora de CENTURY 21 Seven) en Asunción y Central, Paraguay. Construido con Next.js 14 (App Router), TypeScript y Tailwind CSS.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Cómo agregar o editar propiedades

Todas las propiedades viven en [`data/properties.json`](data/properties.json). Cada propiedad es un objeto con esta forma:

```json
{
  "id": "sg-009",
  "slug": "nombre-unico-para-la-url",
  "title": "Título de la propiedad",
  "operation": "venta",       // "venta" | "alquiler"
  "type": "casa",             // "casa" | "departamento" | "terreno" | "comercial"
  "price": 250000,
  "currency": "USD",
  "priceFrom": false,          // true si es un proyecto con varias tipologías y el precio es "desde"
  "location": {
    "city": "Luque",
    "neighborhood": "Luque",
    "address": "Aprox. Av. Ejemplo al 1000"
  },
  "specs": {
    "bedrooms": 3,
    "bathrooms": 2,
    "totalArea": 300,
    "coveredArea": 200,
    "garages": 1,
    "yearBuilt": 2020
  },
  "description": "Texto largo de la propiedad...",
  "features": ["Pileta", "Quincho"],
  "images": ["/images/properties/sg-009-1.jpg"],
  "coordinates": { "lat": -25.27, "lng": -57.49 },
  "featured": false,
  "status": "disponible"     // "nueva" | "disponible" | "reservada" | "vendida"
}
```

Notas sobre `status`:
- `"nueva"` muestra el badge dorado "Nueva" en la card.
- `"disponible"` no muestra badge (es el estado por defecto).
- `"reservada"` muestra un badge gris "Reservada".
- `"vendida"` se oculta automáticamente del listado, la home y "propiedades similares" — pero la ficha sigue siendo accesible por su URL directa, mostrando el precio tachado y un aviso de que ya se vendió.

Para que una propiedad aparezca en la sección "Destacadas" de la home, poné `"featured": true` (se recomienda tener entre 3 y 4 destacadas a la vez).

**Proyectos con varias tipologías** (ej. un edificio en pozo con monoambientes, 1, 2 y 3 dormitorios a distintos precios): cargalo como una sola propiedad con `"priceFrom": true` y el precio de la unidad más económica — el sitio va a mostrar "Desde USD X" automáticamente. En `specs`, dejá en `0` los valores que no apliquen a nivel proyecto (dormitorios/baños/m²): el sitio oculta esos datos en vez de mostrar un "0" falso, y el detalle de tipologías va en la `description`.

`location.neighborhood` define automáticamente la zona: cada barrio/ciudad distinto genera su propia landing page en `/propiedades/zona/[zona]` y aparece como filtro y como link "Explorá por zona" en `/propiedades`. No hace falta crear nada a mano.

### Dónde poner las imágenes

Colocá las fotos en `public/images/properties/` y referencialas en el array `images` con la ruta que empieza en `/images/...` (por ejemplo `/images/properties/sg-009-1.jpg`). La primera imagen del array es la que se usa como portada en las cards, en Open Graph (la vista previa al compartir por WhatsApp) y en la galería.

Mientras no haya fotos reales, el sitio usa imágenes de stock de Unsplash cargadas directamente por URL — podés dejar esas URLs o reemplazarlas por rutas locales, ambas funcionan.

## Cómo agregar artículos al blog

Ver [`content/blog/README.md`](content/blog/README.md). En resumen: un archivo `.md` por artículo en `content/blog/`, con `title`/`excerpt`/`date` en el encabezado. El listado en `/blog` y la página individual se generan solos.

## Configurar el formulario de novedades (Formspree)

El bloque "Recibí notificaciones de nuevas propiedades" (home y footer) envía a [Formspree](https://formspree.io). Hasta que se configure, el sitio muestra un mensaje neutro en vez de un formulario roto.

Para activarlo:
1. Crear un formulario en Formspree y copiar su ID.
2. Configurar la variable de entorno `NEXT_PUBLIC_FORMSPREE_ID` en Vercel (Project Settings → Environment Variables) con ese ID.
3. Redeployar.

## Estructura del proyecto

- `app/` — páginas: home, `/propiedades`, `/propiedades/[slug]`, `/propiedades/zona/[zona]`, `/sobre-mi`, `/contacto`, `/blog`, `/blog/[slug]`, más `sitemap.ts` y `robots.ts`
- `components/` — componentes reutilizables (Navbar, Footer, PropertyCard, FilterSidebar, SortSelect, Gallery, WhatsAppButton, NewsletterForm, JsonLd, SectionDivider)
- `data/properties.json` — datos de propiedades (fuente única de verdad por ahora)
- `content/blog/` — artículos del blog en Markdown
- `content/copy-lujo-archivado.md` — copy de posicionamiento "de lujo" archivado (ver sección de abajo)
- `lib/data.ts` — funciones de acceso a datos (`getAllProperties`, `getFeaturedProperties`, `getPropertyBySlug`, `getFilteredProperties`, `getZones`, etc.). Todas son `async` a propósito: el día que se migre a una base de datos (Supabase), solo hay que reescribir el cuerpo de estas funciones para que consulten la base en vez del JSON — el resto del sitio no cambia.
- `lib/blog.ts` — lectura de artículos del blog
- `lib/content.ts` — copy configurable: años de trayectoria y testimonios
- `lib/seo.ts` — datos del agente (Sonia) y URL del sitio para JSON-LD/Open Graph
- `lib/types.ts` — tipos TypeScript compartidos

## Configurar WhatsApp

El número de WhatsApp está centralizado en [`components/WhatsAppButton.tsx`](components/WhatsAppButton.tsx) en la constante `WHATSAPP_NUMBER` (formato internacional sin `+` ni espacios). Ya está cargado el número real de Sonia (`595971561916`).

## SEO

- **Datos estructurados (JSON-LD):** `RealEstateAgent` en el layout global y `RealEstateListing` en cada ficha de propiedad (ver [`lib/seo.ts`](lib/seo.ts)).
- **Open Graph / WhatsApp preview:** cada página tiene `og:title`, `og:description`, `og:image` y `og:url` propios vía `generateMetadata`.
- **Sitemap y robots:** `app/sitemap.ts` y `app/robots.ts` se generan solos a partir de `properties.json` (incluye zonas y blog cuando corresponde).
- **`NEXT_PUBLIC_SITE_URL`:** si el dominio final no es `web-sonia-seven.vercel.app`, configurar esta variable de entorno en Vercel con la URL real para que el sitemap, el JSON-LD y el Open Graph usen las URLs correctas.

## Posicionamiento: "de lujo" vs. catálogo real

El copy actual dice "asesoramiento inmobiliario integral" en vez de "real estate de lujo", porque el catálogo mezcla precios desde USD 82.000 hasta USD 340.000 y un alquiler de USD 900/mes — una promesa de exclusividad de lujo contradice ese rango. El copy anterior de posicionamiento "de lujo" quedó guardado en [`content/copy-lujo-archivado.md`](content/copy-lujo-archivado.md) por si el catálogo se depura a solo propiedades premium más adelante.

## Deploy

El proyecto está deployado en Vercel: `web-sonia-seven.vercel.app`. Cualquier push a `main` en GitHub dispara un redeploy automático.

## Pendientes de contenido

Estos valores quedaron como placeholder a la espera de datos reales de Brian:

- **Años de trayectoria:** hoy el sitio no muestra un número de años (se sacó "amplia trayectoria" y no se reemplazó por una cifra porque no la tenemos confirmada). Configurable en `lib/content.ts` → `YEARS_OF_EXPERIENCE` en cuanto Brian confirme el número.
- **Testimonios con foto:** la estructura ya soporta `avatar` (ruta de imagen) y `sourceUrl` (link a la reseña real, si existe) en `lib/content.ts` → `TESTIMONIALS`. Hoy los 3 testimonios son de ejemplo, sin foto ni link — reemplazar por reseñas reales cuando estén disponibles.
- **Formspree ID:** falta crear el formulario en Formspree y configurar `NEXT_PUBLIC_FORMSPREE_ID` en Vercel (ver sección de arriba). Hasta entonces el bloque de novedades muestra un mensaje neutro en vez de un formulario roto.
- **Copy final de posicionamiento:** confirmar con Brian/Sonia si "asesoramiento inmobiliario integral" es el mensaje definitivo, o si conviene depurar el catálogo a solo propiedades premium y volver a "real estate de lujo" (copy archivado en `content/copy-lujo-archivado.md`).
- **Habitalis Jardín (Villa Morra):** proyecto real de la carpeta de Brian, todavía no cargado porque ningún documento de esa carpeta tiene precio. En cuanto Brian confirme el precio (aunque sea "desde"), se carga igual que los otros 4.
- **Specs exactos de las propiedades cargadas:** Afianza Recoleta #8 y Altea de Gaulle son proyectos en pozo con varias tipologías — el precio mostrado es el de la unidad más económica ("Desde"), sin m²/dormitorios fijos a nivel card. El penthouse de Edificio Italia no tiene m² totales confirmados en la documentación (sí dormitorios, baños y cochera). Completar cuando Brian tenga esos datos.
