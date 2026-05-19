'use client';

import { useAuth } from '../components/AuthContext';
import AuthGateway from '../components/AuthGateway';
import GuideHeader from './components/GuideHeader';

export default function GuideLayout({ children }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#2ea2d8]" />
          <p className="text-sm text-slate-400">Loading your guide workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthGateway />;

  return (
    <>
      <GuideHeader />
      {children}
    </>
  );
}
