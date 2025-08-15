"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjects, Project } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
           <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Бидний хэрэгжүүлсэн төслүүд</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Манай компанийн чанарын баталгаа болсон томоохон төслүүдтэй танилцана уу.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
               <Card key={index} className="overflow-hidden group">
                 <CardContent className="p-0">
                    <Skeleton className="h-60 w-full" />
                 </CardContent>
                 <CardFooter className="p-4 bg-card">
                   <Skeleton className="h-6 w-3/4" />
                 </CardFooter>
               </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Бидний хэрэгжүүлсэн төслүүд</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Манай компанийн чанарын баталгаа болсон томоохон төслүүдтэй танилцана уу.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <Image
                  src={project.image || "https://placehold.co/600x400.png"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={project.hint}
                />
              </CardContent>
              <CardFooter className="p-4 bg-card">
                <h3 className="text-lg font-semibold text-primary font-headline">{project.title}</h3>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Бүх төслүүдийг харах
            </Button>
        </div>
      </div>
    </section>
  );
}
