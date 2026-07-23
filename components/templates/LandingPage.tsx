"use client";

import { FaqSection } from "@/components/organisms/FaqSection";
import { FluidBackground } from "@/components/organisms/FluidBackground";
import { Footer } from "@/components/organisms/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { LeadForm } from "@/components/organisms/LeadForm";
import { Navbar } from "@/components/organisms/Navbar";
import { ProblemSection } from "@/components/organisms/ProblemSection";
import { ProductsSection } from "@/components/organisms/ProductsSection";
import { RoiCalculator } from "@/components/organisms/RoiCalculator";
import { ScrollProgress } from "@/components/organisms/ScrollProgress";
import { SocialProof } from "@/components/organisms/SocialProof";
import { TechStack } from "@/components/organisms/TechStack";
import { WhatsAppFloat } from "@/components/organisms/WhatsAppFloat";

export function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <FluidBackground />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <ProblemSection />
        <ProductsSection />
        <RoiCalculator />
        <TechStack />
        <FaqSection />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
