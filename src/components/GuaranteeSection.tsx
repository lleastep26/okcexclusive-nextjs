import { guaranteeIcons } from "./Icons";
import { guarantees } from "@/lib/content";

export function GuaranteeSection() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">What Is Guaranteed?</p>
          <h2 className="section-title mt-3">
            The Exclusive standard, every visit
          </h2>
          <p className="section-subtitle mx-auto">
            Your happiness is our priority. Here&apos;s what you can count on
            when you choose Exclusive Cleaning Services.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((item, index) => {
            const Icon = guaranteeIcons[index];
            return (
              <article key={item.title} className="card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
