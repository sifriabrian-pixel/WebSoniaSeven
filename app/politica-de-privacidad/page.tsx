import type { Metadata } from "next";
import SectionDivider from "@/components/SectionDivider";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Política de Privacidad";
const DESCRIPTION =
  "Cómo Sonia García y Seven Real Estate recopilan, usan y protegen tus datos personales cuando usás este sitio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/politica-de-privacidad`,
    siteName: SITE_NAME,
    locale: "es_PY",
    type: "website",
  },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Quiénes somos",
    body: [
      "Este sitio es operado por Sonia García, Directora de Seven Real Estate, con domicilio en Fuerte Corpus Cristi 1505 casi Cerro Porteño, Asunción, Paraguay. Para cualquier consulta sobre tus datos podés escribirnos a sonitarg@hotmail.com.",
    ],
  },
  {
    title: "2. Qué datos recopilamos",
    body: [
      "Solo los datos que vos nos das al completar un formulario o escribirnos: nombre, número de WhatsApp, zona de interés y el mensaje que quieras dejarnos.",
      "Además, medimos de forma anónima el uso del sitio (páginas visitadas, tipo de dispositivo, país de origen) con herramientas de analítica web. Estos datos no te identifican personalmente.",
    ],
  },
  {
    title: "3. Para qué usamos tus datos",
    body: [
      "Para contactarte por WhatsApp y responder tu consulta, enviarte información de propiedades y oportunidades de inversión que se ajusten a lo que buscás, y mejorar el funcionamiento del sitio.",
      "No vendemos ni cedemos tus datos a terceros con fines comerciales.",
    ],
  },
  {
    title: "4. Con quién los compartimos",
    body: [
      "Solo con proveedores que nos ayudan a operar el sitio, bajo el compromiso de tratar los datos con confidencialidad: el servicio que recibe los formularios (Web3Forms), el proveedor de alojamiento web (Vercel), y WhatsApp (Meta) cuando nos escribís por ese canal.",
      "Si en el futuro usamos publicidad de Meta o Google, esas plataformas pueden recibir datos de uso del sitio según sus propias políticas.",
    ],
  },
  {
    title: "5. Cuánto tiempo los conservamos",
    body: [
      "Conservamos tus datos mientras sea necesario para atender tu consulta o mantener una relación comercial, y luego los eliminamos o anonimizamos.",
    ],
  },
  {
    title: "6. Tus derechos",
    body: [
      "Podés pedirnos en cualquier momento acceder a tus datos, corregirlos, o que los eliminemos y dejemos de contactarte. Escribinos a sonitarg@hotmail.com y lo resolvemos a la brevedad.",
    ],
  },
  {
    title: "7. Cookies y analítica",
    body: [
      "Este sitio utiliza herramientas de analítica para entender cuántas personas lo visitan y qué páginas les interesan. Podés bloquear o borrar las cookies desde la configuración de tu navegador sin que eso afecte el uso del sitio.",
    ],
  },
  {
    title: "8. Cambios en esta política",
    body: [
      "Podemos actualizar esta política para reflejar cambios en el sitio o en la normativa. La versión vigente siempre estará publicada en esta página.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-24 pt-32">
      <section className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs tracking-[0.4em] text-gold">LEGAL</span>
        <h1 className="mt-2 font-serif text-3xl text-navy">{TITLE}</h1>
        <SectionDivider />
      </section>

      <section className="mx-auto mt-10 max-w-3xl space-y-8 px-6 text-sm leading-relaxed text-text/80">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="mb-2 font-serif text-xl text-navy">{s.title}</h2>
            <div className="space-y-3">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-text/50">
          Última actualización: octubre de 2026.
        </p>
      </section>
    </main>
  );
}
