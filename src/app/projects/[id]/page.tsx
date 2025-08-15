"use client";

import { useState, useEffect } from 'react';
import { getProject, Project } from '@/lib/firebase';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(params.id);
        if (projectData) {
          setProject(projectData);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
       <>
        <Header />
         <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-12 w-1/4 mb-4" />
            <Skeleton className="h-[500px] w-full mb-8" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4" />
        </div>
        <Footer />
       </>
    )
  }

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 lg:py-20">
        <div className="container mx-auto px-4">
           <Button variant="outline" asChild className='mb-8'>
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Бусад төсөл
              </Link>
           </Button>
          <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-8">{project.title}</h1>
          <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={project.hint}
            />
          </div>
          <div className="max-w-4xl mx-auto">
             <div 
                className="prose lg:prose-xl max-w-none text-muted-foreground" 
                dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br />') }} 
             />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
