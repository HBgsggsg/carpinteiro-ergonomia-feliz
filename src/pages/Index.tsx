import { useState } from "react";
import Questionnaire, { type Answer } from "@/components/Questionnaire";
import Results from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Hammer, ClipboardCheck } from "lucide-react";

type Screen = "home" | "quiz" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [answers, setAnswers] = useState<Answer[]>([]);

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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
          <Hammer className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Ergonomia para Carpinteiros
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Avalie as suas condições de trabalho e descubra como prevenir lesões
            musculoesqueléticas no dia a dia da carpintaria.
          </p>
        </div>

        <Button size="lg" onClick={() => setScreen("quiz")} className="gap-2 text-base px-8">
          <ClipboardCheck className="w-5 h-5" />
          Iniciar Avaliação
        </Button>

        <p className="text-xs text-muted-foreground">
          7 perguntas · Resultados imediatos · Sugestões personalizadas
        </p>
      </div>
    </div>
  );
};

export default Index;
