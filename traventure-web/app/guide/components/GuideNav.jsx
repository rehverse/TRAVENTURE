'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const guideNav = [
  { label: 'Overview', href: '/guide' },
  { label: 'Availability', href: '/guide/availability' },
  { label: 'Requests', href: '/guide/requests' },
  { label: 'Profile', href: '/guide/profile' },
  { label: 'Earnings', href: '/guide/earnings' },
  { label: 'Schedule', href: '/guide/schedule' },
];

export default function GuideNav() {
  const pathname = usePathname();

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Guide workspace</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {guideNav.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-[#2ea2d8] text-white'
                  : 'border border-white/20 bg-white/10 text-slate-300 hover:border-white/40'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
