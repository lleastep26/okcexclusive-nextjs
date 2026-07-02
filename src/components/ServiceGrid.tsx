import Link from "next/link";
import { serviceIcons } from "./Icons";
import { services } from "@/lib/content";
import { buildBookUrl } from "@/lib/quote-selection";

const cardClass =
  "group flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ServiceCard({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: (typeof serviceIcons)[number];
}) {
  return (
    <Link href={href} className={cardClass}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
        <p className="mt-3 text-sm font-medium text-accent group-hover:underline">
          Get instant quote →
        </p>
      </div>
    </Link>
  );
}

export function ServiceGrid() {
  return (
    <section id="services" className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Our Services</p>
          <h2 className="section-title mt-3">Cleaning services to fit your needs</h2>
          <p className="section-subtitle mx-auto">
            Exclusive Cleaning offers customizable services so you can find the right fit for your home or business.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              href={buildBookUrl({ service: service.id })}
              title={service.title}
              description={service.description}
              icon={serviceIcons[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
