import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import professoresGrupo from "@/assets/professores-grupo.png";

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
              <img 
                src={professoresGrupo} 
                alt="Professores do Residente de Elite" 
                className="w-full h-full object-contain"
              />
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
