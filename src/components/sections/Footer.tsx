import logoRde from "@/assets/logo-rde.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1C233B' }}>
      {/* Main Footer Content */}
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo / Brand */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={logoRde} 
                  alt="Residente de Elite - Curso para Residência Médica" 
                  className="h-20 md:h-24 w-auto"
                />
              </div>
              <p className="text-white/80 text-lg md:text-xl italic">
                O que importa. Do jeito certo.
              </p>
            </div>

            {/* Divider */}
            <div 
              className="w-24 h-1 mx-auto mb-8 rounded-full"
              style={{ backgroundColor: '#BE9964' }}
            />

            {/* Closing Statement */}
            <p className="text-white text-xl md:text-2xl font-medium mb-10">
              Aqui, você não estuda mais sozinho.
            </p>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="py-6 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {currentYear} Residente de Elite. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="#" 
                className="text-white/50 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="text-white/50 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
