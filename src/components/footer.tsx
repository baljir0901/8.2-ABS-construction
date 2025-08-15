import Logo from "./logo";
import { Button } from "./ui/button";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-card text-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Чанартай барилга, бат бэх ирээдүйг цогцлооно. Бид орчин үеийн шийдэл, технологид суурилсан барилга угсралтын үйлчилгээг үзүүлдэг.
            </p>
             <div className="flex space-x-2 mt-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="lg:col-start-3">
            <h3 className="text-lg font-semibold font-headline text-primary">Холбоосууд</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Нүүр</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Үйлчилгээ</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Төслүүд</a></li>
              <li><a href="#news" className="hover:text-primary transition-colors">Мэдээ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline text-primary">Холбоо барих</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, ... гудамж, 1-1 тоот</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 shrink-0 text-primary" />
                <span>+976 7700 0077</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 shrink-0 text-primary" />
                <span>info@absbuild.mn</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/20 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jiguur Grand Group. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
