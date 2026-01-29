import { Button } from "@/components/ui/button";

const FoundersSection = () => {
  return (
    <section 
      className="py-20 md:py-28"
      style={{ 
        background: 'linear-gradient(180deg, #1C233B 0%, #085D7D 100%)' 
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
            style={{ color: '#BE9964' }}
          >
            O Residente de Elite foi criado por médicos que:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-lg md:text-xl font-medium" style={{ color: '#1C233B' }}>
                Viveram a pressão da prova
              </p>
            </div>
            <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-lg md:text-xl font-medium" style={{ color: '#1C233B' }}>
                Entenderam os padrões das bancas
              </p>
            </div>
            <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-lg md:text-xl font-medium" style={{ color: '#1C233B' }}>
                Erraram, ajustaram e acertaram
              </p>
            </div>
            <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-lg md:text-xl font-medium" style={{ color: '#1C233B' }}>
                Passaram entre os primeiros lugares
              </p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/20">
            <p className="text-white text-xl md:text-2xl font-semibold mb-2">
              Não ensinamos teoria.
            </p>
            <p className="text-white text-xl md:text-2xl font-semibold mb-8">
              Ensinamos o caminho que percorremos.
            </p>
            
            <Button 
              size="lg"
              className="font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#BE9964', color: '#1C233B' }}
            >
              Conhecer os fundadores
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
