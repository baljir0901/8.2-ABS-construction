"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProjects, Project } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData.slice(0, 4)); // Show only 4 projects
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
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full" />
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <div className="relative aspect-square w-full overflow-hidden group cursor-pointer">
              <Image
                src={project.image || "https://placehold.co/600x600.png"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={project.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold font-headline">
                  {project.title}
              </h3>
            </div>
        </Link>
      ))}
    </div>
  );
}
