"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === '/admin/login';

    if (!user && !isLoginPage) {
      router.replace('/admin/login');
    } else if (user && isLoginPage) {
      router.replace('/admin/dashboard');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
     return (
        <div className="flex flex-col min-h-screen bg-card">
            <header className="bg-background shadow-sm">
                <div className="container mx-auto flex h-20 items-center justify-between px-4">
                    <Skeleton className="h-10 w-36" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-8">
                 <div className="mb-8">
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-96 mt-2" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                 </div>
            </main>
        </div>
    );
  }

  const isLoginPage = pathname === '/admin/login';
  if(user || isLoginPage){
      return <>{children}</>;
  }
  
  return null;
}
