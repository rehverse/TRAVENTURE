'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import BorderGlow from './components/BorderGlow';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';

const heroHighlights = [
  'Curated stays with flexible dates',
  'Easy flight rebooking without fees',
];

const destinationImages = {
  Bali: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  Lisbon: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
  Kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  Reykjavik: 'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=1200&q=80',
  Marrakesh: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80',
  Sicily: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  Paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  CapeTown: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  Seoul: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80',
  Lima: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
};

const destinationOptions = [
  { name: 'Bali', country: 'Indonesia', image: destinationImages.Bali },
  { name: 'Lisbon', country: 'Portugal', image: destinationImages.Lisbon },
  { name: 'Kyoto', country: 'Japan', image: destinationImages.Kyoto },
  { name: 'Reykjavik', country: 'Iceland', image: destinationImages.Reykjavik },
  { name: 'Marrakesh', country: 'Morocco', image: destinationImages.Marrakesh },
  { name: 'Sicily', country: 'Italy', image: destinationImages.Sicily },
  { name: 'Paris', country: 'France', image: destinationImages.Paris },
  { name: 'Cape Town', country: 'South Africa', image: destinationImages.CapeTown },
  { name: 'Seoul', country: 'South Korea', image: destinationImages.Seoul },
  { name: 'Lima', country: 'Peru', image: destinationImages.Lima },
];

const hotelExamples = [
  {
    name: 'Coral Dune Retreat',
    location: 'Bali, Indonesia',
    destination: 'Bali',
    price: 182,
    rating: 4.9,
    tag: 'Oceanfront',
    image: destinationImages.Bali,
  },
  {
    name: 'Harborlight Suites',
    location: 'Lisbon, Portugal',
    destination: 'Lisbon',
    price: 139,
    rating: 4.8,
    tag: 'Boutique',
    image: destinationImages.Lisbon,
  },
  {
    name: 'Sage & Stone Lodge',
    location: 'Marrakesh, Morocco',
    destination: 'Marrakesh',
    price: 211,
    rating: 4.7,
    tag: 'Riad',
    image: destinationImages.Marrakesh,
  },
  {
    name: 'Northwind Cabin',
    location: 'Reykjavik, Iceland',
    destination: 'Reykjavik',
    price: 165,
    rating: 4.8,
    tag: 'Aurora-ready',
    image: destinationImages.Reykjavik,
  },
  {
    name: 'Citrus Bay Hotel',
    location: 'Sicily, Italy',
    destination: 'Sicily',
    price: 154,
    rating: 4.6,
    tag: 'Family stay',
    image: destinationImages.Sicily,
  },
  {
    name: 'Juniper City Loft',
    location: 'Kyoto, Japan',
    destination: 'Kyoto',
    price: 196,
    rating: 4.9,
    tag: 'Cultural',
    image: destinationImages.Kyoto,
  },
];

const flightExamples = [
  {
    route: 'New York (JFK) -> Paris (CDG)',
    duration: '7h 15m',
    price: 428,
    airline: 'Air Solace',
    destination: 'Paris',
    image: destinationImages.Paris,
  },
  {
    route: 'London (LHR) -> Cape Town (CPT)',
    duration: '11h 05m',
    price: 589,
    airline: 'Skylink',
    destination: 'Cape Town',
    image: destinationImages.CapeTown,
  },
  {
    route: 'Singapore (SIN) -> Seoul (ICN)',
    duration: '6h 10m',
    price: 311,
    airline: 'Aurora Air',
    destination: 'Seoul',
    image: destinationImages.Seoul,
  },
  {
    route: 'Toronto (YYZ) -> Lima (LIM)',
    duration: '8h 45m',
    price: 476,
    airline: 'NovaJet',
    destination: 'Lima',
    image: destinationImages.Lima,
  },
];

const guideExamples = [
  {
    name: 'Leila B.',
    focus: 'Hidden riads & tea houses',
    city: 'Marrakesh',
    rating: 4.95,
  },
  {
    name: 'Jonas K.',
    focus: 'Fjord trails & winter lights',
    city: 'Reykjavik',
    rating: 4.9,
  },
  {
    name: 'Rina S.',
    focus: 'Temple mornings & artisan lanes',
    city: 'Kyoto',
    rating: 4.92,
  },
  {
    name: 'Mateo R.',
    focus: 'Food markets & surf culture',
    city: 'Lisbon',
    rating: 4.88,
  },
];

const reviewExamples = [
  {
    quote: 'The hotel picks felt boutique without the usual price spike. Loved the daily itinerary cards.',
    name: 'Amara J.',
    trip: 'Bali - 6 nights',
  },
  {
    quote: 'Flights synced perfectly with the stay. Rebooking was instant when my meeting moved.',
    name: 'Derek L.',
    trip: 'Lisbon - 4 nights',
  },
  {
    quote: 'The local guide was the highlight. We discovered cafes I would never find alone.',
    name: 'Nina P.',
    trip: 'Kyoto - 5 nights',
  },
];

const faqExamples = [
  {
    question: 'Can I bundle hotels and flights together?',
    answer: 'Yes. Bundles unlock lower nightly rates and flexible date swaps at no extra cost.',
  },
  {
    question: 'Are guide sessions private?',
    answer: 'Most are private by default. You can choose to open slots to other travelers when booking.',
  },
  {
    question: 'Do you support multi-city trips?',
    answer: 'Multi-city stays are supported for hotels and flights. We recommend booking at least 3 nights per city.',
  },
  {
    question: 'How does the calendar booking work?',
    answer: 'Select check-in and check-out dates. We automatically keep the checkout date after check-in.',
  },
];

const stats = [
  { label: 'Curated stays', value: '200+' },
  { label: 'Flexible rebooks', value: '24/7' },
  { label: 'Local guides', value: '1,100+' },
  { label: 'Traveler rating', value: '4.92' },
];


function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);

  const [form, setForm] = useState({
    destination: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 3,
  });
  const [submitted, setSubmitted] = useState(false);

  const minCheckout = useMemo(() => addDays(form.checkIn, 1), [form.checkIn]);

  const filteredHotels = useMemo(() => {
    if (!submitted) return [];
    if (!form.destination.trim()) return hotelExamples;
    return hotelExamples.filter(hotel =>
      hotel.location.toLowerCase().includes(form.destination.toLowerCase()) ||
      hotel.name.toLowerCase().includes(form.destination.toLowerCase())
    );
  }, [submitted, form.destination]);

  const handleChange = key => event => {
    const value = event.target.value;
    setForm(prev => {
      const nextState = { ...prev, [key]: value };
      if (key === 'checkIn') {
        const nextCheckout = prev.checkOut <= value ? addDays(value, 1) : prev.checkOut;
        nextState.checkOut = nextCheckout;
      }
      return nextState;
    });
  };

  const handleGuests = event => {
    const value = Number(event.target.value);
    setForm(prev => ({ ...prev, guests: Math.max(1, value) }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    if (form.checkOut <= form.checkIn) {
      setForm(prev => ({ ...prev, checkOut: addDays(prev.checkIn, 1) }));
      return;
    }
  };

  const handleBook = () => {
    const next = encodeURIComponent(pathname);
    router.push(`/login?reason=booking&next=${next}`);
  };

  const bookingHref = `/login?reason=booking&next=${encodeURIComponent(pathname)}`;

  const handleHotelSelect = (name) => {
    setForm(prev => ({ ...prev, destination: name }));
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-black/60 p-6 text-white shadow-2xl sm:p-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${destinationImages.Bali})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                  Plan, Book, Roam
                </p>
                <h1 className="font-display text-4xl leading-tight tracking-wide sm:text-5xl lg:text-6xl">
                  Let&apos;s explore the world
                  <span className="block text-[#ffd24a]">together</span>
                </h1>
                <p className="max-w-xl text-sm text-white/90 sm:text-base">
                  Book trips and explore new destinations with ease from anywhere. Combine stays, flights, and
                  local experiences in one simple dashboard.
                </p>
                <div className="flex flex-wrap gap-3">
                  {heroHighlights.map(item => (
                    <span
                      key={item}
                      className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 lg:-mt-4">
                {stats.map(stat => (
                  <div key={stat.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative -mt-10">
            <BorderGlow
              edgeSensitivity={25}
              glowColor="200 90 70"
              backgroundColor="#0b0b0f"
              borderRadius={32}
              glowRadius={32}
              glowIntensity={1}
              coneSpread={30}
              animated={false}
              colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
              className="shadow-xl"
            >
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 p-5 sm:grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_auto]"
              >
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                    Hotel name
                  </label>
                  <input
                    type="text"
                    placeholder="Hotel name or destination"
                    value={form.destination}
                    onChange={handleChange('destination')}
                    className="text-sm font-semibold text-slate-100 outline-none bg-transparent placeholder:text-slate-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                    Check in
                  </label>
                  <div className="flex items-center gap-2">
                    <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
                    <input
                      type="date"
                      min={today}
                      value={form.checkIn}
                      onChange={handleChange('checkIn')}
                      className="text-sm font-semibold text-slate-100 outline-none bg-transparent [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                    Check out
                  </label>
                  <div className="flex items-center gap-2">
                    <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
                    <input
                      type="date"
                      min={minCheckout}
                      value={form.checkOut}
                      onChange={handleChange('checkOut')}
                      className="text-sm font-semibold text-slate-100 outline-none bg-transparent [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.guests}
                    onChange={handleGuests}
                    className="text-sm font-semibold text-slate-100 outline-none bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Search
                </button>
              </form>
            </BorderGlow>
          </div>

          {submitted && (
            <div className="mt-10 grid gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Search results
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {(filteredHotels.length ? filteredHotels : hotelExamples.slice(0, 3)).map(hotel => (
                  <BorderGlow
                    key={hotel.name}
                    edgeSensitivity={20}
                    glowColor="200 90 70"
                    backgroundColor="#0f1115"
                    borderRadius={24}
                    glowRadius={24}
                    glowIntensity={0.9}
                    coneSpread={30}
                    animated={false}
                    colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => handleHotelSelect(hotel.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          handleHotelSelect(hotel.name);
                        }
                      }}
                    >
                      <img
                        src={hotel.image}
                        alt={`${hotel.destination} hotel`}
                        className="h-36 w-full rounded-2xl object-cover"
                      />
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {hotel.tag}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-100">{hotel.name}</p>
                      <p className="text-sm text-slate-400">{hotel.location}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-100">${hotel.price}/night</span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleBook();
                          }}
                          className="rounded-full bg-[#2ea2d8] px-3 py-1 text-xs font-semibold text-white"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Hotels</p>
                  <h2 className="font-display text-2xl text-slate-100">Explore stays</h2>
                </div>
                <Link href="/hotels" className="text-sm font-semibold text-[#2ea2d8]">
                  View hotels
                </Link>
              </div>
              <div className="mt-6 grid gap-4">
                {hotelExamples.slice(0, 3).map(hotel => (
                  <div
                    key={hotel.name}
                    className="flex gap-4 rounded-2xl bg-black/30 p-4 border border-white/10 cursor-pointer"
                    onClick={() => handleHotelSelect(hotel.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        handleHotelSelect(hotel.name);
                      }
                    }}
                  >
                    <img
                      src={hotel.image}
                      alt={`${hotel.destination} stay`}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{hotel.name}</h3>
                      <p className="text-xs text-slate-400">{hotel.location}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="text-[#2ea2d8] font-semibold">${hotel.price}/night</span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleBook();
                          }}
                          className="text-white hover:text-emerald-300 transition"
                        >
                          Book now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Flights</p>
                  <h2 className="font-display text-2xl text-slate-100">Compare flights</h2>
                </div>
                <Link href="/flights" className="text-sm font-semibold text-[#2ea2d8]">
                  View flights
                </Link>
              </div>
              <div className="mt-6 grid gap-4">
                {flightExamples.slice(0, 3).map(flight => (
                  <div key={flight.route} className="flex gap-4 rounded-2xl bg-black/30 p-4 border border-white/10">
                    <img
                      src={flight.image}
                      alt={`${flight.destination} skyline`}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{flight.route}</h3>
                      <p className="text-xs text-slate-400">{flight.duration} &bull; {flight.airline}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="text-[#2ea2d8] font-semibold">${flight.price}</span>
                        <Link
                          href={bookingHref}
                          className="text-white hover:text-emerald-300 transition"
                        >
                          Book now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Featured stays</p>
              <h2 className="font-display text-3xl text-slate-100">Handpicked hotels for every mood</h2>
            </div>
            <Link href="/hotels" className="text-sm font-semibold text-[#2ea2d8]">
              View all hotels
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hotelExamples.map(hotel => (
              <BorderGlow
                key={hotel.name}
                edgeSensitivity={25}
                glowColor="200 90 70"
                backgroundColor="#0f1115"
                borderRadius={26}
                glowRadius={26}
                glowIntensity={0.9}
                coneSpread={30}
                animated={false}
                colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => handleHotelSelect(hotel.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleHotelSelect(hotel.name);
                    }
                  }}
                >
                  <img
                    src={hotel.image}
                    alt={`${hotel.destination} hotel`}
                    className="h-40 w-full rounded-3xl object-cover"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                      {hotel.tag}
                    </span>
                    <span className="text-xs font-semibold text-emerald-300">{hotel.rating} star</span>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-slate-100">{hotel.name}</p>
                  <p className="text-sm text-slate-400">{hotel.location}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-100">${hotel.price}/night</span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBook();
                      }}
                      className="rounded-full bg-[#2ea2d8] px-3 py-1 text-xs font-semibold text-white"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Flights</p>
              <h2 className="font-display text-3xl text-slate-100">Routes people are booking right now</h2>
              <div className="mt-5 space-y-4">
                {flightExamples.map(flight => (
                  <div
                    key={flight.route}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{flight.route}</p>
                      <p className="text-xs text-slate-400">{flight.duration} - {flight.airline}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-100">${flight.price}</span>
                  </div>
                ))}
              </div>
              <Link href="/flights" className="mt-6 inline-flex text-sm font-semibold text-[#2ea2d8]">
                Browse all flights
              </Link>
            </div>
            <BorderGlow
              edgeSensitivity={25}
              glowColor="200 90 70"
              backgroundColor="#0f1115"
              borderRadius={28}
              glowRadius={28}
              glowIntensity={1}
              coneSpread={30}
              animated={false}
              colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
            >
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Guides</p>
                <h2 className="font-display text-3xl text-slate-100">Local experts with real stories</h2>
                <div className="mt-5 grid gap-4">
                  {guideExamples.map(guide => (
                    <div key={guide.name} className="rounded-2xl bg-black/30 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-100">{guide.name}</p>
                      <p className="text-xs text-slate-400">{guide.city} - {guide.focus}</p>
                      <p className="text-xs font-semibold text-emerald-300">{guide.rating} star</p>
                    </div>
                  ))}
                </div>
                <Link href="/guides" className="mt-6 inline-flex text-sm font-semibold text-[#2ea2d8]">
                  Meet the guides
                </Link>
              </div>
            </BorderGlow>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {reviewExamples.map(review => (
              <BorderGlow
                key={review.name}
                edgeSensitivity={20}
                glowColor="200 90 70"
                backgroundColor="#0f1115"
                borderRadius={24}
                glowRadius={24}
                glowIntensity={0.9}
                coneSpread={30}
                animated={false}
                colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
              >
                <div className="p-5">
                  <p className="text-sm text-slate-300">"{review.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-slate-100">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.trip}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">FAQ</p>
            <h2 className="font-display text-3xl text-slate-100">Answers before you book</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {faqExamples.map(faq => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm font-semibold text-slate-100">{faq.question}</p>
                  <p className="mt-2 text-sm text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
