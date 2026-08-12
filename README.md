# Sonia García — Seven Real Estate

Sitio web de Sonia García (asesora de CENTURY 21 Seven), marca "Seven Real Estate", en Asunción y Central, Paraguay. Construido con Next.js 14 (App Router), TypeScript, Tailwind CSS y Framer Motion.

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

## Configurar el formulario de conversión (Formspree)

El bloque "Recibí oportunidades antes de que lleguen al mercado" (mid-page en home y footer) envía a [Formspree](https://formspree.io). Hasta que se configure, en vez de un formulario roto el sitio muestra un botón "Quiero recibir oportunidades" que abre WhatsApp con un mensaje prellenado — nunca un texto tipo "formulario en configuración" visible a usuarios finales.

Para activarlo:
1. Crear un formulario en Formspree y copiar su ID.
2. Configurar la variable de entorno `NEXT_PUBLIC_FORMSPREE_ID` en Vercel (Project Settings → Environment Variables) con ese ID.
3. Redeployar.

## Identidad de marca

Colores y logo vienen del kit de marca que pasó Brian (`ARCHIVOS SONIA GARCÍA.zip`), sampleados directamente de los PNG del logo — no son una conversión aproximada de CMYK:

- **Maroon (marca):** `#823b4b` — variable `--color-navy` en [`app/globals.css`](app/globals.css). Es el único color de acento de la marca (antes había navy + gold como dos tonos separados; ahora ambos apuntan al mismo maroon).
- **Maroon oscuro:** `#4e232d` — variable `--color-navy-dark`, derivado (oscurecido) para fondos profundos como el footer. No viene del kit de marca, es un cálculo para mantener la jerarquía visual que ya tenía el sitio.
- **Gris de marca:** `#cecece` — variable `--color-gray`, expuesta en Tailwind como `graybrand` (no `gray`, para no pisar la escala `gray-50..900` de Tailwind que ya usaban los badges de "Reservada"/"Vendida"). Se usa como color de hover/interacción sobre fondos oscuros, donde el maroon no tiene contraste suficiente contra sí mismo.
- **Cream (marca):** `#e6d7c4` — variable `--color-cream`, fondo principal del sitio.
- **Tipografía de títulos:** Playfair Display (Google Fonts), no la "British Green" del kit de marca — esa fuente es de **uso personal únicamente** según su propio Read Me, no se puede usar en un sitio comercial sin licencia paga. Playfair Display tiene el mismo espíritu editorial de alto contraste y ya estaba integrada.
- **Tipografía de texto:** Inter (Google Fonts), reemplaza a Poppins.
- **Isotipo:** el mark en forma de "7" en `public/images/brand/mark-maroon.png` (fondos claros) y `mark-white.png` (fondos oscuros), recortado del archivo `ICONO1.png` del kit. El favicon (`app/icon.png`) se generó centrando ese mismo mark.

Como la marca ahora tiene un solo color de acento (no dos como antes), cualquier elemento nuevo que use `text-gold`/`border-gold`/`bg-gold` sobre un fondo `bg-navy`/`bg-navy-dark` va a quedar invisible (mismo color de texto y de fondo) — usar `cream`/`white` para texto sobre fondo oscuro, y `graybrand` para estados de hover sobre fondo oscuro.

## Home orientada a inversor

El hero es directo y de un solo modo (invertir): título, una línea de subtítulo, un CTA dominante ("Ver oportunidades de inversión") y un link secundario para quien busca vivir. No tiene buscador ni toggle Vivir/Invertir — ese filtro vive en `/propiedades`.

**Fondo del hero:** es una foto de stock de Unsplash (obra/construcción) marcada con `{/* TODO: reemplazar por foto real de desarrollo o skyline Asunción */}` en `components/HeroSection.tsx` — se cambió la foto anterior (una pileta lifestyle) porque contradecía el posicionamiento inversor. Pendiente que Brian confirme el asset final (foto real de un desarrollo en pozo o una toma aérea de Asunción).

Más abajo, "Propiedades destacadas" (`components/FeaturedPropertiesSection.tsx`) sigue operando en modo "Invertir" por default (mostrando rentabilidad estimada, plusvalía de zona y tipo de operación en vez de dormitorios/baños/m²), con chips de filtro por tipo de operación. El modo vive en `components/InvestorModeContext.tsx` (React Context) — hoy no hay ningún control en la UI para cambiarlo a "Vivir"; queda así a propósito, coherente con el posicionamiento de inversión de la home.

Secciones nuevas relacionadas:
- **Barra de confianza** (`components/TrustBar.tsx`) — franja de números debajo del hero. Editable en `lib/content.ts` → `TRUST_BAR`.
- **Inteligencia de zona** (`components/ZoneIntelligence.tsx`) — plusvalía/precio por m²/demanda de alquiler por zona. Editable en `lib/zoneInsights.ts`.
- **`Property.investment`** (`lib/types.ts`) — rentabilidad estimada, plusvalía y tipo de operación (Reventa/Renta/Desarrollo en pozo) por propiedad, usado en modo Invertir.

**Política de datos faltantes: nunca se publica `[DATO]` ni ningún placeholder visible.** Donde falta un dato real (plusvalía, tiempo de cierre, rentabilidad estimada por propiedad, insight de zona), el sitio oculta ese elemento puntual en vez de mostrarlo vacío o con un placeholder:
- Barra de confianza: si falta "Plusvalía prom." o "Tiempo prom. de cierre", se muestran solo 2 stats centradas (Propiedades gestionadas + Oficial C21) en vez de 4 casilleros con huecos.
- Cards de propiedad (modo Invertir): la línea de "Rentabilidad" o "Plusvalía zona" se omite si el dato es `null`, sin dejar espacio vacío.
- Inteligencia de zona: solo se publican zonas con los 3 datos completos, y la sección entera se oculta si hay menos de 2 zonas completas (hoy: oculta, las 4 zonas están en `null`).

**Excepción temporal — testimonios:** `components/Testimonials.tsx` hoy muestra 3 testimonios **ficticios** (marcados `PLACEHOLDER` en el código) para poder maquetar la sección, a pedido explícito de Brian. Esto es una excepción puntual a la política de arriba, no un cambio de criterio general — hay que reemplazarlos por casos reales de Sonia antes de publicar (ver "Pendientes de contenido"). El slot de testimonios reales (`lib/content.ts` → `TESTIMONIALS`) sigue vacío y no se usa mientras estén los placeholders.

Ver la sección "Pendientes de contenido" más abajo para la lista completa de lo que falta completar.

## Animaciones (Framer Motion)

- **Reveal-on-scroll** (`components/Reveal.tsx`): fade-up genérico (`opacity 0→1`, `y 24px→0`) que dispara una sola vez al entrar en viewport (`whileInView`, `once: true`). Envuelve la mayoría de las secciones y cards del sitio — reemplazó la versión anterior basada en `IntersectionObserver` + CSS.
- **Contador animado** (`components/AnimatedCounter.tsx`): usa `useInView` + `useMotionValue`/`animate` de Framer Motion, dispara una sola vez, ~1.5s con easing `easeOut`. Respeta `prefers-reduced-motion`.
- **Hover en cards de propiedad** (`components/PropertyCard.tsx`): zoom sutil de imagen (`scale: 1.05`) + elevación de card (`y: -4px` + sombra), vía `variants` de Framer Motion.
- **Filtro de "Oportunidades activas"** (`components/FeaturedPropertiesSection.tsx`): al cambiar de filtro, las cards que entran/salen animan con `AnimatePresence` + `layout`, así el grid se reacomoda sin saltos.

## Estructura del proyecto

- `app/` — páginas: home, `/propiedades`, `/propiedades/[slug]`, `/propiedades/zona/[zona]`, `/sobre-mi`, `/contacto`, `/blog`, `/blog/[slug]`, más `sitemap.ts` y `robots.ts`
- `components/` — componentes reutilizables: Navbar, Footer, PropertyCard, FilterSidebar, SortSelect, Gallery, WhatsAppButton, ConversionForm, JsonLd, SectionDivider, Wordmark, más los de la home orientada a inversor (HeroSection, InvestorModeContext, TrustBar, ValueProposition, FeaturedPropertiesSection, ZoneIntelligence, Testimonials)
- `data/properties.json` — datos de propiedades (fuente única de verdad por ahora)
- `content/blog/` — artículos del blog en Markdown
- `content/copy-lujo-archivado.md` — copy de posicionamiento "de lujo" archivado (ver sección de abajo)
- `lib/data.ts` — funciones de acceso a datos (`getAllProperties`, `getFeaturedProperties`, `getPropertyBySlug`, `getFilteredProperties`, `getZones`, etc.). Todas son `async` a propósito: el día que se migre a una base de datos (Supabase), solo hay que reescribir el cuerpo de estas funciones para que consulten la base en vez del JSON — el resto del sitio no cambia.
- `lib/blog.ts` — lectura de artículos del blog
- `lib/content.ts` — copy configurable: años de trayectoria, barra de confianza y testimonios
- `lib/zoneInsights.ts` — datos de mercado por zona (plusvalía, precio por m², demanda de alquiler)
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
- **Testimonios reales (⚠️ bloqueante antes de publicar):** `components/Testimonials.tsx` hoy muestra 3 testimonios **ficticios** puestos a pedido de Brian solo para maquetar la sección — no son reales y no deben quedar así en producción. Sonia tiene que proveer casos reales (nombre real o iniciales autorizadas) para reemplazarlos.
- **Formspree ID:** falta crear el formulario en Formspree y configurar `NEXT_PUBLIC_FORMSPREE_ID` en Vercel (ver sección de arriba). Hasta entonces el bloque de novedades muestra un botón que abre WhatsApp en vez de un formulario roto.
- **Copy final de posicionamiento:** confirmar con Brian/Sonia si "asesoramiento inmobiliario integral" es el mensaje definitivo, o si conviene depurar el catálogo a solo propiedades premium y volver a "real estate de lujo" (copy archivado en `content/copy-lujo-archivado.md`).
- **Habitalis Jardín (Villa Morra):** proyecto real de la carpeta de Brian, todavía no cargado porque ningún documento de esa carpeta tiene precio. En cuanto Brian confirme el precio (aunque sea "desde"), se carga igual que los otros 4.
- **Specs exactos de las propiedades cargadas:** Afianza Recoleta #8 y Altea de Gaulle son proyectos en pozo con varias tipologías — el precio mostrado es el de la unidad más económica ("Desde"), sin m²/dormitorios fijos a nivel card. El penthouse de Edificio Italia no tiene m² totales confirmados en la documentación (sí dormitorios, baños y cochera). Completar cuando Brian tenga esos datos.
- **Plusvalía promedio de zona y tiempo promedio de cierre** (`lib/content.ts` → `TRUST_BAR`): en `null`, por eso la barra de confianza muestra solo 2 stats en vez de 4. Completar ambos para que reaparezcan las 4.
- **Datos por zona** (`lib/zoneInsights.ts`): plusvalía 24 meses, precio promedio por m² y demanda de alquiler de Recoleta, La Encarnación, Trinidad y Villa Morra — las 4 zonas están en `null`, por eso la sección "Inteligencia de zona" está oculta (se necesita mínimo 2 zonas con los 3 datos completos para que se muestre). Es la sección que el propio brief de Brian marca como el diferencial más fuerte del sitio frente a portales genéricos, así que vale la pena priorizar completarla.
- **Rentabilidad estimada y plusvalía por propiedad** (`data/properties.json` → `investment.rentalYieldPct` / `investment.zoneAppreciationPct`): en `null` para las 4 propiedades reales, por eso esas líneas no aparecen en las cards en modo "Invertir". Solo `dealType` (Reventa/Renta/Desarrollo en pozo) está completo.
