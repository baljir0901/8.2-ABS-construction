import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Modern architecture background"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
        data-ai-hint="modern architecture"
        priority
      />
      <div className="relative z-10 text-center space-y-6 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight animate-fade-in-down">
          Чанартай барилга, <span className="text-accent">Бат бэх</span> ирээдүй
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 animate-fade-in-up">
          ABS Build компани нь орчин үеийн дэвшилтэт техник, технологид суурилсан барилга угсралтын цогц үйлчилгээг мэргэжлийн өндөр түвшинд үзүүлж байна.
        </p>
        <div className="space-x-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
            <a href="#projects">Бидний Төслүүд</a>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
            <a href="#contact">Холбоо барих</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
