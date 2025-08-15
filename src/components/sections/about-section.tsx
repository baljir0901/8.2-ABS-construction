import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight uppercase">
            Тэнгэрт тэмүүлж, газарт <br /> гагнагдсан их бүтээн байгуулагч
        </h2>
        <p className="text-muted-foreground">
            Эрхэм зорилго, чанар, инновацийг эрхэмлэн Жигүүр Гранд Групп Монгол Улсын барилга, үл хөдлөх хөрөнгийн салбарт тэргүүлэх байр суурьтай болж өссөн. Манай үндсэн үзүүлэлтүүд нь бидний амжилт, чанарын амлалтыг илтгэж, нийгмийн хөгжилд оруулж буй хувь нэмрийг харуулж байна.
        </p>
        <Button asChild size="lg" className="rounded-full">
            <Link href="#projects">
                Бүтээн байгуулалтууд
                <span className="ml-2 bg-primary-foreground/20 rounded-full p-1.5 inline-flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </span>
            </Link>
        </Button>
    </div>
  );
}
