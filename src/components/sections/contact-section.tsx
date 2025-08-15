"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Холбоо барих</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Танд асуух зүйл байвал бидэнтэй холбогдоно уу. Бид танд туслахдаа таатай байх болно.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Хаяг</h3>
                <p className="text-muted-foreground">Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, ... гудамж, 1-1 тоот</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Утас</h3>
                <p className="text-muted-foreground">+976 7700 0077</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Имэйл</h3>
                <p className="text-muted-foreground">info@absbuild.mn</p>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Таны нэр" />
                  <Input type="email" placeholder="Имэйл хаяг" />
                </div>
                <Input placeholder="Гарчиг" />
                <Textarea placeholder="Таны зурвас" rows={5} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Илгээх</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
