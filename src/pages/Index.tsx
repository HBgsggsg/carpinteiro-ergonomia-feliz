import { useState } from "react";
import Questionnaire, { type Answer } from "@/components/Questionnaire";
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardCheck,
  AlertTriangle,
  Vibrate,
  StretchHorizontal,
  BicepsFlexed,
  ArrowDown,
  Lightbulb,
  Volume2,
  Thermometer,
  Wind,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";
import carpenterWorkbench from "@/assets/carpenter-workbench.jpg";
import carpenterSanding from "@/assets/carpenter-sanding.jpg";
import carpenterKneeling from "@/assets/carpenter-kneeling.jpg";

type Screen = "home" | "quiz" | "results";

const risks = [
  {
    icon: ArrowDown,
    title: "Dores nas costas",
    description:
      "Posturas curvadas prolongadas ao trabalhar em bancadas ou no chão provocam lesões na coluna lombar.",
  },
  {
    icon: BicepsFlexed,
    title: "Lesões nos ombros e braços",
    description:
      "Movimentos repetitivos de serrar, martelar e lixar sobrecarregam as articulações dos membros superiores.",
  },
  {
    icon: StretchHorizontal,
    title: "Problemas nos joelhos",
    description:
      "Ajoelhar-se durante longos períodos para instalar pavimentos ou trabalhar em superfícies baixas.",
  },
  {
    icon: Vibrate,
    title: "Exposição a vibrações",
    description:
      "O uso contínuo de ferramentas elétricas como lixadeiras e rebarbadoras pode causar síndrome de vibração mão-braço.",
  },
  {
    icon: AlertTriangle,
    title: "Movimentos repetitivos",
    description:
      "Tarefas repetitivas ao longo do dia aumentam o risco de tendinites e lesões musculoesqueléticas crónicas.",
  },
];

const images = [
  { src: carpenterWorkbench, alt: "Carpinteiro a trabalhar numa bancada de madeira", caption: "Trabalho em bancada" },
  { src: carpenterSanding, alt: "Carpinteiro a usar lixadeira elétrica", caption: "Ferramentas com vibração" },
  { src: carpenterKneeling, alt: "Carpinteiro ajoelhado a instalar pavimento", caption: "Trabalho ao nível do chão" },
];

const workplaceFactors = [
  {
    id: "iluminacao",
    icon: Lightbulb,
    title: "Iluminação",
    question: "A luz do espaço de trabalho é suficiente para trabalhar com precisão?",
    tip: "Reforce a iluminação natural ou adicione focos LED direcionados na bancada.",
  },
  {
    id: "ruido",
    icon: Volume2,
    title: "Ruído",
    question: "A exposição a ferramentas barulhentas (serras, lixadeiras) é controlada?",
    tip: "Use protetores auriculares e faça pausas em ambientes silenciosos.",
  },
  {
    id: "temperatura",
    icon: Thermometer,
    title: "Temperatura e ventilação",
    question: "O espaço tem temperatura confortável e boa ventilação?",
    tip: "Garanta circulação de ar e evite trabalhar em extremos de calor ou frio.",
  },
  {
    id: "po",
    icon: Wind,
    title: "Pó e partículas",
    question: "A exposição a serradura e poeiras de madeira é minimizada?",
    tip: "Use máscara FFP2/FFP3 e instale aspiração localizada nas máquinas.",
  },
  {
    id: "espaco",
    icon: LayoutGrid,
    title: "Espaço de trabalho",
    question: "O espaço está organizado, sem obstáculos e com circulação segura?",
    tip: "Mantenha o chão livre, ferramentas arrumadas e zonas de passagem desimpedidas.",
  },
] as const;

type Rating = "bom" | "razoavel" | "mau";

const ratingOptions: { value: Rating; label: string; score: number; activeClasses: string; dot: string }[] = [
  { value: "bom", label: "Bom", score: 0, activeClasses: "bg-success/15 border-success text-success", dot: "bg-success" },
  { value: "razoavel", label: "Razoável", score: 1, activeClasses: "bg-warning/15 border-warning text-warning", dot: "bg-warning" },
  { value: "mau", label: "Mau", score: 2, activeClasses: "bg-destructive/15 border-destructive text-destructive", dot: "bg-destructive" },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ratings, setRatings] = useState<Record<string, Rating>>({});

  const ratedCount = Object.keys(ratings).length;
  const totalScore = Object.values(ratings).reduce((sum, r) => {
    return sum + (ratingOptions.find((o) => o.value === r)?.score ?? 0);
  }, 0);
  const maxScore = workplaceFactors.length * 2;
  const allRated = ratedCount === workplaceFactors.length;

  let overallLabel = "";
  let overallClasses = "";
  let overallTip = "";
  if (allRated) {
    const ratio = totalScore / maxScore;
    if (ratio <= 0.25) {
      overallLabel = "Risco Baixo";
      overallClasses = "bg-success/10 border-success/40 text-success";
      overallTip = "O posto de trabalho está em boas condições. Mantenha as boas práticas e faça revisões periódicas.";
    } else if (ratio <= 0.6) {
      overallLabel = "Risco Moderado";
      overallClasses = "bg-warning/10 border-warning/40 text-warning";
      overallTip = "Existem fatores a melhorar. Aplique as recomendações abaixo para reduzir riscos a curto prazo.";
    } else {
      overallLabel = "Risco Elevado";
      overallClasses = "bg-destructive/10 border-destructive/40 text-destructive";
      overallTip = "O posto apresenta riscos significativos. Atue com prioridade nos fatores avaliados como 'Mau'.";
    }
  }

  if (screen === "quiz") {
    return (
      <Questionnaire
        onComplete={(a) => {
          setAnswers(a);
          setScreen("results");
        }}
      />
    );
  }

  if (screen === "results") {
    return <Results answers={answers} onRestart={() => setScreen("home")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex items-center justify-center px-6 py-20 md:py-28 bg-primary/5">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Ergonomia do Carpinteiro
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A ergonomia estuda a adaptação do trabalho ao ser humano. Para os carpinteiros, aplicar
            boas práticas ergonómicas significa menos dores, menos lesões e uma carreira mais longa
            e saudável.
          </p>
          <Button
            size="lg"
            onClick={() => setScreen("quiz")}
            className="gap-2 text-base px-8 mt-2"
          >
            <ClipboardCheck className="w-5 h-5" />
            Iniciar Questionário
          </Button>
          <p className="text-xs text-muted-foreground">
            7 perguntas · Resultados imediatos · Sugestões personalizadas
          </p>
        </div>
      </section>

      {/* Images */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
          O dia a dia na carpintaria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt}
                width={800}
                height={512}
                loading={i === 0 ? undefined : "lazy"}
                className="w-full h-48 object-cover"
              />
              <figcaption className="text-sm text-muted-foreground text-center mt-2">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Risks */}
      <section className="px-6 py-16 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-10">
            Principais riscos ergonómicos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {risks.map((risk) => (
              <Card key={risk.title} className="border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <risk.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">{risk.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {risk.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Avalie as suas condições de trabalho
          </h2>
          <p className="text-muted-foreground">
            Responda a um breve questionário e receba sugestões personalizadas para melhorar a sua
            ergonomia no trabalho.
          </p>
          <Button
            size="lg"
            onClick={() => setScreen("quiz")}
            className="gap-2 text-base px-8"
          >
            <ClipboardCheck className="w-5 h-5" />
            Iniciar Questionário
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
