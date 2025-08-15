import Logo from "./logo";
import { Button } from "./ui/button";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Чанартай барилга, бат бэх ирээдүйг цогцлооно. Бид орчин үеийн шийдэл, технологид суурилсан барилга угсралтын үйлчилгээг үзүүлдэг.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline text-primary">Холбоосууд</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#home" className="hover:text-primary transition-colors">Нүүр</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Үйлчилгээ</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Төслүүд</a></li>
              <li><a href="#news" className="hover:text-primary transition-colors">Мэдээ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline text-primary">Холбоо барих</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 shrink-0 text-primary" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, ... гудамж, 1-1 тоот</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <span>+976 7700 0077</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <span>info@absbuild.mn</span>
              </li>
            </ul>
          </div>
          <div>
             <h3 className="text-lg font-semibold font-headline text-primary">Бидэнтэй нэгдээрэй</h3>
            <div className="flex space-x-4 mt-4">
              <Button variant="ghost" size="icon" className="text-secondary-foreground/70 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-secondary-foreground/70 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-secondary-foreground/70 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-secondary-foreground/70 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ABS Build. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
