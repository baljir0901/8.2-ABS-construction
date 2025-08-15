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
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-md space-y-4">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
          </div>
        </div>
    );
  }

  const isLoginPage = pathname === '/admin/login';
  if(user || isLoginPage){
      return <>{children}</>;
  }
  
  return null;
}
