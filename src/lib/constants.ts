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
  facebook: "https://www.facebook.com/exclusivecleaningservicellc",
  instagram: "https://www.instagram.com/exclusive_cleaning_services/",
  google:
    "https://www.google.com/search?q=Exclusive+Cleaning+Services&stick=H4sIAAAAAAAA_-NgU1I1qLAwTzIyNDU0Nk1JSTJPNEyzMqgwTEs1T7E0TTNLNDdNNTCzXMQq7VqRnFNanFmWquCck5qYl5mXrhCcWlSWmZxaDABSdhPMRwAAAA&hl=en-GB&mat=Cd3WLTBF2RjNElcBmzl_pXa2WpHF-kbG4ISTGdlzXfO_28Kr3YQc7uMjdMJsdqkXdw_SzNUKt1281LnC7WD2FUJZTQZIi_NrdnpiZxc_zNBZT7hEHIIocGuNTYeJ60UeNCA&authuser=4",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/commercial", label: "Commercial" },
  { href: "/instant-quote", label: "Instant Quote" },
  { href: "/contact", label: "Contact" },
] as const;
