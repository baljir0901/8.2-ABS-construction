import Image from "next/image";

const logos = [
    { src: "https://placehold.co/200x80.png", alt: "Company 1", hint: "company logo" },
    { src: "https://placehold.co/200x80.png", alt: "Company 2", hint: "company logo" },
    { src: "https://placehold.co/200x80.png", alt: "Company 3", hint: "company logo" },
    { src: "https://placehold.co/200x80.png", alt: "Company 4", hint: "company logo" },
    { src: "https://placehold.co/200x80.png", alt: "Company 5", hint: "company logo" },
    { src: "https://placehold.co/200x80.png", alt: "Company 6", hint: "company logo" },
];

export default function BusinessSectorsSection() {
  return (
    <section id="business-sectors" className="py-20 lg:py-28 bg-dark-card text-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2 text-sm tracking-widest">
                Нийт 8 дэд компаниуд
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight uppercase">
                Бизнесийн чиглэлүүд
            </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {logos.map((logo, index) => (
                <div key={index} className="flex justify-center">
                    <Image 
                        src={logo.src} 
                        alt={logo.alt} 
                        width={160} 
                        height={64}
                        className="object-contain" 
                        data-ai-hint={logo.hint}
                    />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
