import Image from "next/image";
import { Button } from "./Button";
import { PhoneIcon } from "./Icons";
import { CONTACT } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,74,0.08),_transparent_50%)]" />

      <div className="section-container relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="animate-fade-up">
          <p className="section-label text-blue-400">Oklahoma City&apos;s Premium Cleaners</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Exclusive Cleaning Services for Your{" "}
            <span className="text-blue-400">Home &amp; Business</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            We transform your space with trained professionals, eco-friendly
            products, and a 100% satisfaction guarantee. Residential and
            commercial cleaning tailored to your needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book" size="lg">
              Instant Quote
            </Button>
            <Button
              href={CONTACT.phoneHref}
              variant="outline"
              size="lg"
              className="border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
            >
              <PhoneIcon />
              Call Now
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Serving OKC &amp; surrounding areas · Flexible scheduling · No hidden fees
          </p>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Professional cleaner wiping a bright, spotless kitchen counter"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
