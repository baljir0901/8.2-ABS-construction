import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import ProjectsSection from "@/components/sections/projects-section";
import NewsSection from "@/components/sections/news-section";
import ContactSection from "@/components/sections/contact-section";
import AboutSection from "@/components/sections/about-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <AboutSection />
                <ProjectsSection />
             </div>
          </div>
        </div>
        <ServicesSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
