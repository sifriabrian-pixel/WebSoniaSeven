import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import ConversionForm from "@/components/ConversionForm";
import Wordmark from "@/components/Wordmark";
import { SITE_NAME } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="bg-navy-dark px-6 py-14 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Wordmark size="sm" />
          <SectionDivider center={false} />
          <p className="max-w-xs text-sm text-cream/70">
            Real estate de alto valor en Asunción y Central, Paraguay.
            Selección curada para inversores y compradores exigentes.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm tracking-[0.2em] text-gold">
            NAVEGACIÓN
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/" className="hover:text-gold">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/propiedades" className="hover:text-gold">
                Propiedades
              </Link>
            </li>
            <li>
              <Link href="/sobre-mi" className="hover:text-gold">
                Sobre mí
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-gold">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm tracking-[0.2em] text-gold">
            CONTACTO
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              República de Siria esq. Ayala Velázquez, Las Mercedes,
              Asunción, Paraguay
            </li>
            <li>sonia.garcia@c21.com.py</li>
            <li>+595 971 561916</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm tracking-[0.2em] text-gold">
            OPORTUNIDADES
          </h4>
          <p className="mb-3 text-sm text-cream/70">
            Recibí oportunidades antes de que lleguen al mercado.
          </p>
          <ConversionForm variant="dark" compact />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-6 text-xs text-cream/50">
        © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
