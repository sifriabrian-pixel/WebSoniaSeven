"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  function next() {
    if (index === null) return;
    setIndex((index + 1) % images.length);
  }

  function prev() {
    if (index === null) return;
    setIndex((index - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2">
        <button
          onClick={() => setIndex(0)}
          className="relative aspect-[4/3] w-full overflow-hidden md:col-span-2 md:row-span-2"
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i + 1)}
            className="relative aspect-[4/3] w-full overflow-hidden"
          >
            <Image
              src={img}
              alt={`${alt} ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIndex(null)}
        >
          <button
            className="absolute right-6 top-6 text-3xl text-white"
            onClick={() => setIndex(null)}
            aria-label="Cerrar"
          >
            &times;
          </button>

          <button
            className="absolute left-4 text-4xl text-white md:left-8"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Anterior"
          >
            &#8249;
          </button>

          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-4 text-4xl text-white md:right-8"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Siguiente"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
