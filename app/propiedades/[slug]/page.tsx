import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProperties,
  getPropertyBySlug,
  getSimilarProperties,
  formatPrice,
} from "@/lib/data";
import type { PropertySpecs } from "@/lib/types";
import Gallery from "@/components/Gallery";
import PropertyCard from "@/components/PropertyCard";
import SectionDivider from "@/components/SectionDivider";
import { WhatsAppInline } from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { propertyJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return {};

  const description = `${property.title} en ${property.location.neighborhood}, ${property.location.city}. ${formatPrice(property.price, property.currency)}.`;
  const url = `${SITE_URL}/propiedades/${property.slug}`;

  return {
    title: property.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: property.title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_PY",
      type: "website",
      images: [{ url: property.images[0], width: 1200, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: [property.images[0]],
    },
  };
}

const specLabels: { key: keyof PropertySpecs; label: string }[] = [
  { key: "totalArea", label: "M² totales" },
  { key: "coveredArea", label: "M² cubiertos" },
  { key: "bedrooms", label: "Dormitorios" },
  { key: "bathrooms", label: "Baños" },
  { key: "garages", label: "Cocheras" },
  { key: "yearBuilt", label: "Antigüedad" },
];

export default async function PropertyDetailPage({ params }: PageProps) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = await getSimilarProperties(property);
  const isSold = property.status === "vendida";
  const whatsappMessage = `Hola Sonia, me interesa la propiedad "${property.title}" (ref. ${property.id}). ¿Podemos coordinar una visita?`;

  return (
    <main className="pb-24 pt-24">
      <JsonLd data={propertyJsonLd(property)} />
      <div className="mx-auto max-w-7xl px-6">
        <Gallery images={property.images} alt={property.title} />
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-wide text-gold">
                {property.operation === "venta" ? "EN VENTA" : "EN ALQUILER"}
              </span>
              {isSold && (
                <span className="bg-gray-800 px-3 py-1 text-xs tracking-wide text-white">
                  Vendida
                </span>
              )}
              {property.status === "reservada" && (
                <span className="bg-gray-500 px-3 py-1 text-xs tracking-wide text-white">
                  Reservada
                </span>
              )}
            </div>
            <h1 className="mt-2 font-serif text-3xl text-navy">
              {property.title}
            </h1>
            <p className="mt-1 text-text/60">
              {property.location.neighborhood}, {property.location.city} —{" "}
              {property.location.address}
            </p>
            <p
              className={`mt-4 font-serif text-3xl ${isSold ? "text-text/40 line-through" : "text-gold"}`}
            >
              {property.priceFrom && property.price !== null && (
                <span className="text-base text-text/50">Desde </span>
              )}
              {formatPrice(property.price, property.currency)}
              {property.price !== null && property.operation === "alquiler" && (
                <span className="text-base text-text/50"> /mes</span>
              )}
            </p>
            {property.priceFrom && property.price !== null && (
              <p className="mt-1 text-sm text-text/50">
                Precio de la unidad más económica disponible. Consultá por
                las demás tipologías.
              </p>
            )}
            {property.price === null && (
              <p className="mt-1 text-sm text-text/50">
                Todavía no está confirmado el precio de lista. Escribinos por
                WhatsApp y te avisamos apenas esté disponible.
              </p>
            )}

            <SectionDivider center={false} />

            {Object.values(property.specs).some((v) => v > 0) && (
              <>
                <h2 className="mt-8 font-serif text-xl text-navy">
                  Características
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {specLabels.map(({ key, label }) => (
                    <div key={key} className="bg-white p-4">
                      <p className="text-xs text-text/50">{label}</p>
                      <p className="mt-1 font-serif text-lg text-navy">
                        {property.specs[key] || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2 className="mt-10 font-serif text-xl text-navy">
              Descripción
            </h2>
            <p className="mt-3 leading-relaxed text-text/80">
              {property.description}
            </p>

            {property.features.length > 0 && (
              <>
                <h2 className="mt-10 font-serif text-xl text-navy">
                  Amenities
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {property.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-text/80"
                    >
                      <span className="text-gold">✦</span> {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-10 font-serif text-xl text-navy">Ubicación</h2>
            <div className="mt-3 aspect-video w-full overflow-hidden">
              <iframe
                title="Mapa de ubicación"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
              />
            </div>
          </div>

          {/* Sidebar de contacto */}
          <aside>
            <div className="sticky top-28 bg-navy p-6 text-cream">
              <p className="font-serif text-lg">
                {isSold
                  ? "Esta propiedad ya fue vendida"
                  : "¿Te interesa esta propiedad?"}
              </p>
              <p className="mt-2 text-sm text-cream/70">
                {isSold
                  ? "Consultá a Sonia por propiedades similares disponibles."
                  : "Coordiná una visita directamente con Sonia por WhatsApp."}
              </p>
              <WhatsAppInline
                message={
                  isSold
                    ? `Hola Sonia, vi que la propiedad "${property.title}" ya fue vendida. ¿Tenés algo similar disponible?`
                    : whatsappMessage
                }
                className="mt-6 block bg-cream px-6 py-3 text-center text-sm tracking-wide text-navy transition-colors hover:bg-white"
              >
                CONSULTAR POR WHATSAPP
              </WhatsAppInline>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <h2 className="font-heading text-2xl text-navy">
            Propiedades similares
          </h2>
          <SectionDivider center={false} />
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* Botón sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-white p-3 lg:hidden">
        <WhatsAppInline
          message={whatsappMessage}
          className="block bg-navy px-6 py-3 text-center text-sm tracking-wide text-cream"
        >
          CONSULTAR POR WHATSAPP
        </WhatsAppInline>
      </div>
    </main>
  );
}
