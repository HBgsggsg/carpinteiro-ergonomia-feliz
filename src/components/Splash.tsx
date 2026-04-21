import { Button } from "@/components/ui/button";
import { Hammer, ArrowRight } from "lucide-react";
import splashImage from "@/assets/carpentry-splash.jpg";

interface Props {
  onContinue: () => void;
}

export default function Splash({ onContinue }: Props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={splashImage}
        alt="Bancada de carpinteiro com ferramentas e aparas de madeira"
        width={1536}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/70" />

      <div className="relative z-10 max-w-2xl text-center px-6 py-16 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/90 backdrop-blur shadow-lg">
          <Hammer className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-background tracking-tight">
          ErgoCarpinteiro
        </h1>
        <p className="text-lg md:text-xl text-background/90 leading-relaxed max-w-xl mx-auto">
          Esta aplicação ajuda carpinteiros a identificar riscos ergonómicos no seu posto de
          trabalho e a melhorar as suas condições de trabalho.
        </p>
        <Button
          size="lg"
          onClick={onContinue}
          className="gap-2 text-base px-10 mt-2 shadow-lg"
        >
          Começar
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}