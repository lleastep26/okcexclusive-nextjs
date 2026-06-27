import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { aboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Exclusive Cleaning Services — Oklahoma City's trusted team for residential and commercial cleaning with attention to every detail.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="section-label">About Us</p>
            <h1 className="section-title mt-3">{aboutContent.headline}</h1>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80"
              alt="Professional cleaning team member with supplies in a bright home"
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
            <p className="section-label">Our Values</p>
            <h2 className="section-title mt-3">What drives every clean</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {aboutContent.values.map((value) => (
              <article key={value.title} className="card text-center">
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Experience the Exclusive difference"
        description="Whether it's a one-time deep clean or recurring maintenance, we're ready to deliver results you'll notice."
      />
    </>
  );
}
