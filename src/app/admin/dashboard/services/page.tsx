"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getServices, addService, updateService, deleteService, Service } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Edit, Trash2, PlusCircle, Building2 } from 'lucide-react';

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const servicesData = await getServices();
      setServices(servicesData);
    } catch (error) {
      toast({ variant: "destructive", title: "Үйлчилгээг татахад алдаа гарлаа" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getIconComponent = (iconName: string): React.ElementType => {
      const Icon = (LucideIcons as any)[iconName];
      return Icon || Building2;
  };

  return (
    <div className="min-h-screen bg-card">
       <header className="bg-background shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-20 px-4">
            <Button variant="outline" asChild>
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
                </Link>
            </Button>
            <h1 className="text-xl font-bold text-foreground font-headline">Үйлчилгээ удирдах</h1>
            <ServiceFormDialog onSave={fetchServices}>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Шинэ үйлчилгээ нэмэх
                </Button>
            </ServiceFormDialog>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <Card className='shadow-lg'>
            <CardContent className='p-0'>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Гарчиг</TableHead>
                    <TableHead>Эрэмбэ</TableHead>
                    <TableHead className='text-right'>Үйлдэл</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">Уншиж байна...</TableCell>
                    </TableRow>
                ) : services.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">Үйлчилгээ олдсонгүй.</TableCell>
                    </TableRow>
                ) : (
                    services.map((service) => {
                      const IconComponent = getIconComponent(service.icon);
                      return (
                        <TableRow key={service.id}>
                            <TableCell><IconComponent className="h-6 w-6 text-primary" /></TableCell>
                            <TableCell className="font-medium">{service.title}</TableCell>
                            <TableCell>{service.order}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <ServiceFormDialog service={service} onSave={fetchServices}>
                                <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                </Button>
                              </ServiceFormDialog>
                              <DeleteServiceDialog service={service} onSuccess={fetchServices} />
                            </TableCell>
                        </TableRow>
                      )
                    })
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}


function ServiceFormDialog({ service, onSave, children }: { service?: Service, onSave: () => void, children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    title: service?.title || '',
    icon: service?.icon || 'Building2',
    description: service?.description || '',
    order: service?.order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'order' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (service?.id) {
        await updateService(service.id, formData);
        toast({ title: "Амжилттай шинэчиллээ" });
      } else {
        await addService(formData);
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{service ? 'Үйлчилгээ засах' : 'Шинэ үйлчилгээ нэмэх'}</DialogTitle>
          <DialogDescription>Үйлчилгээний дэлгэрэнгүй мэдээллийг энд оруулна уу.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 py-4">
                <div>
                  <Label htmlFor="title">Гарчиг</Label>
                  <Input id="title" value={formData.title} onChange={handleChange} required />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="icon">Icon Нэр</Label>
                        <Input id="icon" value={formData.icon} onChange={handleChange} required placeholder=" жишээ нь: Wrench" />
                        <p className="text-xs text-muted-foreground mt-1">
                          <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">Lucide Icons</a>-оос нэр харна уу.
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="order">Эрэмбэ</Label>
                        <Input id="order" type="number" value={formData.order} onChange={handleChange} required />
                    </div>
                 </div>
                 <div>
                    <Label htmlFor="description">Тайлбар</Label>
                    <Textarea id="description" value={formData.description} onChange={handleChange} required rows={4}/>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">Болих</Button></DialogClose>
                <Button type="submit" disabled={isSaving}>{isSaving ? 'Хадгалж байна...' : 'Хадгалах'}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteServiceDialog({ service, onSuccess }: { service: Service, onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteService(service.id!);
            toast({ title: "Амжилттай устгалаа" });
            onSuccess();
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
                        "{service.title}" гарчигтай үйлчилгээг устгах гэж байна. Энэ үйлдлийг буцаах боломжгүй.
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
