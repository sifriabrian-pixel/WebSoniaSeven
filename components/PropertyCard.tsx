import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/data";

const statusLabels: Record<Property["status"], string> = {
  disponible: "Nueva",
  exclusiva: "Exclusiva",
  reservada: "Reservada",
};

export default function PropertyCard({ property }: { property: Property }) {
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
        <span className="absolute left-3 top-3 bg-navy px-3 py-1 text-xs tracking-wide text-cream">
          {statusLabels[property.status]}
        </span>
      </div>

      <div className="p-5">
        <p className="font-serif text-lg text-navy">{property.title}</p>
        <p className="mt-1 text-sm text-text/60">
          {property.location.neighborhood}, {property.location.city}
        </p>

        <p className="mt-3 font-serif text-xl text-gold">
          {formatPrice(property.price, property.currency)}
          {property.operation === "alquiler" && (
            <span className="text-sm text-text/50"> /mes</span>
          )}
        </p>

        {property.type !== "terreno" && (
          <div className="mt-3 flex gap-4 text-xs text-text/60">
            <span>{property.specs.bedrooms} dorm.</span>
            <span>{property.specs.bathrooms} baños</span>
            <span>{property.specs.totalArea} m²</span>
          </div>
        )}
      </div>
    </Link>
  );
}
