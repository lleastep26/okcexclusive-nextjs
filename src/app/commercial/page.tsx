import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { ServiceSelectionGrid } from "@/components/ServiceSelectionGrid";
import { commercialContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Commercial Cleaning",
  description:
    "Professional commercial cleaning for offices, retail, medical facilities, and more in Oklahoma City. Flexible scheduling, trained teams, and transparent pricing.",
};

export default function CommercialPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="section-label">Commercial Cleaning</p>
            <h1 className="section-title mt-3">{commercialContent.headline}</h1>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              {commercialContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Modern office space cleaned and ready for business"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">What We Clean</p>
            <h2 className="section-title mt-3">Commercial services we offer</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {commercialContent.services.map((service) => (
              <article key={service.title} className="card">
                <h3 className="font-display text-lg font-semibold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Book a Clean</p>
            <h2 className="section-title mt-3">Choose your commercial service</h2>
            <p className="section-subtitle mx-auto">
              Select the type of clean your business needs. You&apos;ll enter your
              square footage and contact info on the next step for an instant quote.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="card">
              <ServiceSelectionGrid propertyType="commercial" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Why Choose Us</p>
            <h2 className="section-title mt-3">Built for business</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {commercialContent.benefits.map((benefit) => (
              <article key={benefit.title} className="card text-center">
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to elevate your workspace?"
        description="Get a free commercial cleaning quote. We'll work with your schedule and deliver results your team and clients will notice."
        primaryHref="/book?property=commercial"
        primaryLabel="Instant Quote"
      />
    </>
  );
}
