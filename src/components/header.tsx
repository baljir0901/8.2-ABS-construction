"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Menu, X, Building } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Группийн танилцуулга", href: "#about" },
  { title: "Бизнесийн салбарууд", href: "#services" },
  { title: "Бүтээн байгуулалтууд", href: "#projects" },
  { title: "Мэдээ мэдээлэл", href: "#news" },
  { title: "Холбоо барих", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <span className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                {link.title}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center space-x-2">
             <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/dashboard">
                    <Building />
                </Link>
            </Button>
        </div>
        <div className="lg:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-sm pb-4">
          <nav className="container mx-auto flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <span onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary">
                  {link.title}
                </span>
              </Link>
            ))}
             <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/dashboard">
                        <Building />
                    </Link>
                </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
