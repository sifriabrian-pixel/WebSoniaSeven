import type { Metadata } from "next";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "./ContactForm";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Contacto";
const DESCRIPTION =
  "Contactá a Sonia García, asesora de CENTURY 21 Seven especializada en propiedades de alto valor, para consultas en Asunción y Central.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contacto` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/contacto`,
    siteName: SITE_NAME,
    locale: "es_PY",
    type: "website",
    images: [{ url: "/images/sonia-garcia.jpg", width: 1200, height: 1500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/sonia-garcia.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto max-w-6xl px-6 text-center">
        <span className="text-xs tracking-[0.4em] text-gold">CONTACTO</span>
        <h1 className="mt-2 font-serif text-3xl text-navy">
          Hablemos de tu próxima propiedad
        </h1>
        <SectionDivider />
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <ContactForm />

        <div>
          <h2 className="font-serif text-xl text-navy">Datos de contacto</h2>
          <SectionDivider center={false} />
          <ul className="space-y-3 text-sm text-text/80">
            <li>
              República de Siria esq. Ayala Velázquez, Las Mercedes,
              Asunción, Paraguay
            </li>
            <li>sonia.garcia@c21.com.py</li>
            <li>+595 971 561916</li>
            <li>Lunes a Viernes · 9:00 a 18:00 hs</li>
          </ul>

          <h2 className="mt-10 font-serif text-xl text-navy">
            Zona de cobertura
          </h2>
          <SectionDivider center={false} />
          <div className="mt-3 aspect-video w-full overflow-hidden">
            <iframe
              title="Zona de cobertura"
              width="100%"
              height="100%"
              loading="lazy"
              src="https://www.google.com/maps?q=Asunci%C3%B3n,Paraguay&z=11&output=embed"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
