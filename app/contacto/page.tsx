import type { Metadata } from "next";
import SectionDivider from "@/components/SectionDivider";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Sonia García para consultas sobre propiedades premium en venta y alquiler.",
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
            <li>Rosario, Santa Fe, Argentina</li>
            <li>hola@sevensoniagarcia.com</li>
            <li>+54 9 341 000-0000</li>
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
              src="https://www.google.com/maps?q=Rosario,Santa+Fe,Argentina&z=11&output=embed"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
