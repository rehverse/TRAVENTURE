'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import BorderGlow from '../components/BorderGlow';
import PageShell from '../components/PageShell';

const hotelsData = [
  {
    slug: 'coral-dune-retreat',
    name: 'Coral Dune Retreat',
    location: 'Bali, Indonesia',
    description: 'Oceanfront suites with shaded terraces, sunrise yoga, and private lagoon access.',
    price: 182,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'harborlight-suites',
    name: 'Harborlight Suites',
    location: 'Lisbon, Portugal',
    description: 'Boutique rooms overlooking the Tagus River with rooftop dining and tram access.',
    price: 139,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'sage-stone-lodge',
    name: 'Sage & Stone Lodge',
    location: 'Marrakesh, Morocco',
    description: 'A serene riad-style lodge with courtyard pools, lantern-lit lounges, and spa rituals.',
    price: 211,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'northwind-cabin',
    name: 'Northwind Cabin',
    location: 'Reykjavik, Iceland',
    description: 'Glass-roof cabins with aurora wakeup calls, geothermal dips, and Arctic breakfasts.',
    price: 165,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'citrus-bay-hotel',
    name: 'Citrus Bay Hotel',
    location: 'Sicily, Italy',
    description: 'Seaside rooms with citrus gardens, sunset aperitivos, and quick ferry access.',
    price: 154,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'juniper-city-loft',
    name: 'Juniper City Loft',
    location: 'Kyoto, Japan',
    description: 'Minimalist lofts near Nishiki Market with tea rituals and curated artisan guides.',
    price: 196,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function HotelsPage() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleBook = (hotel) => {
    if (isLoggedIn) {
      const hotelParam = encodeURIComponent(hotel.slug);
      router.push(`/book?service=hotel&hotel=${hotelParam}`);
    } else {
      router.push(`/login?reason=booking&next=/hotels/${hotel.slug}`);
    }
  };

  const filteredHotels = hotelsData.filter(hotel => 
    hotel.name.toLowerCase().includes(search.toLowerCase()) || 
    hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell
      title="Hotel Listing"
      subtitle="Browse curated stays with flexible cancellation and instant upgrades."
    >
      <div className="mb-10">
        <BorderGlow
          edgeSensitivity={20}
          glowColor="40 80 80"
          backgroundColor="#0f1115"
          borderRadius={24}
          glowRadius={24}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
        >
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <input 
              type="text" 
              placeholder="Search by hotel name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
            />
          </div>
        </BorderGlow>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="text-center py-10 text-slate-400">No hotels found matching your search.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map(hotel => (
            <BorderGlow
              key={hotel.slug}
              edgeSensitivity={25}
              glowColor="40 80 80"
              backgroundColor="#0f1115"
              borderRadius={24}
              glowRadius={24}
              glowIntensity={0.9}
              coneSpread={30}
              animated={false}
              colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
            >
              <div className="p-4">
                <img
                  src={hotel.image}
                  alt={`${hotel.location} hotel`}
                  className="h-48 w-full rounded-2xl object-cover"
                />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{hotel.location}</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{hotel.name}</p>
                <p className="text-sm text-slate-400 mt-2">{hotel.description}</p>
                <p className="text-sm text-slate-400 mt-1">${hotel.price} / night</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-300">{hotel.rating} star</span>
                  <div className="flex items-center gap-2">
                    <Link href={`/hotels/${hotel.slug}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40">
                      View details
                    </Link>
                    <button
                      onClick={() => handleBook(hotel)}
                      className="rounded-full bg-[#2ea2d8] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      {isLoggedIn ? 'Book Now' : 'Book'}
                    </button>
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      )}
    </PageShell>
  );
}
