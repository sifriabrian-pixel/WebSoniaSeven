"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ sort }: { sort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <select
      value={sort}
      onChange={handleChange}
      className="border border-navy/20 bg-white px-3 py-2 text-sm"
    >
      <option value="recent">Más recientes</option>
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="price-desc">Precio: mayor a menor</option>
    </select>
  );
}
