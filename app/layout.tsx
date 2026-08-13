import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { agentJsonLd, SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const interHeading = localFont({
  src: "./fonts/Inter-VariableFont.ttf",
  variable: "--font-inter-heading",
  weight: "100 900",
});

const DEFAULT_TITLE = `${SITE_NAME} | ${SITE_TAGLINE} — Real Estate de Alto Valor en Asunción`;
const DEFAULT_DESCRIPTION =
  "Sonia García, Directora de Seven Real Estate, selecciona propiedades e inversiones de ticket alto en Asunción y Central, Paraguay, y te acompaña con criterio financiero en cada operación.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_PY",
    type: "website",
    images: [{ url: "/images/sonia-garcia.jpg", width: 1200, height: 1500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/sonia-garcia.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} ${interHeading.variable} font-sans antialiased bg-cream text-text`}
      >
        <JsonLd data={agentJsonLd()} />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
