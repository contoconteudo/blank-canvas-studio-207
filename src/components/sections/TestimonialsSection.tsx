import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "O Residente de Elite foi exatamente o que eu precisava na fase final da preparação: uma revisão completa e focada na prova da SES-PE, priorizando o que realmente cai. Pela primeira vez, compreendi conteúdos que sempre foram confusos e que eu apenas decorava, como as classificações de cirurgia. Os professores são incríveis, ensinam com muita didática e trazem dicas que ajudam a acertar as questões.\n\nMas o MAIOR diferencial foi o feedback individualizado pós-simulado - esse cuidado extra mostrou o compromisso de vocês com a nossa aprovação. Ter a oportunidade de discutir meus erros e evoluir foi fundamental para minha aprovação. Indico demais!",
    name: "Danielle Patrício",
    achievement: "Aprovada GO - 5° lugar Hospital Don Malan",
  },
  {
    text: "Mi, passando pra agradecer a você e a todos os mentores/profs do RDE! Vocês foram essenciais na reta final... O intensivão e simulados garantiram mts questões. Obrigada por todo o suporte e cuidado com a gente!!!!! Feliz demais! Quando tu era R1 no CISAM me ensinasse muito e contribuísse demais por eu estar aqui hoje. Espero ser para os meus ddos/acadêmicos quem você foi pra mim.",
    name: "Rafaella Lins",
    achievement: "Aprovada GO SES-PE 6° lugar CISAM/UPE",
  },
  {
    text: "Em meio ao caos do plantão consegui parar agora pra agradecer por tudo! O Residente de Elite foi um divisor de águas na minha preparação, e sou imensamente grata a todos vocês. Em especial a você, por me dar tanta força e direcionamento nessa reta final. Muito muito muito muito obrigada por tudo! Vocês são incríveis",
    name: "Letícia Queiroz",
    achievement: "Aprovada Pediatria SES-PE - 10° lugar geral - 2° lugar HUOC/UPE",
  },
  {
    text: "As professoras de GO, Mirella e Bárbara, foram essenciais na minha aprovação na prova de R+. Didáticas, objetivas e fizeram toda a diferença na minha preparação.",
    name: "Natasha Lins",
    achievement: "Aprovada GO R+ Medicina Fetal SES-PE 1° lugar geral",
  },
  {
    text: "Passando aqui com mais calma pra agradecer a você e a equipe do Residente de Elite! Ter vocês comigo nesse processo foi realmente decisivo. Você sabe que quando eu cheguei não tinha mais muito tempo, eu estava bem desanimada, dando cinco plantões por semana, não tinha direcionamento, não sabia pra onde correr. Ter vocês mostrando o caminho, essas aulas extremamente ricas, os simulados que me entregaram várias questões da prova, até as cobranças… Vocês foram a virada do jogo pra mim! Muito obrigada pelo trabalho INCRÍVEL que vocês fazem! Esse time eu indico de olhos fechados",
    name: "Melissa Carneiro",
    achievement: "Aprovada CG SES-PE 2° lugar HOF",
  },
  {
    text: "Eu nem sei explicar, mas saiba que eu sou muuuito grata por todo seu apoio, por ter aguentado todo meu estresse e por estar comigo nesse momento tão importante. Ter o teu apoio foi muito importante para mim. Tenho certeza que o RDE vai decolar!!! Vocês são tops demais e me ajudaram muito nesse período!!! Muito obrigada mesmo!!! Essa conquista é nossa!!!",
    name: "Natalia Bezerra",
    achievement: "Aprovada GO SES-PE",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Quem passou, aprova
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Veja o que nossos alunos aprovados dizem sobre a experiência no Residente de Elite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-b from-card to-card/80 border border-border/50 rounded-2xl p-6 flex flex-col hover:border-secondary/30 transition-colors duration-300"
            >
              <Quote className="w-8 h-8 text-secondary/40 mb-4 shrink-0" />

              <p className="text-foreground/90 text-sm leading-relaxed mb-6 flex-1">
                {t.text}
              </p>

              <div className="border-t border-border/40 pt-4 mt-auto">
                <p className="font-semibold text-secondary text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs mt-1">{t.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
