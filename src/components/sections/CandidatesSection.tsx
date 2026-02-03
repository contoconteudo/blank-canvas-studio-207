import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CandidatesSection = () => {
  const problems = [
    "estuda horas por dia",
    "assiste aulas sem saber o que priorizar",
    "resolve questões sem entender o padrão da banca",
    "revisa de forma improvisada",
    "muda a estratégia no meio do caminho",
  ];

  return (
    <section 
      className="relative pt-12 pb-20 md:pb-28 px-4"
      style={{ backgroundColor: '#1C233B' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
          A maioria dos candidatos:
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="rounded-xl p-5 flex items-center gap-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <X 
                className="w-5 h-5 flex-shrink-0" 
                style={{ color: '#ef4444' }}
                strokeWidth={2.5} 
              />
              <span className="text-white/90 text-left">{problem}</span>
            </div>
          ))}
        </div>

        {/* Conclusion Text */}
        <p className="text-xl md:text-2xl text-white font-medium mb-8">
          E termina o ano cansado, frustrado e sem saber exatamente onde errou.
        </p>

        <div className="space-y-3 mb-10">
          <p className="text-white/70 text-lg">Isso não é falta de esforço.</p>
          <p 
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: '#BE9964' }}
          >
            É falta de método + acompanhamento.
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          size="lg"
          className="btn-glow font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#BE9964', color: '#1C233B' }}
        >
          Quero mudar meu jeito de estudar
        </Button>
      </div>
    </section>
  );
};

export default CandidatesSection;
