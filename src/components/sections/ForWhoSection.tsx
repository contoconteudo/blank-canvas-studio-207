import { Button } from "@/components/ui/button";

const bulletPoints = [
  {
    text: "Já tentou estudar sozinho",
    imagePosition: "left" as const
  },
  {
    text: "Sente que estuda muito e evolui pouco",
    imagePosition: "right" as const
  },
  {
    text: "Quer método, não mais aulas",
    imagePosition: "left" as const
  },
  {
    text: "Precisa de acompanhamento e correção de rota",
    imagePosition: "right" as const
  },
  {
    text: "Quer passar com estratégia, não no improviso",
    imagePosition: "left" as const
  }
];

const BulletRow = ({ 
  text, 
  imagePosition 
}: { 
  text: string; 
  imagePosition: "left" | "right";
}) => {
  const imageBlock = (
    <div className="w-full md:w-1/2 card-feature-depth aspect-video flex items-center justify-center">
      <span className="text-white/40 text-sm">Imagem</span>
    </div>
  );

  const textBlock = (
    <div className="w-full md:w-1/2 flex items-center">
      <p 
        className="text-xl md:text-2xl font-medium"
        style={{ color: '#1C233B' }}
      >
        {text}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

const ForWhoSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
            style={{ color: '#BE9964' }}
          >
            Para quem é a mentoria RDE?
          </h2>
          <p 
            className="text-xl md:text-2xl text-center mb-16"
            style={{ color: '#1C233B' }}
          >
            O Residente de Elite é para você que:
          </p>

          {/* Alternating Rows */}
          <div className="space-y-12 md:space-y-16">
            {bulletPoints.map((item, index) => (
              <BulletRow 
                key={index} 
                text={item.text} 
                imagePosition={item.imagePosition} 
              />
            ))}
          </div>

          {/* Closing Statement */}
          <div className="mt-16 md:mt-20 text-center p-8 card-gradient-depth card-gradient-depth-full">
            <p 
              className="text-xl md:text-2xl font-medium"
              style={{ color: '#BE9964' }}
            >
              Se busca processo, método e direção,
            </p>
            <p className="text-xl md:text-2xl font-bold text-white mt-2 mb-6">
              você está no lugar certo.
            </p>
            
            <Button 
              size="lg"
              className="font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#BE9964', color: '#1C233B' }}
            >
              Quero fazer parte
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
