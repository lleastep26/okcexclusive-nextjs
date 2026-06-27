export const SITE_NAME = "Exclusive Cleaning Services";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://okcexclusivecleaning.com";

export const CONTACT = {
  email: "exclusive@okcexclusivecleaning.com",
  phone: "(405) 543-8920",
  phoneHref: "tel:+14055438920",
  area: "Local to OKC & Surrounding Areas",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  google: "https://www.google.com/maps",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/instant-quote", label: "Instant Quote" },
  { href: "/contact", label: "Contact" },
] as const;
