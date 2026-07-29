import type { Metadata } from "next";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import { WhatsAppInline } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conocé la trayectoria de Sonia García, especialista en real estate de lujo en Rosario.",
};

export default function AboutPage() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
            alt="Sonia García"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-xs tracking-[0.4em] text-gold">
            SOBRE MÍ
          </span>
          <h1 className="mt-2 font-serif text-3xl text-navy">
            Sonia García
          </h1>
          <SectionDivider center={false} />
          <p className="mt-4 leading-relaxed text-text/80">
            Fundé Seven con una convicción simple: comprar o vender una
            propiedad de alto valor merece un servicio a la altura. Después
            de más de diez años trabajando en el segmento premium del mercado
            inmobiliario de Rosario y la región, construí una red de
            contactos y un método de trabajo que hoy me permite acompañar a
            cada cliente de forma personalizada, discreta y transparente.
          </p>
          <p className="mt-4 leading-relaxed text-text/80">
            Mi especialización abarca casas y departamentos de categoría,
            terrenos en barrios cerrados y propiedades comerciales
            estratégicas. Creo firmemente que cada operación inmobiliaria es
            también una decisión de vida, y la trato con esa importancia.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="font-serif text-2xl text-navy">Trayectoria</h2>
        <SectionDivider center={false} />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">10+</p>
            <p className="mt-1 text-sm text-text/70">
              Años de experiencia en real estate de lujo
            </p>
          </div>
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">150+</p>
            <p className="mt-1 text-sm text-text/70">
              Propiedades vendidas y alquiladas
            </p>
          </div>
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">98%</p>
            <p className="mt-1 text-sm text-text/70">
              Clientes que recomiendan el servicio
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6 text-center">
        <h2 className="font-serif text-2xl text-navy">
          Trabajemos juntos en tu próxima operación
        </h2>
        <SectionDivider />
        <WhatsAppInline
          message="Hola Sonia, quiero conocer más sobre tus servicios."
          className="mt-4 inline-block bg-navy px-8 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-gold"
        >
          CONTACTAR POR WHATSAPP
        </WhatsAppInline>
      </section>
    </main>
  );
}
