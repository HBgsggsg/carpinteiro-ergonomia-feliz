import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import workshopImage from "@/assets/slide-workshop.jpg";
import workbenchImage from "@/assets/slide-workbench.jpg";
import toolsImage from "@/assets/slide-tools.jpg";
import postureImage from "@/assets/slide-posture.jpg";
import ergonomicImage from "@/assets/slide-ergonomic.jpg";

interface Props {
  onFinish: () => void;
}

type Slide = {
  kind: "cover" | "content";
  title: string;
  subtitle?: string;
  bullets?: string[];
  meta?: string[];
  image: string;
};

const slides: Slide[] = [
  {
    kind: "cover",
    title: "Ergonomia no Trabalho do Carpinteiro",
    subtitle: "Análise ergonómica e proposta de melhorias",
    meta: ["Henrique Batista | Henrique David", "UFCD 6669"],
    image: workshopImage,
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
    image: toolsImage,
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
    image: postureImage,
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
    image: ergonomicImage,
  },
];

export default function Slideshow({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const isFirst = index === 0;
  const progress = ((index + 1) / slides.length) * 100;

  // Preload next image
  useEffect(() => {
    const next = slides[index + 1];
    if (next) {
      const img = new Image();
      img.src = next.image;
    }
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !isLast) setIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && !isFirst) setIndex((i) => i - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isLast, isFirst]);

  return (
    <div className="min-h-screen bg-secondary/40 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl aspect-[16/9] bg-card rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col relative">
        {/* Background image with ken-burns parallax */}
        <div key={`bg-${index}`} className="absolute inset-0 overflow-hidden">
          <img
            src={slide.image}
            alt=""
            width={1536}
            height={1024}
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        {/* Slide content */}
        <div key={`content-${index}`} className="relative z-10 flex-1 flex flex-col animate-fade-in-up">
          {slide.kind === "cover" ? (
            <div className="flex-1 flex items-center justify-center text-center px-8">
              <div className="space-y-4 max-w-3xl">
                <h1
                  className="text-3xl md:text-5xl font-bold text-background tracking-tight animate-fade-in-up"
                  style={{ animationDelay: "100ms" }}
                >
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p
                    className="text-lg md:text-2xl text-background/90 italic animate-fade-in-up"
                    style={{ animationDelay: "300ms" }}
                  >
                    {slide.subtitle}
                  </p>
                )}
                {slide.meta && (
                  <div className="pt-6 space-y-1 text-background/80 text-sm md:text-base">
                    {slide.meta.map((m, i) => (
                      <p
                        key={m}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${500 + i * 150}ms` }}
                      >
                        {m}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div
                className="bg-primary/95 backdrop-blur px-8 py-5 border-b-4 border-primary/70 animate-slide-fade-in"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  {slide.title}
                </h2>
              </div>
              <div className="flex-1 flex items-center p-6 md:p-10">
                <ul className="space-y-3 md:space-y-4 max-w-3xl">
                  {slide.bullets?.map((b, i) => (
                    <li
                      key={b}
                      className="flex gap-3 text-base md:text-lg text-background animate-fade-in-up"
                      style={{ animationDelay: `${300 + i * 180}ms` }}
                    >
                      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-primary shrink-0 shadow-lg" />
                      <span className="leading-relaxed drop-shadow">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-foreground/20 z-20">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-5xl mt-6 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="gap-2 transition-all duration-200 hover:-translate-x-1 hover:shadow-md disabled:hover:translate-x-0"
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/40 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {isLast ? (
          <Button
            onClick={onFinish}
            className="gap-2 transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
          >
            Ver Site
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            className="gap-2 transition-all duration-200 hover:translate-x-1 hover:shadow-md"
          >
            Seguinte
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}