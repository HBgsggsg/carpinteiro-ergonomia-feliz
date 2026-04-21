import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Hammer, Package, Repeat, Vibrate, Clock } from "lucide-react";
import carpenterWorkbench from "@/assets/carpenter-workbench.jpg";
import carpenterSanding from "@/assets/carpenter-sanding.jpg";
import carpenterKneeling from "@/assets/carpenter-kneeling.jpg";

interface Props {
  onContinue: () => void;
}

const demands = [
  {
    icon: Clock,
    title: "Longos períodos de pé",
    description: "Muitas horas em posição estática junto à bancada ou em obra.",
  },
  {
    icon: Package,
    title: "Levantar materiais pesados",
    description: "Transporte frequente de tábuas, painéis e equipamentos.",
  },
  {
    icon: Repeat,
    title: "Movimentos repetitivos",
    description: "Serrar, lixar, martelar e aparafusar repetidamente ao longo do dia.",
  },
  {
    icon: Vibrate,
    title: "Ferramentas vibratórias",
    description: "Uso contínuo de lixadeiras, serras e rebarbadoras elétricas.",
  },
];

const images = [
  { src: carpenterWorkbench, alt: "Carpinteiro a trabalhar numa bancada" },
  { src: carpenterSanding, alt: "Carpinteiro a usar lixadeira elétrica" },
  { src: carpenterKneeling, alt: "Carpinteiro a instalar pavimento ajoelhado" },
];

export default function Profession({ onContinue }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-6 py-16 md:py-20 max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2">
            <Hammer className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            A Profissão de Carpinteiro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O carpinteiro trabalha a madeira para construir, montar, reparar e instalar estruturas,
            mobiliário, portas, janelas, escadas e pavimentos. É uma profissão que combina precisão,
            criatividade e força física.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {images.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt}
                width={800}
                height={512}
                loading="lazy"
                className="w-full h-44 object-cover"
              />
            </figure>
          ))}
        </div>

        <Card className="border-border/50 mb-12">
          <CardContent className="p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-card-foreground">
              Tarefas e ferramentas típicas
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No dia a dia, o carpinteiro mede, corta e une peças de madeira utilizando ferramentas
              manuais — como martelos, formões, serrotes, plainas e fitas métricas — e ferramentas
              elétricas como serras circulares, lixadeiras, berbequins e tupias. Trabalha em
              oficina ou em obra, frequentemente em diferentes alturas e posições.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
          Principais exigências físicas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {demands.map((d) => (
            <Card key={d.title} className="border-border/50">
              <CardContent className="p-5 flex gap-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 shrink-0">
                  <d.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={onContinue} className="gap-2 text-base px-10">
            Continuar
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}