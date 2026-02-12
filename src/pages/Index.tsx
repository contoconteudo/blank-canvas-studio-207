import { lazy, Suspense } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import logoRde from "@/assets/logo-rde.webp";

const ProblemSection = lazy(() => import("@/components/sections/ProblemSection"));
const CandidatesSection = lazy(() => import("@/components/sections/CandidatesSection"));
const DirectionSection = lazy(() => import("@/components/sections/DirectionSection"));
const MentorshipSection = lazy(() => import("@/components/sections/MentorshipSection"));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const HeatmapsSection = lazy(() => import("@/components/sections/HeatmapsSection"));
const FoundersSection = lazy(() => import("@/components/sections/FoundersSection"));
const TeachersSection = lazy(() => import("@/components/sections/TeachersSection"));
const ForWhoSection = lazy(() => import("@/components/sections/ForWhoSection"));
const PricingSection = lazy(() => import("@/components/sections/PricingSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Logo between Hero and Problem sections - positioned to overlap */}
      <div className="relative z-10 flex justify-center -mt-16 -mb-16 pointer-events-none">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-secondary/30 flex items-center justify-center shadow-xl shadow-black/20 p-4 pointer-events-auto">
          <img 
            src={logoRde} 
            alt="Residente de Elite" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <Suspense fallback={null}>
        <AnimatedSection>
          <ProblemSection />
        </AnimatedSection>
        
        <AnimatedSection delay={0.1}>
          <CandidatesSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <DirectionSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <MentorshipSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <HowItWorksSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <HeatmapsSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <FoundersSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <TeachersSection />
        </AnimatedSection>
        
        {/* Logo between Teachers and ForWho sections - positioned to overlap */}
        <div className="relative z-10 flex justify-center -mt-16 -mb-16 pointer-events-none">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-secondary/30 flex items-center justify-center shadow-xl shadow-black/20 p-4 pointer-events-auto">
            <img 
              src={logoRde} 
              alt="Residente de Elite" 
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        
        <AnimatedSection>
          <ForWhoSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <PricingSection />
        </AnimatedSection>
        
        <AnimatedSection>
          <ContactSection />
        </AnimatedSection>
        
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
