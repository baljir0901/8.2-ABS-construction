"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Newspaper, Briefcase } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  return (
    <div className="p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Админы хяналтын самбар</h1>
        <Button onClick={handleLogout} variant="outline">Гарах</Button>
      </header>
      <main>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Тавтай морилно уу, Админ!</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Та энэ хэсгээс вебсайтынхаа контентыг удирдах боломжтой.</p>
                {user && <p className="mt-4 text-sm text-muted-foreground">Нэвтэрсэн хэрэглэгч: {user.email}</p>}
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="text-primary" />
                Мэдээ удирдах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Шинэ мэдээ нэмэх, одоо байгаа мэдээг засах, устгах.</p>
              <Button asChild>
                <Link href="/admin/dashboard/news">Мэдээ рүү оч</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="text-primary" />
                Төсөл удирдах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Хэрэгжүүлсэн төслүүдээ нэмэх, засах, устгах.</p>
               <Button asChild>
                <Link href="/admin/dashboard/projects">Төсөл рүү оч</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
