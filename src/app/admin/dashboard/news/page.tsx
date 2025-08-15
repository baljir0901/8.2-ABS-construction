"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getNews, addNews, updateNews, deleteNews, NewsArticle, uploadImage, deleteImage } from '@/lib/firebase';
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
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, PlusCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const newsData = await getNews();
      setNews(newsData);
    } catch (error) {
      toast({ variant: "destructive", title: "Мэдээг татахад алдаа гарлаа" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-4 md:p-8">
       <header className="flex items-center justify-between mb-8">
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Мэдээ удирдах</h1>
        <NewsFormDialog onSave={fetchNews} />
      </header>

      <Card>
        <CardContent className='p-0'>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Гарчиг</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead className='text-right'>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Уншиж байна...</TableCell>
                </TableRow>
              ) : news.length === 0 ? (
                <TableRow>
                   <TableCell colSpan={3} className="text-center">Мэдээ олдсонгүй.</TableCell>
                </TableRow>
              ) : (
                news.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <NewsFormDialog article={article} onSave={fetchNews}>
                         <Button variant="ghost" size="icon">
                           <Edit className="h-4 w-4" />
                         </Button>
                       </NewsFormDialog>
                       <DeleteNewsDialog article={article} onSucess={fetchNews} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


function NewsFormDialog({ article, onSave, children }: { article?: NewsArticle, onSave: () => void, children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(article?.image || null);
  const [formData, setFormData] = useState<Omit<NewsArticle, 'id' | 'image'>>({
    title: article?.title || '',
    date: article?.date || new Date().toISOString().split('T')[0],
    summary: article?.summary || '',
    hint: article?.hint || '',
    featured: article?.featured || false,
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let imageUrl = article?.image || '';
      
      // If a new image is selected, upload it
      if (imageFile) {
        // If there was an old image, delete it from storage
        if (article?.image) {
          await deleteImage(article.image);
        }
        imageUrl = await uploadImage(imageFile);
      }

      const newsData = { ...formData, image: imageUrl };

      if (article?.id) {
        await updateNews(article.id, newsData);
        toast({ title: "Амжилттай шинэчиллээ" });
      } else {
        if (!imageUrl) {
            toast({ variant: "destructive", title: "Зураг оруулна уу." });
            setIsSaving(false);
            return;
        }
        await addNews(newsData);
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
      Шинэ мэдээ нэмэх
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{article ? 'Мэдээ засах' : 'Шинэ мэдээ нэмэх'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Гарчиг</Label>
              <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Огноо</Label>
              <Input id="date" type="date" value={formData.date} onChange={handleChange} className="col-span-3" required />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="summary" className="text-right pt-2">Хураангуй</Label>
              <Textarea id="summary" value={formData.summary} onChange={handleChange} className="col-span-3" required />
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
              <Input id="hint" value={formData.hint} onChange={handleChange} className="col-span-3" placeholder=" жишээ нь: award ceremony" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">Онцлох</Label>
              <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleCheckboxChange} />
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

function DeleteNewsDialog({ article, onSucess }: { article: NewsArticle, onSucess: () => void }) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNews(article.id!);
            if (article.image) {
                await deleteImage(article.image);
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