"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getServices, Service } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { LucideIcon } from 'lucide-react';


const Icon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const LucideIcon = (LucideIcons as any)[name] as LucideIcon;
  if (!LucideIcon) {
    return <LucideIcons.Building2 {...props} />; // Default icon
  }
  return <LucideIcon {...props} />;
};


export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
       <section id="services" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-4 mb-12">
            <p className="text-primary font-semibold text-sm tracking-widest relative pl-10 after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
              Манай үйлчилгээ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Бид юу хийдэг вэ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="text-center pt-6">
                 <CardHeader className="items-center">
                   <Skeleton className="h-16 w-16 rounded-full" />
                   <Skeleton className="h-6 w-3/4 mt-4" />
                   <div className="space-y-2 pt-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                   </div>
                 </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-4 mb-12">
           <p className="text-primary font-semibold text-sm tracking-widest relative pl-10 after:absolute after:w-8 after:h-px after:bg-primary after:left-0 after:top-1/2">
             Манай үйлчилгээ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Бид юу хийдэг вэ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300 group pt-6">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Icon name={service.icon} className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <CardTitle className="font-headline text-lg">{service.title}</CardTitle>
                <CardDescription className="pt-2 text-sm">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
