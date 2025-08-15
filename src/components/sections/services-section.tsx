import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Wrench, DraftingCompass, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Building2,
    title: "Барилга Угсралт",
    description: "Орон сууц, оффис, үйлдвэрийн барилгын иж бүрэн угсралтын ажлыг гүйцэтгэнэ.",
  },
  {
    icon: Wrench,
    title: "Засвар, Шинэчлэлт",
    description: "Хуучин барилгын их засвар, өргөтгөл, шинэчлэлийн ажлыг чанарын өндөр түвшинд хийнэ.",
  },
  {
    icon: DraftingCompass,
    title: "Зураг Төсөл",
    description: "Барилгын эх загвар, архитектур, инженерийн нарийвчилсан зураг төслийг боловсруулна.",
  },
   {
    icon: Home,
    title: "Интерьер, Экстерьер",
    description: "Орчин үеийн шийдэл бүхий интерьер болон экстерьерийн гүйцэтгэлийг санал болгож байна.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Манай Үйлчилгээ</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Бид барилгын салбарт дараах цогц үйлчилгээнүүдийг санал болгож байна.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
                <CardDescription className="pt-2">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
