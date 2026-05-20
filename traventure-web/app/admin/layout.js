'use client';

import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, ready, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#2ea2d8]" />
          <p className="text-sm text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100">Access Denied</h1>
          <p className="mt-2 text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Just pass children through — each admin page wraps itself in AdminShell
  return children;
}
