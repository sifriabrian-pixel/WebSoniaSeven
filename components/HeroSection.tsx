import Image from "next/image";
import Link from "next/link";

/**
 * El toggle Vivir/Invertir se sacó del hero en una iteración anterior
 * (posicionamiento 100% inversor). Si se reactiva, acá es donde iría el
 * crossfade de imagen de fondo por estado (skyline/desarrollo vs. lifestyle)
 * con AnimatePresence mode="wait" de framer-motion.
 */
export default function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      {/* TODO: reemplazar por foto real de desarrollo o skyline Asunción */}
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        alt="Obra en construcción — desarrollo inmobiliario"
        fill
        priority
        className="animate-kenburns object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_75%,rgba(78,35,45,0.88),rgba(78,35,45,0.55)_45%,rgba(78,35,45,0.15)_80%)]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-cream">
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-3xl leading-tight md:text-5xl">
            Invertí en las oportunidades de mayor valor de Asunción
          </h1>
          <p className="mt-4 max-w-xl text-sm text-cream/80 md:text-base">
            Selección curada de propiedades con potencial de retorno en
            Asunción y Central.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up">
          <Link
            href="/propiedades"
            className="inline-block bg-cream px-8 py-3 text-sm tracking-wide text-navy transition-colors hover:bg-white"
          >
            VER OPORTUNIDADES DE INVERSIÓN
          </Link>
          <Link
            href="/propiedades"
            className="text-xs text-cream/70 underline underline-offset-2 hover:text-cream"
          >
            ¿Buscás dónde vivir? Ver propiedades →
          </Link>
        </div>
      </div>
    </section>
  );
}
