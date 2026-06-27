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
    <article className="card group">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-slate-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}

export function ServiceGrid() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="section-label">Our Services</p>
          <h2 className="section-title mt-3">
            Cleaning services to fit your needs
          </h2>
          <p className="section-subtitle">
            Exclusive Cleaning offers multiple customizable services so you can
            find a plan that works best for you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
