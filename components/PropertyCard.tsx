"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/data";

const MotionLink = motion(Link);

const statusBadges: Partial<
  Record<Property["status"], { label: string; className: string }>
> = {
  nueva: { label: "Nueva", className: "bg-navy text-cream" },
  reservada: { label: "Reservada", className: "bg-gray-500 text-white" },
  vendida: { label: "Vendida", className: "bg-gray-800 text-white" },
};

const cardVariants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(28,28,28,0.05)" },
  hover: { y: -4, boxShadow: "0 20px 25px -5px rgba(28,28,28,0.15)" },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

export default function PropertyCard({
  property,
  mode = "vivir",
}: {
  property: Property;
  mode?: "vivir" | "invertir";
}) {
  const badge = statusBadges[property.status];
  const isSold = property.status === "vendida";
  const investment = property.investment;

  return (
    <MotionLink
      href={`/propiedades/${property.slug}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className="block overflow-hidden bg-white"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        {badge && (
          <span
            className={`absolute left-3 top-3 z-10 px-3 py-1 text-xs tracking-wide ${badge.className}`}
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
          {property.priceFrom && property.price !== null && (
            <span className="text-sm text-text/50">Desde </span>
          )}
          {formatPrice(property.price, property.currency)}
          {property.price !== null && property.operation === "alquiler" && (
            <span className="text-sm text-text/50"> /mes</span>
          )}
        </p>

        {mode === "invertir" && investment ? (
          <div className="mt-3 space-y-1 text-xs text-text/70">
            {investment.rentalYieldPct !== null && (
              <p>
                ↳ Rentabilidad alquiler est.:{" "}
                <span className="text-navy">
                  {investment.rentalYieldPct}% anual
                </span>
              </p>
            )}
            {investment.zoneAppreciationPct !== null && (
              <p>
                ↳ Plusvalía zona (24m):{" "}
                <span className="text-navy">
                  +{investment.zoneAppreciationPct}%
                </span>
              </p>
            )}
            <p>
              ↳ Tipo: <span className="text-navy">{investment.dealType}</span>
            </p>
          </div>
        ) : (
          property.type !== "terreno" &&
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
          )
        )}
      </div>
    </MotionLink>
  );
}
