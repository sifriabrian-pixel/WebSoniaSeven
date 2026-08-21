import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import Wordmark from "@/components/Wordmark";
import { SITE_NAME } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="bg-navy-dark px-6 py-14 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Wordmark size="sm" />
          <SectionDivider center={false} dark />
          <p className="max-w-xs text-sm text-cream/70">
            Encontrá propiedades de alto valor en todo Paraguay, con
            especial foco en Asunción, Ciudad del Este y otras ciudades
            estratégicas.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm tracking-[0.2em] text-graybrand">
            NAVEGACIÓN
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/" className="hover:text-graybrand">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/propiedades" className="hover:text-graybrand">
                Propiedades
              </Link>
            </li>
            <li>
              <Link href="/sobre-mi" className="hover:text-graybrand">
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-graybrand">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm tracking-[0.2em] text-graybrand">
            CONTACTO
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              Fuerte Corpus Cristi 1505 casi Cerro Porteño, Asunción,
              Paraguay
            </li>
            <li>sonitarg@hotmail.com</li>
            <li>+595 971 561916</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-6 text-xs text-cream/50">
        © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
