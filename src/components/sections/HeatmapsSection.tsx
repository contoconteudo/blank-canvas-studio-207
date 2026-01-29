import { Button } from "@/components/ui/button";

const HeatmapsSection = () => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#1C233B' }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
            style={{ color: '#BE9964' }}
          >
            Heatmaps SES-PE
          </h2>

          {/* Content Grid */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Image Placeholder */}
            <div className="w-full md:w-1/2">
              <div 
                className="aspect-video rounded-2xl flex items-center justify-center border"
                style={{ 
                  backgroundColor: '#085D7D',
                  borderColor: 'rgba(190, 153, 100, 0.3)'
                }}
              >
                <span className="text-white/60 text-lg">Imagem do Heatmap</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">
                Os Heatmaps são os nossos "mapas da aprovação". Neles você encontra análise de incidência dos últimos anos de prova e comentários dos nossos Professores primeiro lugares. Aqui você entende o que precisa dedicar mais tempo! Não se engane, você não precisa saber de tudo!
              </p>

              <Button 
                size="lg"
                className="text-white font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#BE9964',
                }}
              >
                Quero entender qual o melhor formato para mim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeatmapsSection;
