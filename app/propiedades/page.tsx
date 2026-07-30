import type { Metadata } from "next";
import Link from "next/link";
import { getFilteredProperties, getNeighborhoods, getZones } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import FilterSidebar from "@/components/FilterSidebar";
import SortSelect from "@/components/SortSelect";
import type { OperationType, PropertyType, SortOption } from "@/lib/types";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Propiedades";
const DESCRIPTION =
  "Propiedades seleccionadas en venta y alquiler en Asunción y Central, Paraguay.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/propiedades` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/propiedades`,
    siteName: SITE_NAME,
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

interface PageProps {
  searchParams: {
    type?: string;
    operation?: string;
    neighborhood?: string;
    maxPrice?: string;
    minBedrooms?: string;
    sort?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const neighborhoods = await getNeighborhoods();
  const zones = await getZones();

  const sort = (searchParams.sort as SortOption) ?? "recent";

  const properties = await getFilteredProperties(
    {
      type: searchParams.type as PropertyType | undefined,
      operation: searchParams.operation as OperationType | undefined,
      neighborhood: searchParams.neighborhood,
      maxPrice: searchParams.maxPrice
        ? Number(searchParams.maxPrice)
        : undefined,
      minBedrooms: searchParams.minBedrooms
        ? Number(searchParams.minBedrooms)
        : undefined,
    },
    sort
  );

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <h1 className="font-serif text-3xl text-navy">Propiedades</h1>
      <p className="mt-2 text-text/60">
        {properties.length}{" "}
        {properties.length === 1
          ? "propiedad encontrada"
          : "propiedades encontradas"}
      </p>

      {zones.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-text/50">Explorá por zona:</span>
          {zones.map((zone) => (
            <Link
              key={zone.slug}
              href={`/propiedades/zona/${zone.slug}`}
              className="text-xs text-navy underline hover:text-gold"
            >
              {zone.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        <FilterSidebar neighborhoods={neighborhoods} />

        <div className="flex-1">
          <div className="mb-6 flex justify-end">
            <SortSelect sort={sort} />
          </div>

          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white py-24 text-center">
              <p className="font-serif text-xl text-navy">
                No encontramos propiedades con esos filtros
              </p>
              <p className="mt-2 text-sm text-text/60">
                Probá ajustando los criterios de búsqueda.
              </p>
              <Link
                href="/propiedades"
                className="mt-6 border border-navy px-6 py-2 text-sm text-navy transition-colors hover:border-gold hover:text-gold"
              >
                Resetear filtros
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
