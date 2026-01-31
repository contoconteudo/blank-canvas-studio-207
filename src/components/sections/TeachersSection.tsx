import { Button } from "@/components/ui/button";
import mirellaPhoto from "@/assets/teachers/mirella-laranjeira.png";
import barbaraPhoto from "@/assets/teachers/barbara-lucinda.png";
import millenaPhoto from "@/assets/teachers/millena-andrade.png";
import gabrielPhoto from "@/assets/teachers/gabriel-morais.png";
import pedroPhoto from "@/assets/teachers/pedro-brainer.png";

const teachers = [
  {
    name: "Mirella Laranjeira",
    role: "Prof. Ginecologia e Obstetrícia",
    photo: mirellaPhoto,
    achievements: [
      "Professora de Ginecologia UFPE",
      "1° Lugar geral Mastologia SES-PE",
      "1º Lugar ENARE GO - HC UFPE",
      "3º Lugar SES-PE GO - CISAM/UPE",
      "Professora GO UPE Garanhuns"
    ]
  },
  {
    name: "Bárbara Lucinda",
    role: "Prof. Ginecologia e Obstetrícia",
    photo: barbaraPhoto,
    achievements: [
      "1° Lugar geral SES-PE GO",
      "2º Lugar ENARE Medicina Fetal - HC UFPE",
      "3º Lugar SES-PE Medicina Fetal"
    ]
  },
  {
    name: "Millena Andrade",
    role: "Prof. Pediatria",
    photo: millenaPhoto,
    achievements: [
      "Médica formada pela Universidade de Pernambuco",
      "1º Lugar geral SES-PE em pediatria",
      "Residência em Pediatria no Instituto de Medicina Integral Professor Fernando Figueira (IMIP)"
    ]
  },
  {
    name: "Gabriel Morais",
    role: "Prof. Clínica Médica",
    photo: gabrielPhoto,
    achievements: [
      "8º lugar SES-PE Clínica Médica",
      "Médico Diarista Hospital Alfa",
      "Facilitador Centro de Simulação FPS"
    ]
  },
  {
    name: "Pedro Brainer",
    role: "Prof. Cirurgia Geral",
    photo: pedroPhoto,
    achievements: [
      "1º Lugar geral ENARE Cirurgia Geral",
      "1º Lugar geral SES-PE Cirurgia Geral",
      "Observership Cleveland Clinic, Toronto, UPMC"
    ]
  }
];

const TeacherCard = ({ teacher }: { teacher: typeof teachers[0] }) => {
  return (
    <div className="flex flex-col">
      {/* Photo */}
      <div 
        className="aspect-[3/4] rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#085D7D' }}
      >
        {teacher.photo ? (
          <img 
            src={teacher.photo} 
            alt={teacher.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white/40 text-sm">Foto</span>
        )}
      </div>
      
      {/* Info Card */}
      <div 
        className="rounded-xl p-4 flex-1"
        style={{ backgroundColor: '#1C233B' }}
      >
        <h3 
          className="text-lg font-bold mb-1"
          style={{ color: '#BE9964' }}
        >
          {teacher.name}
        </h3>
        <p className="text-white/70 text-sm mb-3">{teacher.role}</p>
        
        <ul className="space-y-2">
          {teacher.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2">
              <span 
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#BE9964' }}
              />
              <span className="text-white/80 text-sm leading-tight">
                {achievement}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TeachersSection = () => {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
            style={{ color: '#BE9964' }}
          >
            Resultados reais, mentores com
          </h2>
          <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
            aprovação nas <span style={{ color: '#085D7D' }}>provas mais difíceis</span>
          </p>

          {/* First row - 3 teachers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {teachers.slice(0, 3).map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} />
            ))}
          </div>

          {/* Second row - 2 teachers centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {teachers.slice(3, 5).map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              size="lg"
              className="font-semibold px-8 py-6 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#BE9964', color: '#1C233B' }}
            >
              Quero aprender com especialistas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
