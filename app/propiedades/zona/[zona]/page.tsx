import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getZones,
  getZoneBySlug,
  getPropertiesByZoneSlug,
} from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import SectionDivider from "@/components/SectionDivider";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: { zona: string };
}

export async function generateStaticParams() {
  const zones = await getZones();
  return zones.map((z) => ({ zona: z.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const zone = await getZoneBySlug(params.zona);
  if (!zone) return {};

  const title = `Propiedades en venta en ${zone.name}, ${zone.city}`;
  const description = `Casas, departamentos y terrenos disponibles en ${zone.name}, ${zone.city}, Paraguay. Asesoramiento de Sonia García, Directora de Seven Real Estate.`;
  const url = `${SITE_URL}/propiedades/zona/${zone.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_PY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ZonePage({ params }: PageProps) {
  const zone = await getZoneBySlug(params.zona);
  if (!zone) notFound();

  const properties = await getPropertiesByZoneSlug(params.zona);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <Link
        href="/propiedades"
        className="text-sm text-text/60 hover:text-gold"
      >
        ← Todas las propiedades
      </Link>

      <h1 className="mt-4 font-serif text-3xl text-navy">
        Propiedades en {zone.name}, {zone.city}
      </h1>
      <SectionDivider center={false} />
      <p className="mt-2 text-text/60">
        {properties.length}{" "}
        {properties.length === 1
          ? "propiedad disponible"
          : "propiedades disponibles"}{" "}
        en {zone.name}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
