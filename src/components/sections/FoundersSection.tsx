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
          
          <ul className="space-y-3 mb-10">
            <li className="text-white/90 text-lg md:text-xl">viveram a pressão da prova</li>
            <li className="text-white/90 text-lg md:text-xl">entenderam os padrões das bancas</li>
            <li className="text-white/90 text-lg md:text-xl">erraram, ajustaram e acertaram</li>
            <li className="text-white/90 text-lg md:text-xl">passaram entre os primeiros lugares</li>
          </ul>
          
          <div className="pt-6 border-t border-white/20">
            <p className="text-white text-xl md:text-2xl font-semibold mb-2">
              Não ensinamos teoria.
            </p>
            <p className="text-white text-xl md:text-2xl font-semibold">
              Ensinamos o caminho que percorremos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
