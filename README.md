# Seven by Sonia García

Sitio web de Seven by Sonia García, marca personal de real estate de lujo. Construido con Next.js 14 (App Router), TypeScript y Tailwind CSS.

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
  "location": {
    "city": "Rosario",
    "neighborhood": "Fisherton",
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
  "coordinates": { "lat": -32.9, "lng": -60.7 },
  "featured": false,
  "status": "disponible"     // "disponible" | "exclusiva" | "reservada"
}
```

Para que una propiedad aparezca en la sección "Destacadas" de la home, poné `"featured": true` (se recomienda tener entre 3 y 4 destacadas a la vez).

### Dónde poner las imágenes

Colocá las fotos en `public/images/properties/` y referencialas en el array `images` con la ruta que empieza en `/images/...` (por ejemplo `/images/properties/sg-009-1.jpg`). La primera imagen del array es la que se usa como portada en las cards y en la galería.

Mientras no haya fotos reales, el sitio usa imágenes de stock de Unsplash cargadas directamente por URL — podés dejar esas URLs o reemplazarlas por rutas locales, ambas funcionan.

## Estructura del proyecto

- `app/` — páginas (home, `/propiedades`, `/propiedades/[slug]`, `/sobre-mi`, `/contacto`)
- `components/` — componentes reutilizables (Navbar, Footer, PropertyCard, FilterSidebar, Gallery, WhatsAppButton, SectionDivider)
- `data/properties.json` — datos de propiedades (fuente única de verdad por ahora)
- `lib/data.ts` — funciones de acceso a datos (`getAllProperties`, `getFeaturedProperties`, `getPropertyBySlug`, `getFilteredProperties`, etc.). Todas son `async` a propósito: el día que se migre a una base de datos (Supabase), solo hay que reescribir el cuerpo de estas funciones para que consulten la base en vez del JSON — el resto del sitio no cambia.
- `lib/types.ts` — tipos TypeScript compartidos

## Configurar WhatsApp

El número de WhatsApp está centralizado en [`components/WhatsAppButton.tsx`](components/WhatsAppButton.tsx) en la constante `WHATSAPP_NUMBER` (formato internacional sin `+` ni espacios, ej. `5493410000000`). Reemplazalo por el número real antes de publicar.

## Deploy

El proyecto está listo para conectarse a [Vercel](https://vercel.com/new): importá el repo de GitHub y Vercel detecta la configuración de Next.js automáticamente. No requiere variables de entorno en esta primera versión.

Si más adelante se agrega el formulario de contacto vía Formspree, sumar la variable `NEXT_PUBLIC_FORMSPREE_ID` en la configuración del proyecto en Vercel.
