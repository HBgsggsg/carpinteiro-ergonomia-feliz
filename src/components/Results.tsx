import type { Answer } from "./Questionnaire";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info, RotateCcw, Shield } from "lucide-react";

interface CategoryResult {
  key: string;
  label: string;
  score: number;
  maxScore: number;
  level: "low" | "medium" | "high";
  problems: string[];
  suggestions: string[];
}

function analyzeCategory(key: string, answers: Answer[]): CategoryResult {
  const catAnswers = answers.filter((a) => a.category === key);
  const score = catAnswers.reduce((s, a) => s + a.value, 0);
  const maxScore = catAnswers.length * 3;
  const ratio = score / maxScore;

  const level: "low" | "medium" | "high" =
    ratio <= 0.33 ? "low" : ratio <= 0.66 ? "medium" : "high";

  const data: Record<string, { label: string; problems: Record<string, string[]>; suggestions: Record<string, string[]> }> = {
    costas: {
      label: "Costas e Coluna",
      problems: {
        low: [],
        medium: ["Risco moderado de lesões lombares devido a posturas incorretas."],
        high: [
          "Risco elevado de hérnia discal e lombalgia crónica.",
          "Carga excessiva na coluna por transporte manual de materiais.",
        ],
      },
      suggestions: {
        low: ["Continue a manter boas práticas posturais."],
        medium: [
          "Use bancadas de trabalho com altura ajustável.",
          "Ao levantar cargas, dobre os joelhos e mantenha as costas retas.",
          "Considere usar um cinto de suporte lombar.",
        ],
        high: [
          "Utilize equipamentos de elevação (carrinhos, gruas manuais) para materiais pesados.",
          "Instale bancadas ergonómicas à altura da cintura.",
          "Faça exercícios de fortalecimento do core diariamente.",
          "Consulte um fisioterapeuta para avaliação postural.",
        ],
      },
    },
    ombros: {
      label: "Ombros e Braços",
      problems: {
        low: [],
        medium: ["Tensão muscular nos ombros devido a movimentos repetitivos."],
        high: [
          "Risco elevado de tendinite e síndrome do túnel cárpico.",
          "Sobrecarga nos ombros por trabalho prolongado acima da cabeça.",
        ],
      },
      suggestions: {
        low: ["Mantenha os hábitos atuais de trabalho."],
        medium: [
          "Alterne entre tarefas para reduzir movimentos repetitivos.",
          "Faça alongamentos dos braços e ombros a cada 2 horas.",
        ],
        high: [
          "Use ferramentas elétricas com pega ergonómica e antivibração.",
          "Evite trabalhar acima do nível dos ombros — use escadotes ou plataformas.",
          "Aplique gelo nos ombros após jornadas intensas.",
          "Considere fisioterapia preventiva.",
        ],
      },
    },
    joelhos: {
      label: "Joelhos",
      problems: {
        low: [],
        medium: ["Desgaste moderado nas articulações dos joelhos."],
        high: [
          "Risco elevado de bursite e artrose nos joelhos.",
          "Pressão excessiva nas articulações por ajoelhar-se longos períodos.",
        ],
      },
      suggestions: {
        low: ["Continue a proteger os joelhos quando necessário."],
        medium: [
          "Use joelheiras acolchoadas de qualidade profissional.",
          "Alterne entre posições de joelhos e de pé.",
        ],
        high: [
          "Invista em joelheiras profissionais com gel.",
          "Use um tapete ergonómico acolchoado para trabalhos no chão.",
          "Limite o tempo ajoelhado a 30 minutos seguidos, com pausas.",
          "Fortaleça os músculos das pernas com exercícios específicos.",
        ],
      },
    },
    vibracoes: {
      label: "Vibrações",
      problems: {
        low: [],
        medium: ["Exposição moderada a vibrações — risco de desconforto nas mãos."],
        high: [
          "Risco elevado de síndrome de vibração mão-braço.",
          "Possível dano nos nervos e vasos sanguíneos das mãos.",
        ],
      },
      suggestions: {
        low: ["Mantenha a utilização moderada de ferramentas vibratórias."],
        medium: [
          "Use luvas antivibração certificadas.",
          "Faça pausas regulares ao usar ferramentas elétricas.",
        ],
        high: [
          "Limite a exposição diária a ferramentas vibratórias (máximo 2 horas).",
          "Use luvas antivibração e ferramentas com sistemas de amortecimento.",
          "Alterne entre ferramentas manuais e elétricas.",
          "Se sentir dormência ou formigueiro nas mãos, consulte um médico.",
        ],
      },
    },
    postura: {
      label: "Postura Geral",
      problems: {
        low: [],
        medium: ["Posturas desconfortáveis frequentes durante o trabalho."],
        high: [
          "Risco elevado de lesões musculoesqueléticas por posturas incorretas.",
          "Trabalho prolongado em posições forçadas.",
        ],
      },
      suggestions: {
        low: ["Excelente — mantenha a consciência postural."],
        medium: [
          "Reorganize o espaço de trabalho para minimizar posições forçadas.",
          "Use ferramentas com cabos extensíveis para evitar curvar-se.",
        ],
        high: [
          "Faça uma avaliação ergonómica completa do local de trabalho.",
          "Invista em equipamento ajustável (cavaletes, bancadas, plataformas).",
          "Pratique exercícios de mobilidade antes e depois do trabalho.",
          "Considere formação em ergonomia no trabalho.",
        ],
      },
    },
    pausas: {
      label: "Pausas e Descanso",
      problems: {
        low: [],
        medium: ["As pausas são irregulares — risco de fadiga acumulada."],
        high: [
          "Ausência de pausas adequadas aumenta o risco de lesões.",
          "Fadiga muscular crónica por falta de recuperação.",
        ],
      },
      suggestions: {
        low: ["Ótimo hábito — continue a fazer pausas regulares."],
        medium: [
          "Defina alarmes para pausas a cada 90 minutos.",
          "Use as pausas para alongamentos simples de 2-3 minutos.",
        ],
        high: [
          "Implemente a regra 50/10: 50 minutos de trabalho, 10 de pausa.",
          "Faça alongamentos durante cada pausa (costas, ombros, mãos).",
          "Hidrate-se regularmente ao longo do dia.",
          "Comunique ao empregador a necessidade de pausas regulares — é um direito.",
        ],
      },
    },
  };

  const cat = data[key] || { label: key, problems: { low: [], medium: [], high: [] }, suggestions: { low: [], medium: [], high: [] } };

  return {
    key,
    label: cat.label,
    score,
    maxScore,
    level,
    problems: cat.problems[level],
    suggestions: cat.suggestions[level],
  };
}

const levelConfig = {
  low: { icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10", badge: "Baixo Risco", badgeClass: "bg-accent/15 text-accent-foreground border-accent/30" },
  medium: { icon: Info, color: "text-warning", bg: "bg-warning/10", badge: "Risco Moderado", badgeClass: "bg-warning/15 text-warning-foreground border-warning/30" },
  high: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", badge: "Risco Elevado", badgeClass: "bg-destructive/15 text-destructive-foreground border-destructive/30" },
};

interface Props {
  answers: Answer[];
  onRestart: () => void;
}

export default function Results({ answers, onRestart }: Props) {
  const categories = ["costas", "ombros", "joelhos", "vibracoes", "postura", "pausas"];
  const results = categories.map((c) => analyzeCategory(c, answers));
  const totalScore = answers.reduce((s, a) => s + a.value, 0);
  const maxTotal = answers.length * 3;
  const overallRatio = totalScore / maxTotal;
  const overallLevel: "low" | "medium" | "high" =
    overallRatio <= 0.33 ? "low" : overallRatio <= 0.66 ? "medium" : "high";

  const overallMessages = {
    low: "A sua situação ergonómica parece boa! Continue a manter boas práticas.",
    medium: "Existem áreas que podem ser melhoradas para prevenir lesões futuras.",
    high: "Atenção! Foram identificados riscos ergonómicos significativos. Tome medidas o quanto antes.",
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Resultados da Avaliação</h1>
          <p className="text-muted-foreground text-sm">Avaliação Ergonómica — Carpinteiro</p>
        </div>

        {/* Overall */}
        <Card className={`p-6 border-2 ${overallLevel === "high" ? "border-destructive/30" : overallLevel === "medium" ? "border-warning/30" : "border-accent/30"}`}>
          <div className="flex items-start gap-4">
            {(() => {
              const Icon = levelConfig[overallLevel].icon;
              return <Icon className={`w-6 h-6 mt-0.5 ${levelConfig[overallLevel].color}`} />;
            })()}
            <div>
              <h2 className="font-semibold text-foreground mb-1">Avaliação Geral</h2>
              <p className="text-sm text-muted-foreground">{overallMessages[overallLevel]}</p>
            </div>
          </div>
        </Card>

        {/* Category cards */}
        {results.map((r) => {
          const config = levelConfig[r.level];
          const Icon = config.icon;
          const hasIssues = r.problems.length > 0;

          return (
            <Card key={r.key} className="p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <h3 className="font-semibold text-card-foreground">{r.label}</h3>
                </div>
                <Badge variant="outline" className={config.badgeClass}>
                  {config.badge}
                </Badge>
              </div>

              {hasIssues && (
                <div className="mb-3 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Problemas identificados</p>
                  {r.problems.map((p, i) => (
                    <p key={i} className="text-sm text-card-foreground">• {p}</p>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sugestões</p>
                {r.suggestions.map((s, i) => (
                  <p key={i} className="text-sm text-card-foreground">✓ {s}</p>
                ))}
              </div>
            </Card>
          );
        })}

        <div className="text-center pt-4 pb-8">
          <Button onClick={onRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Refazer Avaliação
          </Button>
        </div>
      </div>
    </div>
  );
}
