import propertiesData from "@/data/properties.json";
import type { Property, PropertyFilters, SortOption } from "@/lib/types";

/**
 * Capa de acceso a datos. Hoy lee del JSON estático; el día que se migre
 * a Supabase, solo hay que reescribir estas funciones (misma firma) para
 * que consulten la base en lugar del archivo.
 */

const properties = propertiesData as Property[];

export async function getAllProperties(): Promise<Property[]> {
  return properties;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return properties.filter((p) => p.featured);
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
        (p.type === property.type ||
          p.location.neighborhood === property.location.neighborhood)
    )
    .slice(0, limit);
}

export async function getFilteredProperties(
  filters: PropertyFilters,
  sort: SortOption = "recent"
): Promise<Property[]> {
  let result = [...properties];

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
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.minBedrooms !== undefined) {
    result = result.filter((p) => p.specs.bedrooms >= filters.minBedrooms!);
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }
  // "recent" mantiene el orden del JSON (el más nuevo primero por convención)

  return result;
}

export async function getNeighborhoods(): Promise<string[]> {
  return Array.from(new Set(properties.map((p) => p.location.neighborhood)));
}

export function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString("es-AR")}`;
}
