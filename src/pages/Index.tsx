import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import CandidatesSection from "@/components/sections/CandidatesSection";
import DirectionSection from "@/components/sections/DirectionSection";
import MentorshipSection from "@/components/sections/MentorshipSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import HeatmapsSection from "@/components/sections/HeatmapsSection";
import FoundersSection from "@/components/sections/FoundersSection";
import TeachersSection from "@/components/sections/TeachersSection";
import ForWhoSection from "@/components/sections/ForWhoSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import logoRde from "@/assets/logo-rde.png";

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
    </div>
  );
};

export default Index;
