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
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-4 mb-12">
           <p className="text-primary font-semibold text-sm tracking-widest relative pl-10 after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
             Манай үйлчилгээ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Бид юу хийдэг вэ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 group pt-6">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <CardTitle className="font-headline text-lg">{service.title}</CardTitle>
                <CardDescription className="pt-2 text-sm">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
