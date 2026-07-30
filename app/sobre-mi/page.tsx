import type { Metadata } from "next";
import Image from "next/image";
import SectionDivider from "@/components/SectionDivider";
import { WhatsAppInline } from "@/components/WhatsAppButton";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { YEARS_OF_EXPERIENCE } from "@/lib/content";

const TITLE = "Sobre mí";
const DESCRIPTION =
  "Conocé la trayectoria de Sonia García, asesora inmobiliaria de CENTURY 21 Seven en Asunción, Paraguay.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/sobre-mi` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/sobre-mi`,
    siteName: SITE_NAME,
    locale: "es_PY",
    type: "profile",
    images: [{ url: "/images/sonia-garcia.jpg", width: 1200, height: 1500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/sonia-garcia.jpg"],
  },
};

const VALUE_TAGS = [
  "Responsabilidad",
  "Honestidad",
  "Ética Profesional",
  "Análisis Financiero",
  "Inversiones",
];

export default function AboutPage() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/images/sonia-garcia.jpg"
            alt="Sonia García"
            fill
            className="object-cover object-top"
          />
        </div>
        <div>
          <span className="text-xs tracking-[0.4em] text-gold">
            SOBRE MÍ
          </span>
          <h1 className="mt-2 font-serif text-3xl text-navy">
            Sonia García
          </h1>
          <p className="mt-1 text-sm text-text/60">
            Asesora Inmobiliaria · CENTURY 21 Seven · Asunción, Paraguay
          </p>
          <SectionDivider center={false} />
          <p className="mt-4 leading-relaxed text-text/80">
            Soy Contadora y Analista Financiera con{" "}
            {YEARS_OF_EXPERIENCE
              ? `+${YEARS_OF_EXPERIENCE} años de trayectoria`
              : "amplia trayectoria"}{" "}
            gerenciando negocios en distintos rubros. Esa formación me da una
            ventaja única: entiendo el valor real de cada inversión
            inmobiliaria, no solo sus metros cuadrados.
          </p>
          <p className="mt-4 leading-relaxed text-text/80">
            Trabajo con CENTURY 21 Seven en Las Mercedes, Asunción, donde
            brindo asesoramiento en compra, venta e inversión de propiedades
            en Paraguay, con foco en Asunción y Central. Te acompaño con
            responsabilidad, honestidad y ética profesional en cada
            operación.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {VALUE_TAGS.map((tag) => (
              <span
                key={tag}
                className="border border-gold/40 bg-gold/10 px-4 py-2 text-xs tracking-wide text-navy"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="font-serif text-2xl text-navy">Trayectoria</h2>
        <SectionDivider center={false} />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {YEARS_OF_EXPERIENCE && (
            <div className="bg-white p-6">
              <p className="font-serif text-3xl text-gold">
                +{YEARS_OF_EXPERIENCE}
              </p>
              <p className="mt-1 text-sm text-text/70">Años de trayectoria</p>
            </div>
          )}
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">+50</p>
            <p className="mt-1 text-sm text-text/70">
              Propiedades gestionadas
            </p>
          </div>
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">C21</p>
            <p className="mt-1 text-sm text-text/70">Oficial Seven</p>
          </div>
          <div className="bg-white p-6">
            <p className="font-serif text-3xl text-gold">ASU</p>
            <p className="mt-1 text-sm text-text/70">
              Asunción y Central, Paraguay
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
