import { howItWorksSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="section-label">How It Works</p>
          <h2 className="section-title mt-3">Three simple steps to a spotless space</h2>
        </div>

        <ol className="mt-12 grid gap-8 lg:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <li key={step.step} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 font-display text-lg font-semibold text-blue-400">
                {step.step}
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">{step.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
              <ul className="mt-4 space-y-2">
                {step.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
