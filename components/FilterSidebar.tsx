"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TYPES = [
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "terreno", label: "Terreno" },
  { value: "comercial", label: "Comercial" },
];

const OPERATIONS = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

export default function FilterSidebar({
  neighborhoods,
}: {
  neighborhoods: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [operation, setOperation] = useState(
    searchParams.get("operation") ?? ""
  );
  const [neighborhood, setNeighborhood] = useState(
    searchParams.get("neighborhood") ?? ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ?? "600000"
  );
  const [minBedrooms, setMinBedrooms] = useState(
    searchParams.get("minBedrooms") ?? ""
  );

  function applyFilters() {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (operation) params.set("operation", operation);
    if (neighborhood) params.set("neighborhood", neighborhood);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minBedrooms) params.set("minBedrooms", minBedrooms);
    router.push(`/propiedades?${params.toString()}`);
  }

  function resetFilters() {
    setType("");
    setOperation("");
    setNeighborhood("");
    setMaxPrice("600000");
    setMinBedrooms("");
    router.push("/propiedades");
  }

  return (
    <aside className="w-full shrink-0 bg-white p-6 md:w-72">
      <h3 className="font-serif text-lg text-navy">Filtros</h3>
      <div className="gold-line mt-2" style={{ marginLeft: 0 }} />

      <div className="mt-6 space-y-6">
        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/60">
            TIPO
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-navy/20 bg-cream px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/60">
            OPERACIÓN
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full border border-navy/20 bg-cream px-3 py-2 text-sm"
          >
            <option value="">Todas</option>
            {OPERATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/60">
            ZONA
          </label>
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full border border-navy/20 bg-cream px-3 py-2 text-sm"
          >
            <option value="">Todas</option>
            {neighborhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/60">
            PRECIO MÁXIMO: USD {Number(maxPrice).toLocaleString("es-AR")}
          </label>
          <input
            type="range"
            min={50000}
            max={600000}
            step={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-gold"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-wide text-text/60">
            DORMITORIOS MÍNIMOS
          </label>
          <select
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            className="w-full border border-navy/20 bg-cream px-3 py-2 text-sm"
          >
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={applyFilters}
            className="bg-navy px-4 py-2 text-sm text-cream transition-colors hover:bg-gold"
          >
            Aplicar filtros
          </button>
          <button
            onClick={resetFilters}
            className="border border-navy/20 px-4 py-2 text-sm text-navy transition-colors hover:border-gold hover:text-gold"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}
