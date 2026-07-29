import Image from "next/image";
import Link from "next/link";
import { getFeaturedProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import SectionDivider from "@/components/SectionDivider";
import { WhatsAppInline } from "@/components/WhatsAppButton";

const VALUES = [
  {
    title: "Atención personalizada",
    text: "Cada cliente recibe un acompañamiento a medida, de principio a fin.",
  },
  {
    title: "Red de contactos",
    text: "Acceso a propiedades exclusivas antes de que lleguen al mercado.",
  },
  {
    title: "Proceso transparente",
    text: "Información clara en cada etapa, sin sorpresas ni letra chica.",
  },
  {
    title: "Resultados comprobados",
    text: "Años de trayectoria y operaciones exitosas en el segmento premium.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Sonia nos acompañó en todo el proceso con una profesionalidad excepcional. Encontramos la casa perfecta en tiempo récord.",
    author: "Familia Gómez",
  },
  {
    quote:
      "Su conocimiento del mercado premium de Rosario es inigualable. Recomendable sin dudarlo.",
    author: "M. Etchevarne",
  },
  {
    quote:
      "Vendimos nuestra propiedad al mejor precio posible gracias a su estrategia y su red de contactos.",
    author: "L. Bertolino",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProperties();

  return (
    <main>
      {/* Hero */}
      <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="Propiedad premium"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/50" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-cream">
          <div className="font-serif text-2xl tracking-[0.35em]">SEVEN</div>
          <div className="mb-6 text-xs tracking-[0.5em] text-gold">
            SONIA GARCIA
          </div>
          <h1 className="font-serif text-3xl leading-tight md:text-5xl">
            Propiedades excepcionales para clientes excepcionales
          </h1>

          <form
            action="/propiedades"
            className="mt-10 flex w-full max-w-2xl flex-col gap-2 bg-white/95 p-3 text-text shadow-lg md:flex-row"
          >
            <select
              name="type"
              className="flex-1 border border-navy/10 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="">Tipo</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
            <select
              name="neighborhood"
              className="flex-1 border border-navy/10 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="">Zona</option>
              <option value="Fisherton">Fisherton</option>
              <option value="Puerto Norte">Puerto Norte</option>
              <option value="Centro">Centro</option>
              <option value="Arroyito">Arroyito</option>
              <option value="Pichincha">Pichincha</option>
            </select>
            <select
              name="maxPrice"
              className="flex-1 border border-navy/10 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="">Precio máx.</option>
              <option value="150000">Hasta USD 150.000</option>
              <option value="300000">Hasta USD 300.000</option>
              <option value="600000">Hasta USD 600.000</option>
            </select>
            <button
              type="submit"
              className="bg-navy px-6 py-2 text-sm tracking-wide text-cream transition-colors hover:bg-gold"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-navy">
            Propiedades destacadas
          </h2>
          <SectionDivider />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/propiedades"
            className="border border-navy px-8 py-3 text-sm tracking-wide text-navy transition-colors hover:border-gold hover:text-gold"
          >
            VER TODAS LAS PROPIEDADES
          </Link>
        </div>
      </section>

      {/* Sobre Sonia */}
      <section className="bg-navy px-6 py-24 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
              alt="Sonia García"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl">Sobre Sonia</h2>
            <SectionDivider center={false} />
            <p className="mt-4 text-cream/80">
              Con más de una década de trayectoria en el mercado inmobiliario
              premium, Sonia García fundó Seven para ofrecer un servicio de
              real estate a la altura de sus clientes más exigentes: atención
              personalizada, discreción y resultados.
            </p>
            <div className="mt-8 flex gap-10">
              <div>
                <p className="font-serif text-3xl text-gold">10+</p>
                <p className="text-sm text-cream/70">Años de experiencia</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold">150+</p>
                <p className="text-sm text-cream/70">Propiedades vendidas</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold">98%</p>
                <p className="text-sm text-cream/70">Clientes satisfechos</p>
              </div>
            </div>
            <Link
              href="/sobre-mi"
              className="mt-8 inline-block border border-gold px-6 py-3 text-sm tracking-wide text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              CONOCER MÁS
            </Link>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-navy">
            Por qué elegir Seven by Sonia García
          </h2>
          <SectionDivider />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
                ✦
              </div>
              <h3 className="mt-4 font-serif text-lg text-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-text/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl text-navy">Testimonios</h2>
          <SectionDivider />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="bg-white p-6 shadow-sm">
                <p className="font-serif text-3xl text-gold">&ldquo;</p>
                <p className="text-sm italic text-text/80">{t.quote}</p>
                <p className="mt-4 text-xs tracking-wide text-navy">
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-navy-dark px-6 py-20 text-center text-cream">
        <h2 className="font-serif text-3xl">Hablemos de tu próxima propiedad</h2>
        <SectionDivider />
        <WhatsAppInline
          message="Hola Sonia, me gustaría hablar sobre mi próxima propiedad."
          className="mt-6 inline-block bg-gold px-8 py-3 text-sm tracking-wide text-navy transition-colors hover:bg-cream"
        >
          CONSULTAR POR WHATSAPP
        </WhatsAppInline>
      </section>
    </main>
  );
}
