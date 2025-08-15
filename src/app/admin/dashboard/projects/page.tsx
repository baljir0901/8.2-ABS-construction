"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogDescription,
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
      toast({ variant: "destructive", title: "Төслийг татахад алдаа гарлаа" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-card">
       <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
            <Button variant="outline" asChild>
            <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
            </Link>
            </Button>
            <h1 className="text-xl font-bold text-foreground font-headline">Төсөл удирдах</h1>
            <ProjectFormDialog onSave={fetchProjects}>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Шинэ төсөл нэмэх
                </Button>
            </ProjectFormDialog>
        </div>
      </header>
    <main className="container mx-auto p-4 md:p-8">
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
            <Card className="shadow-lg">
            <CardContent className='p-8 text-center text-muted-foreground'>Төсөл олдсонгүй.</CardContent>
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden group shadow-lg">
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
                <CardFooter className="p-4 bg-background flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground font-headline truncate pr-2">{project.title}</h3>
                    <div className='flex items-center space-x-1'>
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
      </main>
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
    description: project?.description || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{project ? 'Төсөл засах' : 'Шинэ төсөл нэмэх'}</DialogTitle>
          <DialogDescription>Төслийн дэлгэрэнгүй мэдээллийг энд оруулна уу.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">Гарчиг</Label>
                    <Input id="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">Дэлгэрэнгүй</Label>
                    <Textarea id="description" value={formData.description} onChange={handleChange} rows={12} required />
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="image">Зураг</Label>
                    <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
                    {imagePreview && (
                        <div className="mt-2 relative w-full h-48 rounded-md overflow-hidden border">
                        <Image src={imagePreview} alt="Зураг" layout="fill" objectFit="cover" />
                        </div>
                    )}
                </div>
                 <div>
                    <Label htmlFor="hint">Зургийн hint</Label>
                    <Input id="hint" value={formData.hint} onChange={handleChange} placeholder="жишээ нь: office building" />
                </div>
            </div>
            <DialogFooter className="md:col-span-2">
                <DialogClose asChild><Button type="button" variant="outline">Болих</Button></DialogClose>
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Устгахдаа итгэлтэй байна уу?</DialogTitle>
                    <DialogDescription>
                        "{project.title}" нэртэй төслийг устгах гэж байна. Энэ үйлдлийг буцаах боломжгүй.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild><Button type="button" variant="outline">Болих</Button></DialogClose>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Устгаж байна..." : "Тийм, устгах"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
