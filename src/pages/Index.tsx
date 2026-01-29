import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import DirectionSection from "@/components/sections/DirectionSection";
import MentorshipSection from "@/components/sections/MentorshipSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import HeatmapsSection from "@/components/sections/HeatmapsSection";
import FoundersSection from "@/components/sections/FoundersSection";
import TeachersSection from "@/components/sections/TeachersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Logo placeholder between sections */}
      <div className="relative z-10 flex justify-center -mt-12 -mb-12">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border-4 border-secondary/30 flex items-center justify-center shadow-xl shadow-black/20">
          <span className="text-secondary font-bold text-xs md:text-sm text-center px-2">LOGO</span>
        </div>
      </div>
      
      <ProblemSection />
      <DirectionSection />
      <MentorshipSection />
      <HowItWorksSection />
      <HeatmapsSection />
      <FoundersSection />
      <TeachersSection />
    </div>
  );
};

export default Index;
