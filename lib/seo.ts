export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-sonia-seven.vercel.app";

export const SITE_NAME = "Sonia García";
export const SITE_TAGLINE = "Seven Real Estate";

export const AGENT = {
  name: "Sonia García",
  jobTitle: "Asesora Inmobiliaria",
  telephone: "+595971561916",
  email: "sonitarg@hotmail.com",
  affiliation: "Seven Real Estate",
  address: {
    streetAddress: "República de Siria esq. Ayala Velázquez",
    addressLocality: "Las Mercedes, Asunción",
    addressRegion: "Central",
    addressCountry: "PY",
  },
  image: `${SITE_URL}/images/sonia-garcia.jpg`,
};

/** JSON-LD RealEstateAgent + LocalBusiness, usado en el layout global. */
export function agentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: AGENT.name,
    jobTitle: AGENT.jobTitle,
    image: AGENT.image,
    url: SITE_URL,
    telephone: AGENT.telephone,
    email: AGENT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: AGENT.address.streetAddress,
      addressLocality: AGENT.address.addressLocality,
      addressRegion: AGENT.address.addressRegion,
      addressCountry: AGENT.address.addressCountry,
    },
    worksFor: {
      "@type": "Organization",
      name: AGENT.affiliation,
    },
  };
}

interface PropertyForJsonLd {
  title: string;
  description: string;
  slug: string;
  price: number | null;
  currency: string;
  operation: "venta" | "alquiler";
  images: string[];
  location: { city: string; neighborhood: string; address: string };
}

/** JSON-LD RealEstateListing para una ficha de propiedad. */
export function propertyJsonLd(property: PropertyForJsonLd) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/propiedades/${property.slug}`,
    image: property.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: `${property.location.neighborhood}, ${property.location.city}`,
      addressCountry: "PY",
    },
    ...(property.price !== null && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: property.currency,
        availability: "https://schema.org/InStock",
        businessFunction:
          property.operation === "venta"
            ? "http://purl.org/goodrelations/v1#Sell"
            : "http://purl.org/goodrelations/v1#LeaseOut",
      },
    }),
    agent: {
      "@type": "RealEstateAgent",
      name: AGENT.name,
      telephone: AGENT.telephone,
      email: AGENT.email,
    },
  };
}
