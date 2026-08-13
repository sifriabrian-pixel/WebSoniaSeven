import propertiesData from "@/data/properties.json";
import type { Property, PropertyFilters, SortOption } from "@/lib/types";
import { slugify } from "@/lib/slug";

/**
 * Capa de acceso a datos. Hoy lee del JSON estático; el día que se migre
 * a Supabase, solo hay que reescribir estas funciones (misma firma) para
 * que consulten la base en lugar del archivo.
 */

const properties = propertiesData as Property[];

export async function getAllProperties(): Promise<Property[]> {
  return properties;
}

/** Propiedades que se muestran en listados públicos: excluye las vendidas. */
export async function getActiveProperties(): Promise<Property[]> {
  return properties.filter((p) => p.status !== "vendida");
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return properties.filter((p) => p.featured && p.status !== "vendida");
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | undefined> {
  return properties.find((p) => p.slug === slug);
}

export async function getSimilarProperties(
  property: Property,
  limit = 3
): Promise<Property[]> {
  return properties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status !== "vendida" &&
        (p.type === property.type ||
          p.location.neighborhood === property.location.neighborhood)
    )
    .slice(0, limit);
}

export async function getFilteredProperties(
  filters: PropertyFilters,
  sort: SortOption = "recent"
): Promise<Property[]> {
  let result = properties.filter((p) => p.status !== "vendida");

  if (filters.type) {
    result = result.filter((p) => p.type === filters.type);
  }
  if (filters.operation) {
    result = result.filter((p) => p.operation === filters.operation);
  }
  if (filters.neighborhood) {
    result = result.filter(
      (p) => p.location.neighborhood === filters.neighborhood
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(
      (p) => p.price === null || p.price >= filters.minPrice!
    );
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(
      (p) => p.price === null || p.price <= filters.maxPrice!
    );
  }
  if (filters.minBedrooms !== undefined) {
    result = result.filter((p) => p.specs.bedrooms >= filters.minBedrooms!);
  }

  if (sort === "price-asc") {
    result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  } else if (sort === "price-desc") {
    result.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  }
  // "recent" mantiene el orden del JSON (el más nuevo primero por convención)

  return result;
}

export async function getNeighborhoods(): Promise<string[]> {
  const active = properties.filter((p) => p.status !== "vendida");
  return Array.from(new Set(active.map((p) => p.location.neighborhood)));
}

export interface Zone {
  name: string;
  slug: string;
  city: string;
}

/** Zonas (barrios) con propiedades activas, para las landing pages /propiedades/zona/[zona]. */
export async function getZones(): Promise<Zone[]> {
  const active = properties.filter((p) => p.status !== "vendida");
  const byNeighborhood = new Map<string, Zone>();

  for (const p of active) {
    const slug = slugify(p.location.neighborhood);
    if (!byNeighborhood.has(slug)) {
      byNeighborhood.set(slug, {
        name: p.location.neighborhood,
        slug,
        city: p.location.city,
      });
    }
  }

  return Array.from(byNeighborhood.values());
}

export async function getZoneBySlug(slug: string): Promise<Zone | undefined> {
  const zones = await getZones();
  return zones.find((z) => z.slug === slug);
}

export async function getPropertiesByZoneSlug(
  slug: string
): Promise<Property[]> {
  const active = properties.filter((p) => p.status !== "vendida");
  return active.filter((p) => slugify(p.location.neighborhood) === slug);
}

export function formatPrice(
  price: number | null,
  currency: string
): string {
  if (price === null) return "Consultar precio";
  return `${currency} ${price.toLocaleString("es-AR")}`;
}
