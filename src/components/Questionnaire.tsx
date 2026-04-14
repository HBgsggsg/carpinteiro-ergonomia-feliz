import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface Answer {
  questionId: number;
  value: number;
  category: string;
}

const questions = [
  {
    id: 1,
    category: "costas",
    text: "Com que frequência sente dores nas costas durante ou após o trabalho?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Raramente (1-2 vezes por mês)", value: 1 },
      { label: "Frequentemente (várias vezes por semana)", value: 2 },
      { label: "Sempre (todos os dias)", value: 3 },
    ],
  },
  {
    id: 2,
    category: "ombros",
    text: "Sente dor ou tensão nos ombros e braços ao serrar, lixar ou martelar?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Raramente", value: 1 },
      { label: "Frequentemente", value: 2 },
      { label: "Sempre", value: 3 },
    ],
  },
  {
    id: 3,
    category: "joelhos",
    text: "Durante o trabalho, precisa de se ajoelhar ou agachar por longos períodos?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Ocasionalmente (menos de 1 hora/dia)", value: 1 },
      { label: "Frequentemente (1-3 horas/dia)", value: 2 },
      { label: "A maior parte do dia (mais de 3 horas)", value: 3 },
    ],
  },
  {
    id: 4,
    category: "vibracoes",
    text: "Utiliza ferramentas elétricas com vibração (rebarbadora, lixadeira, etc.)?",
    options: [
      { label: "Nunca ou muito raramente", value: 0 },
      { label: "Menos de 1 hora por dia", value: 1 },
      { label: "Entre 1 a 3 horas por dia", value: 2 },
      { label: "Mais de 3 horas por dia", value: 3 },
    ],
  },
  {
    id: 5,
    category: "postura",
    text: "Com que frequência trabalha em posições desconfortáveis (curvado, com os braços acima da cabeça, etc.)?",
    options: [
      { label: "Nunca", value: 0 },
      { label: "Raramente", value: 1 },
      { label: "Frequentemente", value: 2 },
      { label: "Quase sempre", value: 3 },
    ],
  },
  {
    id: 6,
    category: "pausas",
    text: "Faz pausas regulares durante o dia de trabalho para descansar e alongar?",
    options: [
      { label: "Sim, a cada 1-2 horas", value: 0 },
      { label: "Sim, mas irregularmente", value: 1 },
      { label: "Raramente faço pausas", value: 2 },
      { label: "Nunca faço pausas", value: 3 },
    ],
  },
  {
    id: 7,
    category: "costas",
    text: "Carrega materiais pesados (madeira, equipamentos) com frequência sem ajuda?",
    options: [
      { label: "Nunca — uso sempre ajuda ou equipamento", value: 0 },
      { label: "Às vezes", value: 1 },
      { label: "Frequentemente", value: 2 },
      { label: "Quase sempre sozinho", value: 3 },
    ],
  },
];

interface Props {
  onComplete: (answers: Answer[]) => void;
}

export default function Questionnaire({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<string | undefined>();

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleNext = () => {
    if (selected === undefined) return;
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== q.id),
      { questionId: q.id, value: parseInt(selected), category: q.category },
    ];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      const prev = newAnswers.find((a) => a.questionId === questions[current + 1].id);
      setSelected(prev ? String(prev.value) : undefined);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      const prev = answers.find((a) => a.questionId === questions[current - 1].id);
      setSelected(prev ? String(prev.value) : undefined);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Pergunta {current + 1} de {questions.length}
          </p>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-6 md:p-8 shadow-lg border-border/50">
          <h2 className="text-lg font-semibold text-card-foreground mb-6 leading-relaxed">
            {q.text}
          </h2>

          <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
            {q.options.map((opt) => (
              <Label
                key={opt.value}
                htmlFor={`opt-${opt.value}`}
                className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer transition-colors hover:bg-secondary data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
              >
                <RadioGroupItem value={String(opt.value)} id={`opt-${opt.value}`} />
                <span className="text-sm text-card-foreground">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={current === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>
          <Button onClick={handleNext} disabled={selected === undefined} className="gap-1">
            {current === questions.length - 1 ? "Ver Resultados" : "Seguinte"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
