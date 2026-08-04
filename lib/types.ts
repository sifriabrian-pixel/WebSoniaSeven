export type OperationType = "venta" | "alquiler";
export type PropertyType = "casa" | "departamento" | "terreno" | "comercial";
export type PropertyStatus = "nueva" | "disponible" | "reservada" | "vendida";

export interface PropertyLocation {
  city: string;
  neighborhood: string;
  address: string;
}

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  coveredArea: number;
  garages: number;
  yearBuilt: number;
}

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export type DealType = "Reventa" | "Renta" | "Desarrollo en pozo";

export interface PropertyInvestment {
  /** Rentabilidad de alquiler estimada, % anual. `null` = todavía no confirmado. */
  rentalYieldPct: number | null;
  /** Plusvalía de la zona en los últimos 24 meses, %. `null` = todavía no confirmado. */
  zoneAppreciationPct: number | null;
  dealType: DealType;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  operation: OperationType;
  type: PropertyType;
  price: number;
  currency: string;
  location: PropertyLocation;
  specs: PropertySpecs;
  description: string;
  features: string[];
  images: string[];
  coordinates: PropertyCoordinates;
  featured: boolean;
  status: PropertyStatus;
  /** true si `price` es un valor "desde" (proyecto con varias tipologías), no el precio de una unidad específica. */
  priceFrom?: boolean;
  investment?: PropertyInvestment;
}

export interface PropertyFilters {
  type?: PropertyType;
  operation?: OperationType;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
}

export type SortOption = "price-asc" | "price-desc" | "recent";
