import { useState } from "react";
import Questionnaire, { type Answer } from "@/components/Questionnaire";
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ClipboardCheck,
  AlertTriangle,
  Vibrate,
  StretchHorizontal,
  BicepsFlexed,
  ArrowDown,
  ShieldAlert,
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

const riskChecklist = [
  { id: "back", label: "Sinto dores nas costas após um dia de trabalho" },
  { id: "shoulders", label: "Tenho dores nos ombros ou braços ao serrar ou martelar" },
  { id: "knees", label: "Passo longos períodos ajoelhado ou agachado" },
  { id: "vibration", label: "Uso ferramentas com vibração (lixadeira, rebarbadora) diariamente" },
  { id: "breaks", label: "Trabalho mais de 2 horas seguidas sem fazer pausas" },
  { id: "posture", label: "Trabalho frequentemente com o tronco curvado para a frente" },
];

const images = [
  { src: carpenterWorkbench, alt: "Carpinteiro a trabalhar numa bancada de madeira", caption: "Trabalho em bancada" },
  { src: carpenterSanding, alt: "Carpinteiro a usar lixadeira elétrica", caption: "Ferramentas com vibração" },
  { src: carpenterKneeling, alt: "Carpinteiro ajoelhado a instalar pavimento", caption: "Trabalho ao nível do chão" },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [checkedRisks, setCheckedRisks] = useState<string[]>([]);

  const riskLevel = checkedRisks.length === 0
    ? null
    : checkedRisks.length <= 2
      ? "low"
      : checkedRisks.length <= 4
        ? "moderate"
        : "high";

  const toggleRisk = (id: string) => {
    setCheckedRisks((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

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
