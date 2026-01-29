import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(226,36%,17%)] via-[hsl(206,58%,20%)] to-[hsl(226,36%,12%)]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(35, 41%, 57%) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[hsl(196,93%,24%)] opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[hsl(35,41%,57%)] opacity-10 blur-3xl" />

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
            <div className="card-feature-depth p-8">
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
            </div>

            {/* Column 2 - O Que Você Aprende */}
            <div className="card-feature-depth p-8">
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
            </div>

            {/* Column 3 - Base Científica */}
            <div className="card-feature-depth p-8">
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
            </div>
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
