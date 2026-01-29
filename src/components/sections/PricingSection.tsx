import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    badge: "MENTORIA + INTENSIVÃO",
    originalPrice: "5.947",
    installments: "394,64",
    cashPrice: "3.884",
    features: [
      "Mentoria completa",
      "Simulados autorais",
      "Materiais didáticos",
      "Heatmaps: mapas de incidência SES-PE",
      "Intensivão final SES-PE e ENAMED"
    ]
  },
  {
    badge: "MENTORIA",
    subtitle: "1 ANO",
    originalPrice: "4.847",
    installments: "372,28",
    cashPrice: "3.664",
    features: [
      "Mentoria completa",
      "Simulados autorais",
      "Materiais didáticos",
      "Heatmaps: mapas de incidência SES-PE"
    ]
  },
  {
    badge: "RECOMENDADO",
    subtitle: "2 ANOS",
    description: "Opção para quem quer se preparar desde o 5° ano",
    originalPrice: "8.694",
    installments: "650,28",
    cashPrice: "6.400",
    highlighted: true,
    features: [
      "Planejamento longo prazo",
      "Mentoria completa",
      "Simulados autorais",
      "Materiais didáticos",
      "Heatmaps: mapas de incidência SES-PE",
      "Intensivão final SES-PE e ENAMED"
    ]
  }
];

const PricingCard = ({ plan }: { plan: typeof plans[0] }) => {
  const isHighlighted = 'highlighted' in plan && plan.highlighted;
  
  return (
    <div 
      className={`bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col h-full ${isHighlighted ? 'animate-pulse-slow ring-4 ring-[#BE9964]' : ''}`}
      style={isHighlighted ? { 
        boxShadow: '0 0 30px rgba(190, 153, 100, 0.4)'
      } : undefined}
    >
      {/* Badge */}
      <div 
        className="text-center py-2 px-4 rounded-lg mb-4 font-bold text-sm md:text-base"
        style={{ backgroundColor: isHighlighted ? '#BE9964' : '#305CA9', color: 'white' }}
      >
        {plan.badge}
      </div>
      
      {/* Subtitle */}
      {plan.subtitle && (
        <p 
          className="text-center text-xl md:text-2xl font-bold mb-2"
          style={{ color: '#1C233B' }}
        >
          {plan.subtitle}
        </p>
      )}
      
      {/* Description */}
      {plan.description && (
        <p className="text-center text-sm text-gray-500 mb-4">
          {plan.description}
        </p>
      )}
      
      {/* Original Price */}
      <p className="text-center text-gray-400 line-through text-lg mb-2">
        De R$ {plan.originalPrice}
      </p>
      
      {/* Installments */}
      <div className="text-center mb-2">
        <span className="text-3xl md:text-4xl font-bold" style={{ color: '#1C233B' }}>
          12x de R$ {plan.installments}
        </span>
      </div>
      
      {/* Cash Price */}
      <p className="text-center text-gray-600 mb-6">
        ou <span className="font-bold" style={{ color: '#305CA9' }}>R$ {plan.cashPrice}</span> à vista
      </p>
      
      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: '#305CA9' }}
            >
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-700 text-sm md:text-base">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* CTA Button */}
      <Button 
        size="lg"
        className="w-full font-semibold py-6 text-base md:text-lg rounded-xl transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: '#305CA9', color: 'white' }}
      >
        Quero garantir minha vaga
      </Button>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#1C233B' }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Text */}
          <div className="text-center mb-16">
            <p className="text-white text-xl md:text-2xl mb-4">
              Você pode continuar estudando sozinho
            </p>
            <p 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: '#BE9964' }}
            >
              ou pode estudar com método, acompanhamento e direção.
            </p>
            <p className="text-white/80 text-lg md:text-xl">
              A escolha de agora pode definir o seu resultado.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
