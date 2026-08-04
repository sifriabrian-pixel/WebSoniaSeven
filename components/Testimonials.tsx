import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl text-navy">Testimonios</h2>
        <SectionDivider />

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="w-[85vw] shrink-0 snap-center bg-white p-6 text-left shadow-sm md:w-auto"
            >
              <p className="font-serif text-3xl text-gold">&ldquo;</p>
              <p className="text-sm italic text-text/80">{t.quote}</p>
              {t.result && (
                <p className="mt-3 font-serif text-lg text-gold">
                  {t.result}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3">
                {t.avatar && (
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {t.sourceUrl ? (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wide text-navy underline hover:text-gold"
                  >
                    — {t.author}
                  </a>
                ) : (
                  <p className="text-xs tracking-wide text-navy">
                    — {t.author}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
