import { Check } from "lucide-react";

const MentorshipSection = () => {
  const features = [
    "Direção clara desde o início",
    "Acompanhamento contínuo",
    "Estratégia personalizada",
    "Correção de rota ao longo do caminho",
  ];

  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Intro text */}
        <div className="text-center mb-16">
          <p className="text-lg md:text-xl text-black/80 mb-6 max-w-3xl mx-auto">
            Neste ano de 2026 o <span className="font-semibold text-black">Residente de Elite</span> não criou um cursinho, que você assiste aula e pronto. Montamos uma{" "}
            <span className="font-bold text-secondary">mentoria completa de preparação para residência médica.</span>
          </p>
          
          <p className="text-xl md:text-2xl font-semibold text-black mb-2">
            Aqui, você não recebe apenas conteúdo.
          </p>
          <p className="text-lg md:text-xl text-black/80">
            Você entra em um <span className="font-semibold text-black">processo estruturado de aprovação</span>, com:
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative bg-[#1C233B] border border-white/10 rounded-2xl p-6 md:p-8 text-center shadow-[0_8px_32px_rgba(28,35,59,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] h-full flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(28,35,59,0.5)] hover:scale-[1.02]">
                {/* Check icon */}
                <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                
                {/* Feature text */}
                <p className="text-white font-medium text-base md:text-lg leading-snug">
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing text */}
        <div className="text-center">
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto">
            Você deixa de estudar <span className="text-black/60">"tentando acertar"</span> e passa a estudar{" "}
            <span className="font-bold text-secondary">sabendo o que faz sentido.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
