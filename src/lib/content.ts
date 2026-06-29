export const services = [
  {
    id: "deep-clean",
    title: "Deep Clean",
    description:
      "Top-to-bottom detail for kitchens, bathrooms, baseboards, and every corner that needs extra attention.",
  },
  {
    id: "maintenance-clean",
    title: "Maintenance Clean",
    description:
      "Recurring service to keep your space consistently spotless without the stress of last-minute scrambling.",
  },
  {
    id: "post-construction",
    title: "Post Construction Clean",
    description:
      "Dust, debris, and fine particles removed so your newly finished space is move-in ready.",
  },
  {
    id: "one-time",
    title: "One Time Clean",
    description:
      "Flexible single visits for events, seasonal refreshes, or whenever you need a professional reset.",
  },
] as const;

export const guarantees = [
  {
    title: "100% Satisfaction Guarantee",
    description:
      "Not completely satisfied? Let us know within 24 hours and we'll return to make it right at no extra charge.",
  },
  {
    title: "Trained, Trusted Professionals",
    description:
      "Our team is fully trained, background-checked, and held to the highest standards of professionalism.",
  },
  {
    title: "Consistent, High-Quality Results",
    description:
      "Customized checklists and detailed attention ensure nothing gets overlooked — no missed corners.",
  },
  {
    title: "Transparent Pricing, No Hidden Fees",
    description:
      "The price we quote is the price you pay. No surprises, upselling, or last-minute add-ons.",
  },
  {
    title: "Eco-Friendly & Safe Products",
    description:
      "Non-toxic, environmentally conscious products that are tough on dirt but safe for families and pets.",
  },
  {
    title: "Respect for Your Space & Schedule",
    description:
      "We arrive on time, in uniform, and ready to work — respecting your privacy, property, and time.",
  },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "Book Your Clean",
    tagline: "Fast. Flexible. Your Way.",
    description:
      "Use our online form or give us a quick call. Choose your service, tell us about your space, and pick a time that works for you.",
    highlights: [
      "Flexible scheduling",
      "Friendly support team",
      "Recurring or one-time options",
    ],
  },
  {
    step: 2,
    title: "We Get To Work",
    tagline: "Our pros handle the dirty work so you don't have to.",
    description:
      "Our trained, background-checked professionals show up on time, in uniform, and ready to deliver top-to-bottom care.",
    highlights: [
      "Fully equipped & prepared",
      "Professional, respectful team",
      "Customized clean every time",
    ],
  },
  {
    step: 3,
    title: "Relax",
    tagline: "It's more than just clean — it's peace of mind.",
    description:
      "Enjoy your fresh, spotless space. If anything's not perfect, we'll come back and fix it. That's our guarantee.",
    highlights: [
      "Come home to a sparkling space",
      "100% Satisfaction Guaranteed",
      "Less stress. More time for you.",
    ],
  },
] as const;

export const aboutContent = {
  headline: "Why Settle for Clean When You Can Have Exclusive Clean?",
  paragraphs: [
    "At Exclusive Cleaning Services, we do more than just tidy up — we transform your space. Whether it's your home, office, or property in transition, we deliver a level of clean that you can see, feel, and breathe.",
    "Our trained professionals bring consistency, care, and attention to every detail — because we believe your space should reflect comfort, pride, and peace of mind.",
    "Based in Oklahoma City, we serve residential and commercial clients throughout the metro and surrounding areas. From one-time deep cleans to recurring maintenance, every job gets the same level of care and professionalism.",
  ],
  values: [
    {
      title: "Detail-Driven",
      description: "We follow customized checklists so the areas that matter most never get overlooked.",
    },
    {
      title: "Locally Trusted",
      description: "Proudly serving OKC and surrounding communities with reliable, on-time service.",
    },
    {
      title: "Built Around You",
      description: "Flexible scheduling, clear communication, and cleans tailored to your preferences.",
    },
  ],
} as const;

export const serviceOptions = services.map((s) => ({
  value: s.id,
  label: s.title,
}));
