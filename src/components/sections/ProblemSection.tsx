import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    "estuda horas por dia",
    "assiste aulas sem saber o que priorizar",
    "resolve questões sem entender o padrão da banca",
    "revisa de forma improvisada",
    "muda a estratégia no meio do caminho",
  ];

  return (
    <section className="relative py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image Placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="card-gradient-depth card-gradient-depth-full aspect-[4/5] flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 text-white/50" 
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
                <p className="text-white/60 text-sm">Imagem do mentor</p>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Você já percebeu e entendeu que{" "}
              <span className="text-secondary">estudar muito não garante aprovação.</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              A maioria dos candidatos:
            </p>

            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <X className="w-5 h-5 text-destructive/80" strokeWidth={2} />
                  </div>
                  <span className="text-foreground/90 text-lg">{problem}</span>
                </li>
              ))}
            </ul>

            <p className="text-xl text-foreground font-medium pt-4">
              E termina o ano cansado, frustrado e sem saber exatamente onde errou.
            </p>

            <div className="pt-2 space-y-2">
              <p className="text-muted-foreground">Isso não é falta de esforço.</p>
              <p className="text-2xl font-semibold text-secondary">
                É falta de método + acompanhamento.
              </p>
            </div>

            <Button 
              size="lg" 
              className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-xl"
            >
              Quero mudar meu jeito de estudar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
