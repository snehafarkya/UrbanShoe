'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) return (
    <div className="w-24 h-9 rounded-lg bg-border animate-pulse" />
  );

  if (user) return (
    <div className="flex items-center gap-3">
      
      <Button
        onClick={handleLogout}
        variant="outline"
        // size="sm"
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </Button>
      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <UserIcon className="w-4 h-4 text-accent" />
          )}
        </div>
        <span className="max-w-[120px] truncate font-medium text-foreground">
          {user.displayName || user.email?.split('@')[0]}
        </span>
      </div>
    </div>
  );

  return (
    <Button
      onClick={() => router.push('/login')}
      variant={'outline'}
      className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Button>
  );
}