import { Button } from "@/components/ui/button";
import aulasObjetivasImg from "@/assets/aulas-objetivas-complementares.png";
import diagnosticoInicialImg from "@/assets/diagnostico-inicial.png";
import intensivaoFinalImg from "@/assets/intensivao-final.png";
import materialDidaticoImg from "@/assets/material-didatico.png";

const mentorshipSteps = [
  {
    id: 1,
    title: "Diagnóstico inicial",
    description: "Analisamos seu ponto de partida, histórico, rotina e objetivo.",
    image: diagnosticoInicialImg,
  },
  {
    id: 2,
    title: "Planejamento estratégico individual",
    description: "Você recebe um mapa de estudo realista, focado no que importa para a sua prova.",
  },
  {
    id: 3,
    title: "Mentoria com acompanhamento contínuo",
    description: "Você não fica sozinho. Seu desempenho é acompanhado, analisado e ajustado a todo momento.",
  },
  {
    id: 4,
    title: "Simulados autorais + assessoria diagnóstica",
    description: "Você não apenas faz simulados. Você entende:",
    bullets: [
      "onde erra",
      "por que erra",
      "como corrigir"
    ],
    additionalText: "Aqui nossos professores avaliam: seu desempenho, o tipo de erro que está cometendo e a relevância do erro em cada tema e analisam a sua evolução."
  },
  {
    id: 5,
    title: "Aulas objetivas complementares",
    description: "Foco no que cai. Linguagem de prova e atalhos cognitivos. Sem teoria infinita.",
    image: aulasObjetivasImg,
  },
  {
    id: 6,
    title: "Material didático enxuto",
    description: "Mapas mentais e ebooks direcionados. Conteúdo filtrado por incidência.",
    image: materialDidaticoImg,
  },
  {
    id: 7,
    title: "Revisão inteligente e direcionada",
    description: "Repetição espaçada + recuperação ativa no momento certo.",
  },
  {
    id: 8,
    title: "Intensivão final ENAMED e SES-PE",
    description: "Revisões altamente direcionadas na reta final. Aqui nossos professores são reconhecidos pela alta didática!",
    image: intensivaoFinalImg,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#1C233B' }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-secondary mb-16 md:mb-24">
          Como funciona a mentoria?
        </h2>

        {/* Cards Container */}
        <div className="space-y-8 md:space-y-12">
          {mentorshipSteps.map((step, index) => {
            const isOdd = step.id % 2 !== 0;
            
            return (
              <div
                key={step.id}
                className="card-gradient-depth card-gradient-depth-animated"
              >
                <div className={`flex flex-col ${isOdd ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Text Content */}
                  <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#BE9964' }}>
                      {step.title}
                    </h3>
                    
                    <div className="text-white/90 text-base md:text-lg leading-relaxed">
                      <p>{step.description}</p>
                      
                      {step.bullets && (
                        <ul className="mt-3 space-y-1">
                          {step.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {step.additionalText && (
                        <p className="mt-4">{step.additionalText}</p>
                      )}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1 min-h-[200px] md:min-h-[280px] relative">
                    {step.image ? (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: '#045777' }}
                      >
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: '#045777' }}
                      >
                        <div className="text-center text-white/60">
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
                            <svg 
                              className="w-8 h-8 md:w-10 md:h-10 text-white/40" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                              />
                            </svg>
                          </div>
                          <span className="text-sm">Imagem {step.id}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#BE9964', color: '#1C233B' }}
          >
            Quero começar minha preparação
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
