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
      <Image
        src="/images/hero-afianza-recoleta.jpg"
        alt="Afianza Recoleta #8 — desarrollo en construcción en Asunción"
        fill
        priority
        className="animate-kenburns object-cover object-[center_30%]"
      />
      {/* Capa 1: overlay parejo en toda la sección, baja el brillo general de la foto */}
      <div className="absolute inset-0 z-[1] bg-[rgba(78,35,45,0.3)]" />
      {/* Capa 2: refuerzo detrás del texto (centro-izquierda), se desvanece hasta el nivel de la capa base, nunca hasta la foto cruda */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_900px_700px_at_30%_50%,rgba(30,8,14,0.75)_0%,rgba(30,8,14,0.45)_40%,rgba(30,8,14,0)_75%)] md:bg-[radial-gradient(ellipse_900px_700px_at_30%_50%,rgba(30,8,14,0.75)_0%,rgba(30,8,14,0.45)_40%,rgba(30,8,14,0)_75%)] max-md:bg-[linear-gradient(to_right,rgba(30,8,14,0.75)_0%,rgba(30,8,14,0.45)_45%,rgba(30,8,14,0)_85%)]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-cream">
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-3xl leading-tight md:text-5xl">
            Invertí en las oportunidades de mayor valor de Asunción
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-cream/80 md:text-base">
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
