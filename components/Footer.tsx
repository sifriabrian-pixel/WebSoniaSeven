import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";

export default function Footer() {
  return (
    <footer className="bg-navy-dark px-6 py-14 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-xl tracking-[0.3em]">SEVEN</div>
          <div className="text-[10px] tracking-[0.4em] text-gold">
            SONIA GARCIA
          </div>
          <SectionDivider center={false} />
          <p className="max-w-xs text-sm text-cream/70">
            Real estate de lujo en Rosario y alrededores. Propiedades
            excepcionales para clientes excepcionales.
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
            <li>Rosario, Santa Fe, Argentina</li>
            <li>hola@sevensoniagarcia.com</li>
            <li>+54 9 341 000-0000</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-6 text-xs text-cream/50">
        © {new Date().getFullYear()} Seven by Sonia García. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
