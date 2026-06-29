import { serviceIcons } from "./Icons";
import { services } from "@/lib/content";

function ServiceCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: (typeof serviceIcons)[number];
}) {
  return (
    <article className="group flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </article>
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
