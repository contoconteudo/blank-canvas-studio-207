import professoresGrupo from "@/assets/professores-grupo.png";

const ProblemSection = () => {
  return (
    <section className="relative pt-24 pb-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <img 
              src={professoresGrupo} 
              alt="Professores do Residente de Elite" 
              className="w-full h-auto"
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2 flex items-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Você já percebeu e entendeu que{" "}
              <span className="text-secondary">estudar muito não garante aprovação.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
