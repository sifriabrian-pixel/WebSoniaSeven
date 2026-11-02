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
import { YEARS_OF_EXPERIENCE, TRUST_BAR } from "@/lib/content";

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

      {/* Sobre Seven Real Estate */}
      <section className="bg-navy px-6 py-24 text-cream">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/sonia-garcia.jpg"
              alt="Sonia García, Directora de Seven Real Estate"
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl">
              Una mirada financiera antes que inmobiliaria
            </h2>
            <SectionDivider center={false} dark />
            <p className="mt-4 text-cream/80">
              <strong className="text-cream">Seven Real Estate</strong> está
              dirigida por Sonia García, Contadora y Analista Financiera con{" "}
              {YEARS_OF_EXPERIENCE
                ? `+${YEARS_OF_EXPERIENCE} años de trayectoria`
                : "amplia trayectoria"}{" "}
              gerenciando negocios en distintos rubros. Esa formación marca
              cómo trabajamos: no leemos una propiedad por sus metros
              cuadrados, la leemos por su retorno.
            </p>
            <p className="mt-4 text-cream/80">
              Somos una oficina con más de {TRUST_BAR.realEstateYears} años
              en el rubro inmobiliario, fuimos parte de franquicias
              internacionales y estuvimos siempre entre los primeros
              lugares del ranking. Asesoramos en compra, venta e inversión
              de propiedades de alto valor en Asunción, Gran Asunción y
              Ciudad del Este.
            </p>
            <p className="mt-4 text-cream/80">
              Nuestra especialidad es el inversionista extranjero:
              acompañamiento integral, desde la primera evaluación de
              mercado hasta la radicación definitiva en Paraguay.
            </p>
            <p className="mt-4 text-cream/80">
              Cada operación la manejamos con la misma responsabilidad y
              rigor con que analizaríamos cualquier inversión propia.
            </p>
            <p className="mt-6 text-sm text-cream/70">
              +{TRUST_BAR.realEstateYears} años en el rubro inmobiliario ·
              +{TRUST_BAR.propertiesManaged.toLocaleString("es-PY")}{" "}
              propiedades gestionadas · +USD{" "}
              {TRUST_BAR.dollarsSoldMillions} millones vendidos · Sonia
              García, Directora de Seven Real Estate · Asunción, Paraguay
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
          <h2 className="font-heading text-2xl text-navy">
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
