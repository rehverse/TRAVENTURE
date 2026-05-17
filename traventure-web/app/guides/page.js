'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import BorderGlow from '../components/BorderGlow';
import PageShell from '../components/PageShell';

const guides = [
  { name: 'Leila B.', city: 'Marrakesh', focus: 'Hidden riads & tea houses', rating: 4.95 },
  { name: 'Jonas K.', city: 'Reykjavik', focus: 'Fjord trails & winter lights', rating: 4.9 },
  { name: 'Rina S.', city: 'Kyoto', focus: 'Temple mornings & artisan lanes', rating: 4.92 },
  { name: 'Mateo R.', city: 'Lisbon', focus: 'Food markets & surf culture', rating: 4.88 },
  { name: 'Aya M.', city: 'Cairo', focus: 'Museum nights & river walks', rating: 4.86 },
  { name: 'Kai L.', city: 'Auckland', focus: 'Harbor hikes & cafe routes', rating: 4.84 },
];

export default function GuidesPage() {
  const [city, setCity] = useState('All locations');

  const cities = useMemo(() => {
    const unique = new Set(guides.map(guide => guide.city));
    return ['All locations', ...Array.from(unique).sort()];
  }, []);

  const filteredGuides = useMemo(() => {
    if (city === 'All locations') return guides;
    return guides.filter(guide => guide.city === city);
  }, [city]);

  return (
    <PageShell
      title="Guide Listing"
      subtitle="Book private sessions or join curated group experiences with locals."
    >
      <div className="max-w-md">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Place</label>
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none"
        >
          {cities.map(option => (
            <option key={option} value={option} className="bg-[#0f1115]">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map(guide => (
          <BorderGlow
            key={guide.name}
            edgeSensitivity={25}
            glowColor="40 80 80"
            backgroundColor="#0f1115"
            borderRadius={22}
            glowRadius={22}
            glowIntensity={0.8}
            coneSpread={30}
            animated={false}
            colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
          >
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{guide.city}</p>
              <p className="mt-2 text-lg font-semibold text-slate-100">{guide.name}</p>
              <p className="text-sm text-slate-400">{guide.focus}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-300">{guide.rating} star</p>
                <Link
                  href="/login?reason=booking&next=/guides"
                  className="rounded-full bg-[#2ea2d8] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                >
                  Book guide
                </Link>
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>
    </PageShell>
  );
}
