import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a Mentoria Residente de Elite.");
    window.open(`https://wa.me/5581999999999?text=${message}`, "_blank");
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: '#1C233B' }}
          >
            Ainda tem dúvidas?
          </h2>
          <p 
            className="text-xl md:text-2xl mb-12"
            style={{ color: '#085D7D' }}
          >
            Entre em contato com os nossos especialistas em aprovação.
          </p>

          {/* WhatsApp Card */}
          <div className="max-w-sm mx-auto">
            <div 
              className="card-gradient-depth card-gradient-depth-full p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={handleWhatsAppClick}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-white/70 text-sm mb-4">Resposta rápida</p>
              <Button 
                className="w-full font-semibold"
                style={{ backgroundColor: '#25D366', color: 'white' }}
              >
                Falar agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
