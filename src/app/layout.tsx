import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { localBusinessJsonLd } from "@/lib/schema";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Book Your Cleaning Now`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium residential and commercial cleaning in Oklahoma City. Trained professionals, eco-friendly products, transparent pricing, and a 100% satisfaction guarantee.",
  keywords: [
    "cleaning services OKC",
    "house cleaning Oklahoma City",
    "commercial cleaning OKC",
    "deep clean",
    "move out cleaning",
  ],
  openGraph: {
    title: `${SITE_NAME} | Book Your Cleaning Now`,
    description:
      "Premium residential and commercial cleaning in Oklahoma City. Get a quote today.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — professional cleaning in Oklahoma City`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Book Your Cleaning Now`,
    description:
      "Premium residential and commercial cleaning in Oklahoma City.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
