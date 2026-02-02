import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import logoRde from "@/assets/logo-rde.png";

const HeroSection = () => {
  const learnings = [
    "O que, quando e como estudar (incidência real de prova)",
    "Como priorizar (o que realmente gera ponto)",
    "Como revisar sem recomeçar do zero",
    "Como corrigir erros antes que eles se repitam",
    "Como adaptar o estudo à sua rotina",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-[#050508]" />
      
      {/* Main SVG flowing curves - organic aurora-like waves */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute w-[200%] h-[200%] left-[-50%] top-[-30%]"
          viewBox="0 0 1200 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for flowing curves */}
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(196 100% 60%)" stopOpacity="0.35" />
              <stop offset="50%" stopColor="hsl(196 100% 55%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(196 100% 50%)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(196 100% 65%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(196 100% 55%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(196 100% 50%)" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="waveGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="hsl(196 100% 58%)" stopOpacity="0.4" />
              <stop offset="60%" stopColor="hsl(196 100% 52%)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(196 100% 50%)" stopOpacity="0" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="25" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="heavyBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
          
          {/* Primary flowing curve - center dominant */}
          <path
            d="M-100,300 
               C150,200 300,450 500,350 
               S700,150 900,280 
               S1100,450 1300,300"
            fill="none"
            stroke="url(#waveGradient3)"
            strokeWidth="180"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
          />
          
          {/* Secondary curve - upper flow */}
          <path
            d="M-50,180 
               C200,100 350,320 550,200 
               S800,80 1000,180 
               S1200,320 1400,200"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="140"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
          />
          
          {/* Tertiary curve - lower subtle flow */}
          <path
            d="M0,500 
               C250,400 400,600 600,480 
               S850,350 1050,460 
               S1250,580 1400,450"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="120"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
          />
          
          {/* Accent curve - adds depth */}
          <path
            d="M-200,380 
               C100,280 280,500 480,380 
               S720,220 920,340 
               S1150,500 1350,360"
            fill="none"
            stroke="url(#waveGradient1)"
            strokeWidth="100"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
            opacity="0.6"
          />
          
          {/* Soft upper accent */}
          <path
            d="M100,120 
               C300,50 500,200 700,100 
               S950,20 1150,100 
               S1350,200 1500,80"
            fill="none"
            stroke="url(#waveGradient2)"
            strokeWidth="90"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
            opacity="0.5"
          />
          
          {/* Lower ambient wave */}
          <path
            d="M-100,620 
               C150,520 350,700 550,580 
               S800,440 1000,560 
               S1200,700 1400,560"
            fill="none"
            stroke="url(#waveGradient3)"
            strokeWidth="100"
            strokeLinecap="round"
            filter="url(#heavyBlur)"
            opacity="0.4"
          />
        </svg>
      </div>
      
      {/* Ambient center glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, 
              hsl(196 100% 55% / 0.12) 0%, 
              transparent 70%
            )
          `,
        }}
      />
      
      {/* Subtle bottom vignette for depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: `
            linear-gradient(to top,
              hsl(226 36% 6% / 0.8) 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src={logoRde} 
              alt="Residente de Elite - Curso para Residência Médica" 
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>

          {/* Headline */}
          <div className="max-w-4xl mb-12">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Você não precisa estudar{" "}
              <span className="text-secondary">tudo</span>.{" "}
              <br className="hidden md:block" />
              Precisa estudar do{" "}
              <span className="text-secondary">jeito certo</span>.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
              Mentoria estratégica para residência médica, criada por quem passou entre os primeiros lugares e transformou aprovação em{" "}
              <span className="text-foreground font-medium">direção</span>,{" "}
              <span className="text-foreground font-medium">estratégia</span> e{" "}
              <span className="text-foreground font-medium">acompanhamento real</span>.
            </p>
          </div>

          {/* Video */}
          <div className="relative mb-12 w-full max-w-2xl">
            {/* Video frame glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary via-primary to-secondary opacity-50 blur-lg" />
            
            {/* Video container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/44G2R8EWAF4?modestbranding=1&controls=0&rel=0&showinfo=0&iv_load_policy=3" 
                title="CONHEÇA A MENTORIA RESIDENTE DE ELITE 2026" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </div>

          {/* Taglines */}
          <div className="mb-12 max-w-2xl">
            <p className="text-xl font-medium text-foreground md:text-2xl">
              Estude com <span className="text-secondary">método</span>, não no escuro.
            </p>
            <p className="mt-2 text-2xl font-bold text-secondary md:text-3xl">
              Seja um Residente de Elite.
            </p>
          </div>

          {/* Three Columns */}
          <div className="mb-12 grid w-full max-w-6xl gap-8 md:grid-cols-3">
            {/* Column 1 - Direção Cognitiva */}
            <motion.div 
              className="card-feature-depth p-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Direção Cognitiva</h3>
              <p className="text-muted-foreground leading-relaxed">
                A maioria das mentorias entrega planilhas soltas ou suportes vagos. O{" "}
                <span className="text-secondary font-medium">Residente de Elite</span> te entrega{" "}
                <span className="text-foreground font-medium">direção cognitiva</span>.
              </p>
            </motion.div>

            {/* Column 2 - O Que Você Aprende */}
            <motion.div 
              className="card-feature-depth p-8"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
                <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">O Que Você Aprende</h3>
              <ul className="space-y-2">
                {learnings.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Base Científica */}
            <motion.div 
              className="card-feature-depth p-8"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Base Científica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tudo isso baseado em:{" "}
                <span className="text-foreground font-medium">padrão real de banca</span>, dados de desempenho, acompanhamento humano e princípios sólidos da{" "}
                <span className="text-secondary font-medium">neurociência da aprendizagem</span>.
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="h-14 px-10 text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-secondary/20 transition-all hover:shadow-2xl hover:shadow-secondary/30"
          >
            Quero conhecer a mentoria
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
