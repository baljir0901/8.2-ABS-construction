import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const newsItems = [
  {
    title: "Барилгын салбарын 'Шилдэг компани' шагнал",
    date: "2024 оны 5-р сарын 20",
    summary: "Бид энэ жил дахин барилгын салбарын шилдэг компаниар шалгарч, нэр хүндтэй шагналын эзэд боллоо.",
    image: "https://placehold.co/600x400.png",
    hint: "award ceremony",
    featured: true,
  },
  {
    title: "Шинэ 'Эко' хороолол төсөл эхэллээ",
    date: "2024 оны 4-р сарын 15",
    summary: "Байгальд ээлтэй, ногоон технологид суурилсан шинэ орон сууцны хорооллын төслийг эхлүүллээ.",
    image: "https://placehold.co/600x400.png",
    hint: "construction blueprint",
    featured: false,
  },
  {
    title: "Ажилчдын мэргэжил дээшлүүлэх сургалт",
    date: "2024 оны 3-р сарын 28",
    summary: "Ажилчдынхаа ур чадварыг дээшлүүлэх зорилгоор олон улсын сургагч багш нартай хамтран сургалт зохион байгууллаа.",
    image: "https://placehold.co/600x400.png",
    hint: "team training",
    featured: false,
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Компанийн Мэдээ</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Салбарын болон компанийн сүүлийн үеийн мэдээ, мэдээлэлтэй танилцана уу.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="flex flex-col overflow-hidden group">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={item.hint}
                />
                 {item.featured && <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">Онцлох</Badge>}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                <p className="text-xs text-muted-foreground pt-1">{item.date}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{item.summary}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
