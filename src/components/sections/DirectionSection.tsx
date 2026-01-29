import { useEffect, useRef } from "react";

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
        <div className="relative border-2 border-secondary/50 rounded-2xl p-8 md:p-12 lg:p-16 bg-gradient-to-br from-brand-navy/5 to-secondary/10 backdrop-blur-lg shadow-[0_8px_40px_rgba(4,87,119,0.15),0_0_0_1px_rgba(187,152,104,0.2)]">
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
            <div className="space-y-6 text-lg md:text-xl text-black/80">
              <p>
                O <span className="font-semibold text-black">Residente de Elite</span> nasceu quando três médicos, aprovados entre os primeiros lugares, chegaram à mesma conclusão:
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-black">
                A aprovação não é sobre quantidade.{" "}
                <span className="text-secondary">É sobre estratégia, foco e timing.</span>
              </p>
              <p className="text-black/70 italic">
                Foi assim que passamos.
              </p>
              <p className="text-black font-semibold text-xl">
                E é isso que ensinamos.
              </p>
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
