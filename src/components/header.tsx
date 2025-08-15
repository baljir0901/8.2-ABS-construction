"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Нүүр", href: "#home" },
  { title: "Үйлчилгээ", href: "#services" },
  { title: "Төслүүд", href: "#projects" },
  { title: "Мэдээ", href: "#news" },
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
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <span className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                {link.title}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <a href="#contact">Холбоо барих</a>
          </Button>
        </div>
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-sm pb-4">
          <nav className="container mx-auto flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <span onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary">
                  {link.title}
                </span>
              </Link>
            ))}
            <Button asChild className="w-full max-w-xs">
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Холбоо барих</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
