import { CTABanner } from "@/components/CTABanner";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ServiceGrid } from "@/components/ServiceGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <GuaranteeSection />
      <HowItWorks />
      <CTABanner />
    </>
  );
}
