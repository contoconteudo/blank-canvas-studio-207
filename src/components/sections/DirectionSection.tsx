import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const DirectionSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 1;
      if (scrollContainer.firstElementChild) {
        const firstChild = scrollContainer.firstElementChild as HTMLElement;
        if (scrollPosition >= firstChild.offsetWidth / 2) {
          scrollPosition = 0;
        }
      }
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const directionText = "DIREÇÃO • ".repeat(20);

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Framed content */}
        <div className="relative card-gradient-depth card-gradient-depth-full card-gradient-depth-animated p-8 md:p-12 lg:p-16">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-secondary rounded-tl-lg -translate-x-0.5 -translate-y-0.5" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-secondary rounded-tr-lg translate-x-0.5 -translate-y-0.5" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-secondary rounded-bl-lg -translate-x-0.5 translate-y-0.5" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-secondary rounded-br-lg translate-x-0.5 translate-y-0.5" />

          <div className="text-center">
            {/* Main headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-10 leading-tight">
              Quem passa estuda com direção.
            </h2>

            {/* Story text */}
            <div className="space-y-6 text-lg md:text-xl text-white/90">
              <p>
                O <span className="font-semibold text-white">Residente de Elite</span> nasceu quando três médicos, aprovados entre os primeiros lugares, chegaram à mesma conclusão:
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-white">
                A aprovação não é sobre quantidade.{" "}
                <span className="text-secondary">É sobre estratégia, foco e timing.</span>
              </p>
              <p className="text-white/70 italic">
                Foi assim que passamos.
              </p>
              <p className="text-white font-semibold text-xl">
                E é isso que ensinamos.
              </p>

              <Button 
                size="lg"
                className="btn-glow mt-8 font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#1C233B', color: '#BE9964' }}
                onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quero aprender com quem passou
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite scroll bar */}
      <div className="mt-20 md:mt-32 bg-secondary py-4 overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          <span className="text-2xl md:text-3xl font-bold text-brand-navy tracking-widest">
            {directionText}
          </span>
          <span className="text-2xl md:text-3xl font-bold text-brand-navy tracking-widest">
            {directionText}
          </span>
        </div>
      </div>
    </section>
  );
};

export default DirectionSection;
