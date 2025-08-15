"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Newspaper, Briefcase, LogOut, UserCircle, Wrench } from "lucide-react";
import Logo from "@/components/logo";

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-card">
      <header className="bg-background shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <Logo />
            <div className="flex items-center gap-4">
               {user && (
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserCircle className="h-5 w-5" />
                    <span>{user.email}</span>
                 </div>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Гарах
                </Button>
            </div>
        </div>
      </header>
      <main className="p-4 md:p-8 container mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline text-foreground">Хяналтын самбар</h1>
            <p className="text-muted-foreground">Вебсайтынхаа контентыг эндээс удирдах боломжтой.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Newspaper className="h-6 w-6 text-primary" />
                </div>
                Мэдээ удирдах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Шинэ мэдээ нэмэх, одоо байгаа мэдээг засах, устгах.</CardDescription>
              <Button asChild>
                <Link href="/admin/dashboard/news">Мэдээ рүү очих</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                </div>
                Төсөл удирдах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Хэрэгжүүлсэн төслүүдээ нэмэх, засах, устгах.</CardDescription>
               <Button asChild>
                <Link href="/admin/dashboard/projects">Төсөл рүү очих</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Wrench className="h-6 w-6 text-primary" />
                </div>
                Үйлчилгээ удирдах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Үйлчилгээний хэсгийн мэдээллийг удирдах.</CardDescription>
               <Button asChild>
                <Link href="/admin/dashboard/services">Үйлчилгээ рүү очих</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
