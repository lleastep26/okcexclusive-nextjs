import { Button } from "./Button";
import { CONTACT } from "@/lib/constants";

type CTABannerProps = {
  title?: string;
  description?: string;
};

export function CTABanner({
  title = "Ready for an Exclusive Clean?",
  description = "Get a free quote today. Flexible scheduling, transparent pricing, and a team you can trust.",
}: CTABannerProps) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-10 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/instant-quote" size="lg">
                Book a Clean
              </Button>
              <Button
                href={CONTACT.phoneHref}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
              >
                Call {CONTACT.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
