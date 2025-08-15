import { Building } from "lucide-react";

export default function Logo() {
  return (
    <a href="#home" className="flex items-center space-x-2">
      <Building className="h-8 w-8 text-primary" />
      <span className="font-bold text-xl text-primary font-headline tracking-wider">
        ABS BUILD
      </span>
    </a>
  );
}
