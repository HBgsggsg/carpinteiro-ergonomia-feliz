import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import coverImage from "@/assets/carpentry-splash.jpg";
import workbenchImage from "@/assets/carpenter-workbench.jpg";
import sandingImage from "@/assets/carpenter-sanding.jpg";
import kneelingImage from "@/assets/carpenter-kneeling.jpg";

interface Props {
  onFinish: () => void;
}

type Slide = {
  kind: "cover" | "content";
  title: string;
  subtitle?: string;
  bullets?: string[];
  meta?: string[];
  image?: string;
};

const slides: Slide[] = [
  {
    kind: "cover",
    title: "Ergonomia no Trabalho do Carpinteiro",
    subtitle: "Análise ergonómica e proposta de melhorias",
    meta: ["Henrique Batista | Henrique David", "UFCD 6669"],
    image: coverImage,
  },
  {
    kind: "content",
    title: "O que é a Ergonomia?",
    bullets: [
      "Ciência que adapta o trabalho ao ser humano",
      "Reduz lesões e melhora o bem-estar",
      "Aumenta a produtividade e a segurança",
      "Aplica-se a posturas, ferramentas e ambiente de trabalho",
    ],
    image: workbenchImage,
  },
  {
    kind: "content",
    title: "A Profissão de Carpinteiro",
    bullets: [
      "Trabalha a madeira para construir, montar e reparar estruturas",
      "Utiliza ferramentas manuais e elétricas",
      "Trabalha em oficina ou em obra",
      "Exige precisão, força física e criatividade",
    ],
    image: sandingImage,
  },
  {
    kind: "content",
    title: "Principais Riscos Ergonómicos",
    bullets: [
      "Dores nas costas por posturas curvadas",
      "Lesões nos ombros por movimentos repetitivos",
      "Problemas nos joelhos por ajoelhar prolongado",
      "Síndrome de vibração mão-braço",
      "Fadiga muscular por falta de pausas",
    ],
    image: kneelingImage,
  },
  {
    kind: "content",
    title: "Soluções Propostas",
    bullets: [
      "Usar equipamentos de elevação para materiais pesados",
      "Fazer pausas regulares (regra 50/10)",
      "Utilizar bancadas ergonómicas à altura da cintura",
      "Usar luvas antivibrações e joelheiras profissionais",
      "Praticar exercícios de mobilidade antes e após o trabalho",
    ],
    image: workbenchImage,
  },
];

export default function Slideshow({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const isFirst = index === 0;

  return (
    <div className="min-h-screen bg-secondary/40 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl aspect-[16/9] bg-card rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col">
        {slide.kind === "cover" ? (
          <div className="relative flex-1 flex items-center justify-center text-center">
            {slide.image && (
              <>
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/70" />
              </>
            )}
            <div className="relative z-10 px-8 space-y-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-background tracking-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-lg md:text-2xl text-background/90 italic">
                  {slide.subtitle}
                </p>
              )}
              {slide.meta && (
                <div className="pt-6 space-y-1 text-background/80 text-sm md:text-base">
                  {slide.meta.map((m) => (
                    <p key={m}>{m}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="bg-primary px-8 py-5 border-b-4 border-primary/70">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                {slide.title}
              </h2>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
              <ul className="space-y-3 md:space-y-4 self-center">
                {slide.bullets?.map((b) => (
                  <li key={b} className="flex gap-3 text-base md:text-lg text-card-foreground">
                    <span className="mt-2 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              {slide.image && (
                <div className="hidden md:block rounded-lg overflow-hidden border border-border">
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl mt-6 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {index + 1} / {slides.length}
          </span>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {isLast ? (
          <Button onClick={onFinish} className="gap-2">
            Ver Site
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))} className="gap-2">
            Seguinte
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}