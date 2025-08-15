"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  const user = auth.currentUser;

  return (
    <div className="p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Админы хяналтын самбар</h1>
        <Button onClick={handleLogout} variant="outline">Гарах</Button>
      </header>
      <main>
        <Card>
            <CardHeader>
                <CardTitle>Тавтай морилно уу, Админ!</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Та админы хяналтын самбарт амжилттай нэвтэрлээ.</p>
                {user && <p className="mt-4 text-sm text-muted-foreground">Нэвтэрсэн хэрэглэгч: {user.email}</p>}
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
