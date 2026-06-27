import { CONTACT, SITE_NAME, SITE_URL } from "./constants";
import { services } from "./content";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: {
      "@type": "City",
      name: "Oklahoma City",
    },
    description:
      "Premium residential and commercial cleaning services in Oklahoma City and surrounding areas.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}
