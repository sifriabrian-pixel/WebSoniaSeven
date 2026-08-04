import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/data";

const statusBadges: Partial<
  Record<Property["status"], { label: string; className: string }>
> = {
  nueva: { label: "Nueva", className: "bg-gold text-navy" },
  reservada: { label: "Reservada", className: "bg-gray-500 text-white" },
  vendida: { label: "Vendida", className: "bg-gray-800 text-white" },
};

export default function PropertyCard({ property }: { property: Property }) {
  const badge = statusBadges[property.status];
  const isSold = property.status === "vendida";

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group block overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 px-3 py-1 text-xs tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="font-serif text-lg text-navy">{property.title}</p>
        <p className="mt-1 text-sm text-text/60">
          {property.location.neighborhood}, {property.location.city}
        </p>

        <p
          className={`mt-3 font-serif text-xl ${isSold ? "text-text/40 line-through" : "text-gold"}`}
        >
          {property.priceFrom && (
            <span className="text-sm text-text/50">Desde </span>
          )}
          {formatPrice(property.price, property.currency)}
          {property.operation === "alquiler" && (
            <span className="text-sm text-text/50"> /mes</span>
          )}
        </p>

        {property.type !== "terreno" &&
          (property.specs.bedrooms > 0 ||
            property.specs.bathrooms > 0 ||
            property.specs.totalArea > 0) && (
            <div className="mt-3 flex gap-4 text-xs text-text/60">
              {property.specs.bedrooms > 0 && (
                <span>{property.specs.bedrooms} dorm.</span>
              )}
              {property.specs.bathrooms > 0 && (
                <span>{property.specs.bathrooms} baños</span>
              )}
              {property.specs.totalArea > 0 && (
                <span>{property.specs.totalArea} m²</span>
              )}
            </div>
          )}
      </div>
    </Link>
  );
}
