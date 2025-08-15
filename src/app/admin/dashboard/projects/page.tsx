"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getProjects, addProject, updateProject, deleteProject, Project, uploadImage, deleteImage } from '@/lib/firebase';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      toast({ variant: "destructive", title: "Тслийг татахад алдаа гарлаа" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4 md:p-8">
       <header className="flex items-center justify-between mb-8">
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Төсөл удирдах</h1>
        <ProjectFormDialog onSave={fetchProjects} />
      </header>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <Skeleton className="h-60 w-full" />
                <CardFooter className="p-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-3/4" />
                </CardFooter>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className='p-8 text-center'>Төсөл олдсонгүй.</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
             <Card key={project.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Image
                  src={project.image || "https://placehold.co/600x400.png"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                  data-ai-hint={project.hint}
                />
              </CardContent>
              <CardFooter className="p-4 bg-card flex items-center justify-between">
                <h3 className="text-base font-semibold text-primary font-headline">{project.title}</h3>
                <div className='flex items-center'>
                    <ProjectFormDialog project={project} onSave={fetchProjects}>
                        <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        </Button>
                    </ProjectFormDialog>
                    <DeleteProjectDialog project={project} onSucess={fetchProjects} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


function ProjectFormDialog({ project, onSave, children }: { project?: Project, onSave: () => void, children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image || null);
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'image'>>({
    title: project?.title || '',
    hint: project?.hint || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let imageUrl = project?.image || '';

      if (imageFile) {
        if (project?.image) {
          await deleteImage(project.image);
        }
        imageUrl = await uploadImage(imageFile);
      }
      
      const projectData = { ...formData, image: imageUrl };

      if (project?.id) {
        await updateProject(project.id, projectData);
        toast({ title: "Амжилттай шинэчиллээ" });
      } else {
        if (!imageUrl) {
            toast({ variant: "destructive", title: "Зураг оруулна уу." });
            setIsSaving(false);
            return;
        }
        await addProject(projectData);
        toast({ title: "Амжилттай нэмлээ" });
      }
      onSave();
      setOpen(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Хадгалахад алдаа гарлаа" });
    } finally {
      setIsSaving(false);
    }
  };
  
  const trigger = children ? (
    <div onClick={() => setOpen(true)}>{children}</div>
  ) : (
     <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Шинэ төсөл нэмэх
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Төсөл засах' : 'Шинэ төсөл нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Гарчиг</Label>
              <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Зураг</Label>
               <div className='col-span-3 space-y-2'>
                <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" />
                 {imagePreview && (
                    <div className="relative w-full h-40 rounded-md overflow-hidden border">
                       <Image src={imagePreview} alt="Зураг" layout="fill" objectFit="cover" />
                    </div>
                )}
               </div>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">Зургийн hint</Label>
              <Input id="hint" value={formData.hint} onChange={handleChange} className="col-span-3" placeholder="жишээ нь: office building" />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Болих</Button></DialogClose>
                <Button type="submit" disabled={isSaving}>{isSaving ? 'Хадгалж байна...' : 'Хадгалах'}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteProjectDialog({ project, onSucess }: { project: Project, onSucess: () => void }) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProject(project.id!);
            if (project.image) {
                await deleteImage(project.image);
            }
            toast({ title: "Амжилттай устгалаа" });
            onSucess();
            setOpen(false);
        } catch (error) {
            toast({ variant: "destructive", title: "Устгахад алдаа гарлаа" });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Устгахдаа итгэлтэй байна уу?</DialogTitle>
                </DialogHeader>
                <p>Энэ үйлдлийг буцаах боломжгүй.</p>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Болих</Button></DialogClose>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Устгаж байна..." : "Устгах"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}