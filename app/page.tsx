import Image from "next/image";
import Link from "next/link";
import { getFeaturedProperties, getZones } from "@/lib/data";
import { InvestorModeProvider } from "@/components/InvestorModeContext";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ValueProposition from "@/components/ValueProposition";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import ZoneIntelligence from "@/components/ZoneIntelligence";
import SectionDivider from "@/components/SectionDivider";
import ConversionForm from "@/components/ConversionForm";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { YEARS_OF_EXPERIENCE } from "@/lib/content";

export default async function HomePage() {
  const featured = await getFeaturedProperties();
  const zones = await getZones();

  return (
    <main>
      <InvestorModeProvider>
        <HeroSection />
        <TrustBar />
        <ValueProposition />
        <FeaturedPropertiesSection properties={featured} />
      </InvestorModeProvider>

      <ZoneIntelligence zones={zones} />

      {/* Sobre Sonia */}
      <section className="bg-navy px-6 py-24 text-cream">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/sonia-garcia.jpg"
              alt="Sonia García"
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl">
              Contadora antes que asesora inmobiliaria
            </h2>
            <SectionDivider center={false} dark />
            <p className="mt-4 text-cream/80">
              Contadora y Analista Financiera con{" "}
              {YEARS_OF_EXPERIENCE
                ? `+${YEARS_OF_EXPERIENCE} años de trayectoria`
                : "amplia trayectoria"}{" "}
              gerenciando negocios en distintos rubros. Esa formación es la
              diferencia real: no leo una propiedad por sus metros
              cuadrados, la leo por su retorno.
            </p>
            <p className="mt-4 text-cream/80">
              Dirijo <strong className="text-cream">Seven Real Estate</strong>{" "}
              en Las Mercedes, Asunción, asesorando en compra, venta e
              inversión en Asunción y Central — con foco en el segmento de
              ticket alto y el mismo criterio con el que analizaría
              cualquier otra inversión.
            </p>
            <p className="mt-6 text-sm text-cream/70">
              {YEARS_OF_EXPERIENCE && (
                <>+{YEARS_OF_EXPERIENCE} años de trayectoria · </>
              )}
              +50 propiedades gestionadas · Directora de Seven Real Estate ·
              Asunción, Paraguay
            </p>
            <Link
              href="/sobre-mi"
              className="mt-8 inline-block border border-cream px-6 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-cream hover:text-navy"
            >
              CONOCER MÁS
            </Link>
          </div>
        </Reveal>
      </section>

      <Testimonials />

      {/* Form de conversión mid-page */}
      <section className="bg-white px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-2xl text-navy">
            Recibí oportunidades antes de que lleguen al mercado
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text/60">
            Análisis de zona + propiedades que coinciden con tu objetivo,
            directo a tu WhatsApp.
          </p>
          <div className="mx-auto mt-6 max-w-md text-left">
            <ConversionForm />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
