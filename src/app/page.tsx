import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import ProjectsSection from "@/components/sections/projects-section";
import NewsSection from "@/components/sections/news-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
