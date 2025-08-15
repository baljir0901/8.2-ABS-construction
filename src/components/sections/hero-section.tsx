import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Construction workers background"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
        data-ai-hint="construction workers"
        priority
      />
      <div className="relative z-20 text-center space-y-8 container mx-auto px-4">
        <h1 className="text-4xl md:text-7xl font-extrabold font-headline tracking-tight uppercase animate-fade-in-down">
         Тэнгэрт тэтгэгдэж, газарт<br/> гагнагдсан их бүтээн байгуулагч
        </h1>
      </div>
       <div className="absolute z-20 bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-20 bg-white/50 animate-pulse"></div>
      </div>
    </section>
  );
}
