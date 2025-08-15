"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addContactMessage } from "@/lib/firebase";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ variant: "destructive", title: "Бүх талбарыг бөглөнө үү." });
      return;
    }
    setIsSending(true);
    try {
      await addContactMessage({
        to: 'baljir0901@gmail.com', // Your email address
        message: {
          subject: `Шинэ холбоо барих зурвас: ${formData.subject}`,
          html: `
            <p><strong>Нэр:</strong> ${formData.name}</p>
            <p><strong>Имэйл:</strong> ${formData.email}</p>
            <hr />
            <p><strong>Зурвас:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
          `,
        },
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });
      toast({ title: "Амжилттай илгээлээ!", description: "Бид тантай удахгүй холбогдох болно." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
       toast({ variant: "destructive", title: "Илгээхэд алдаа гарлаа.", description: "Дахин оролдоно уу." });
    } finally {
      setIsSending(false);
    }
  };


  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
             <div className="space-y-4">
                <p className="text-primary font-semibold text-sm tracking-widest relative pl-10 after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
                    Contact us
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Холбоо барих</h2>
                <p className="text-muted-foreground">Танд асуух зүйл байвал бидэнтэй холбогдоно уу. Бид танд туслахдаа таатай байх болно.</p>
             </div>
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
          <Card className="border-none shadow-none bg-card p-2 rounded-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Таны нэр" value={formData.name} onChange={handleChange} required />
                  <Input name="email" type="email" placeholder="Имэйл хаяг" value={formData.email} onChange={handleChange} required />
                </div>
                <Input name="subject" placeholder="Гарчиг" value={formData.subject} onChange={handleChange} required />
                <Textarea name="message" placeholder="Таны зурвас" rows={5} value={formData.message} onChange={handleChange} required />
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? 'Илгээж байна...' : 'Илгээх'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
