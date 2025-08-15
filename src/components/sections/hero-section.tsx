export default function HeroSection() {
  return (
    <section id="home" className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
           <p className="text-primary font-semibold mb-4 text-sm tracking-widest relative pl-10 after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
             Бидний танилцуулга
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight uppercase">
            Итгэл, чанарыг ирээдүйд <br /> өвлүүлж, өнөөдрийг бүтээе
          </h1>
        </div>
      </div>
    </section>
  );
}
