'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';
import PageShell from '../../components/PageShell';
import BorderGlow from '../../components/BorderGlow';

const hotelsBySlug = {
  'coral-dune-retreat': {
    name: 'Coral Dune Retreat',
    location: 'Bali, Indonesia',
    overview: 'Oceanfront suites with shaded terraces, sunrise yoga, and private lagoon access.',
    details: [
      'Wake up to soft sea breezes and direct boardwalk access to the shoreline.',
      'The resort spa blends Balinese rituals with saltwater hydrotherapy.',
    ],
    baseRate: 182,
    amenities: ['Ocean-view rooms', 'Lagoon access', 'Private plunge pools', 'Flexible late checkout', 'Daily breakfast tray'],
    rooms: [
      { name: 'King Deluxe', desc: 'Sleeps 2 • Ocean view', price: 212 },
      { name: 'Sunset Suite', desc: 'Sleeps 3 • Balcony', price: 268 },
      { name: 'Lagoon Villa', desc: 'Sleeps 4 • Private pool', price: 325 },
    ],
    reviews: [
      { name: 'Amara J.', stay: '4 nights', rating: 4.9, quote: 'Quiet mornings, thoughtful staff, and the lagoon suite felt private and luxe.' },
      { name: 'Jin P.', stay: '3 nights', rating: 4.8, quote: 'The sunrise yoga deck is the highlight. Perfect for a reset trip.' },
    ],
  },
  'harborlight-suites': {
    name: 'Harborlight Suites',
    location: 'Lisbon, Portugal',
    overview: 'Boutique rooms overlooking the Tagus River with rooftop dining and tram access.',
    details: [
      'A short walk from the Alfama district, with sunset views over the docks.',
      'Local artisans curate the in-room welcome treats each week.',
    ],
    baseRate: 139,
    amenities: ['Rooftop dining', 'Riverfront lounges', 'Local tram access', 'Concierge desks', 'Express check-in'],
    rooms: [
      { name: 'Twin Bed Loft', desc: 'Sleeps 2 • City view', price: 152 },
      { name: 'River King', desc: 'Sleeps 2 • River view', price: 198 },
      { name: 'Family Studio', desc: 'Sleeps 4 • Sofa bed', price: 236 },
    ],
    reviews: [
      { name: 'Derek L.', stay: '2 nights', rating: 4.7, quote: 'Rooftop dining was unreal. Great location for wandering the waterfront.' },
      { name: 'Rosa M.', stay: '5 nights', rating: 4.9, quote: 'Every detail felt tailored. The tram stop outside made the city effortless.' },
    ],
  },
  'sage-stone-lodge': {
    name: 'Sage & Stone Lodge',
    location: 'Marrakesh, Morocco',
    overview: 'A serene riad-style lodge with courtyard pools, lantern-lit lounges, and spa rituals.',
    details: [
      'Traditional tilework meets modern comfort in the inner courtyard suites.',
      'Evening tea service pairs with live oud music twice a week.',
    ],
    baseRate: 211,
    amenities: ['Courtyard pools', 'Lantern-lit lounge', 'Spa rituals', 'Mint tea service', 'Airport transfer'],
    rooms: [
      { name: 'Courtyard King', desc: 'Sleeps 2 • Riad view', price: 228 },
      { name: 'Twin Bed Terrace', desc: 'Sleeps 2 • Terrace', price: 246 },
      { name: 'Riad Family Suite', desc: 'Sleeps 4 • Two rooms', price: 312 },
    ],
    reviews: [
      { name: 'Leila B.', stay: '3 nights', rating: 4.9, quote: 'Peaceful, elegant, and full of warm hospitality. The spa was a dream.' },
      { name: 'Arun S.', stay: '4 nights', rating: 4.8, quote: 'Loved the lantern-lit lounge. Perfect for slow evenings.' },
    ],
  },
  'northwind-cabin': {
    name: 'Northwind Cabin',
    location: 'Reykjavik, Iceland',
    overview: 'Glass-roof cabins with aurora wakeup calls, geothermal dips, and Arctic breakfasts.',
    details: [
      'Cabins are positioned for northern light viewing without leaving your bed.',
      'A private geothermal pool is available for late-night soaks.',
    ],
    baseRate: 165,
    amenities: ['Aurora wakeup calls', 'Geothermal dips', 'Arctic breakfast bar', 'Private fire pits', 'Warm gear rental'],
    rooms: [
      { name: 'Aurora Queen', desc: 'Sleeps 2 • Glass roof', price: 182 },
      { name: 'Twin Bed Cabin', desc: 'Sleeps 2 • Fire pit', price: 194 },
      { name: 'Northern Suite', desc: 'Sleeps 3 • Hot tub', price: 255 },
    ],
    reviews: [
      { name: 'Jonas K.', stay: '2 nights', rating: 4.8, quote: 'Saw the lights from our cabin and the breakfast spread was fantastic.' },
      { name: 'Tessa G.', stay: '3 nights', rating: 4.9, quote: 'Cozy, quiet, and the geothermal pool sealed the deal.' },
    ],
  },
  'citrus-bay-hotel': {
    name: 'Citrus Bay Hotel',
    location: 'Sicily, Italy',
    overview: 'Seaside rooms with citrus gardens, sunset aperitivos, and quick ferry access.',
    details: [
      'Sip aperitivos on the terrace while the marina lights up at dusk.',
      'Daily citrus garden tours end with a chef tasting menu.',
    ],
    baseRate: 154,
    amenities: ['Citrus gardens', 'Sunset aperitivos', 'Ferry access', 'Family suites', 'Beach club passes'],
    rooms: [
      { name: 'King Deluxe', desc: 'Sleeps 2 • Garden view', price: 172 },
      { name: 'Twin Bed Coast', desc: 'Sleeps 2 • Balcony', price: 186 },
      { name: 'Bay Family Suite', desc: 'Sleeps 4 • Two beds', price: 244 },
    ],
    reviews: [
      { name: 'Mateo R.', stay: '4 nights', rating: 4.7, quote: 'Perfect base for island hopping. The citrus garden is unforgettable.' },
      { name: 'Nina P.', stay: '3 nights', rating: 4.8, quote: 'Sunset drinks were a ritual for us. Loved the ferry convenience.' },
    ],
  },
  'juniper-city-loft': {
    name: 'Juniper City Loft',
    location: 'Kyoto, Japan',
    overview: 'Minimalist lofts near Nishiki Market with tea rituals and curated artisan guides.',
    details: [
      'Walkable to temples, the lofts blend modern lines with warm cedar accents.',
      'Evenings include tea rituals led by rotating local hosts.',
    ],
    baseRate: 196,
    amenities: ['Tea ritual kits', 'Market access', 'Artisan guides', 'Soft tatami bedding', 'Evening turndown'],
    rooms: [
      { name: 'Tatami King', desc: 'Sleeps 2 • Tatami mats', price: 214 },
      { name: 'Twin Bed Loft', desc: 'Sleeps 2 • City view', price: 206 },
      { name: 'Zen Corner Suite', desc: 'Sleeps 3 • Tea nook', price: 268 },
    ],
    reviews: [
      { name: 'Rina S.', stay: '2 nights', rating: 4.9, quote: 'So serene, and the tea ritual felt authentic and unhurried.' },
      { name: 'Kenji T.', stay: '5 nights', rating: 4.8, quote: 'Great location, quiet nights, and a thoughtful room design.' },
    ],
  },
};

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function calcNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

export default function HotelDetailsPage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const routeParams = useParams();
  const { isLoggedIn } = useAuth();
  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);

  const slug = params?.id || routeParams?.id || 'hotel';
  const hotel = hotelsBySlug[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    location: 'Destination',
    overview: 'A thoughtfully designed stay with local touches, flexible check-in, and concierge service.',
    details: ['Local touches meet modern comfort in every room.', 'Flexible check-in and concierge service included.'],
    baseRate: 180,
    amenities: ['Concierge desk', 'Flexible late checkout', 'Daily breakfast tray', 'Airport transfer', 'Local experiences'],
    rooms: [
      { name: 'King Deluxe', desc: 'Sleeps 2 • Premium linens', price: 192 },
      { name: 'Twin Bed Suite', desc: 'Sleeps 2 • Lounge area', price: 208 },
      { name: 'Family Residence', desc: 'Sleeps 4 • Two rooms', price: 256 },
    ],
    reviews: [
      { name: 'Guest Review', stay: '2 nights', rating: 4.8, quote: 'Warm service and a quiet, restful room.' },
    ],
  };

  const rooms = useMemo(() => hotel.rooms || [], [hotel.rooms]);

  const [selectedRoom, setSelectedRoom] = useState(rooms[0] || null);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  const minCheckout = useMemo(() => addDays(checkIn, 1), [checkIn]);
  const nights = useMemo(() => calcNights(checkIn, checkOut), [checkIn, checkOut]);
  const activeRoom = selectedRoom || rooms[0];
  const total = useMemo(() => (activeRoom ? activeRoom.price * nights : 0), [activeRoom, nights]);

  useEffect(() => {
    setSelectedRoom(rooms[0] || null);
  }, [rooms]);

  const handleReserve = () => {
    if (isLoggedIn) {
      // Navigate to booking flow with hotel pre-selected
      const hotelParam = encodeURIComponent(slug);
      const roomParam = encodeURIComponent(activeRoom?.name || '');
      router.push(`/book?service=hotel&hotel=${hotelParam}&room=${roomParam}&checkIn=${checkIn}&checkOut=${checkOut}`);
    } else {
      const next = encodeURIComponent(pathname);
      router.push(`/login?reason=booking&next=${next}`);
    }
  };

  return (
    <PageShell
      title={hotel.name}
      subtitle={hotel.location}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-xl">
          <p className="text-sm font-semibold text-slate-100 uppercase tracking-widest text-[#2ea2d8] mb-4">Overview</p>
          <p className="text-base text-slate-300 leading-relaxed">{hotel.overview}</p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            {hotel.details.map(detail => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
          
          <p className="text-sm font-semibold text-slate-100 uppercase tracking-widest text-[#2ea2d8] mt-8 mb-4">Amenities</p>
          <div className="grid gap-3 text-sm text-slate-300">
            {hotel.amenities.map(amenity => (
              <div key={amenity} className="flex items-center gap-3">
                <svg className="text-emerald-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          <p className="text-sm font-semibold text-slate-100 uppercase tracking-widest text-[#2ea2d8] mt-10 mb-4">Guest reviews</p>
          <div className="grid gap-4">
            {hotel.reviews.map(review => (
              <div key={`${review.name}-${review.stay}`} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-100">{review.name}</p>
                  <span className="text-xs font-semibold text-emerald-300">{review.rating} star</span>
                </div>
                <p className="text-xs text-slate-500">{review.stay}</p>
                <p className="mt-2 text-sm text-slate-300">{review.quote}</p>
              </div>
            ))}
          </div>
        </div>
        
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
          <div className="p-6">
            <p className="text-sm font-semibold text-slate-100 uppercase tracking-widest text-[#2ea2d8] mb-4">Stay details</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Check in</label>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={event => {
                    const value = event.target.value;
                    setCheckIn(value);
                    if (checkOut <= value) {
                      setCheckOut(addDays(value, 1));
                    }
                  }}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Check out</label>
                <input
                  type="date"
                  min={minCheckout}
                  value={checkOut}
                  onChange={event => setCheckOut(event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{nights} night stay</span>
                <span className="font-semibold text-slate-100">${activeRoom ? activeRoom.price : 0} / night</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                <span>Total estimate</span>
                <span className="text-lg font-semibold text-emerald-300">${total}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Taxes and service fees shown at checkout.</p>
            </div>

            <p className="text-sm font-semibold text-slate-100 uppercase tracking-widest text-[#2ea2d8] mt-8 mb-4">Select a Room</p>
            <div className="grid gap-4">
              {rooms.map(room => (
                <div key={room.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 p-4 transition hover:bg-black/60">
                  <div>
                    <p className="text-lg font-semibold text-slate-100">{room.name}</p>
                    <p className="text-sm text-slate-400">{room.desc} • ${room.price}/night</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(room)}
                    className={`rounded-full px-6 py-2 text-sm font-semibold transition shrink-0 ${activeRoom && activeRoom.name === room.name ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {activeRoom && activeRoom.name === room.name ? 'Selected' : 'Choose'}
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReserve}
              className="mt-6 w-full rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {isLoggedIn ? 'Reserve Now' : 'Sign in to reserve'}
            </button>
          </div>
        </BorderGlow>
      </div>
    </PageShell>
  );
}
