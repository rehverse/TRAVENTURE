'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import BorderGlow from '../components/BorderGlow';
import PageShell from '../components/PageShell';

const flightsData = [
  { id: 1, from: 'New York (JFK)', to: 'Paris (CDG)', time: '7h 15m', departure: '22:00', arrival: '11:15', price: 428, airline: 'Air Solace', stops: 'Nonstop' },
  { id: 2, from: 'London (LHR)', to: 'Cape Town (CPT)', time: '11h 05m', departure: '18:30', arrival: '07:35', price: 589, airline: 'Skylink', stops: '1 Stop' },
  { id: 3, from: 'Singapore (SIN)', to: 'Seoul (ICN)', time: '6h 10m', departure: '09:00', arrival: '16:10', price: 311, airline: 'Aurora Air', stops: 'Nonstop' },
  { id: 4, from: 'Toronto (YYZ)', to: 'Lima (LIM)', time: '8h 45m', departure: '14:20', arrival: '23:05', price: 476, airline: 'NovaJet', stops: 'Nonstop' },
  { id: 5, from: 'Dubai (DXB)', to: 'Tokyo (HND)', time: '9h 50m', departure: '02:40', arrival: '17:30', price: 522, airline: 'Emirates', stops: 'Nonstop' },
  { id: 6, from: 'Sydney (SYD)', to: 'Auckland (AKL)', time: '3h 05m', departure: '11:15', arrival: '16:20', price: 249, airline: 'Qantas', stops: 'Nonstop' },
  { id: 7, from: 'Dhaka (DAC)', to: 'Kuala Lumpur (KUL)', time: '4h 00m', departure: '23:10', arrival: '05:10', price: 345, airline: 'AirAsia', stops: 'Nonstop' },
  { id: 8, from: 'Dhaka (DAC)', to: 'Kuala Lumpur (KUL)', time: '3h 55m', departure: '02:05', arrival: '08:00', price: 410, airline: 'Malaysia Airlines', stops: 'Nonstop' },
  { id: 9, from: 'Los Angeles (LAX)', to: 'Tokyo (HND)', time: '11h 20m', departure: '12:40', arrival: '17:10', price: 612, airline: 'Pacifica', stops: 'Nonstop' },
  { id: 10, from: 'Chicago (ORD)', to: 'Lisbon (LIS)', time: '8h 35m', departure: '19:55', arrival: '10:30', price: 455, airline: 'Atlantic Breeze', stops: '1 Stop' },
  { id: 11, from: 'Paris (CDG)', to: 'Reykjavik (KEF)', time: '3h 40m', departure: '07:20', arrival: '09:00', price: 298, airline: 'Nordic Air', stops: 'Nonstop' },
  { id: 12, from: 'Seoul (ICN)', to: 'Bangkok (BKK)', time: '5h 35m', departure: '21:10', arrival: '01:45', price: 339, airline: 'Lotus Sky', stops: 'Nonstop' },
  { id: 13, from: 'Dubai (DXB)', to: 'Cape Town (CPT)', time: '9h 55m', departure: '01:15', arrival: '10:10', price: 564, airline: 'Desert Wing', stops: 'Nonstop' },
  { id: 14, from: 'Lisbon (LIS)', to: 'Marrakesh (RAK)', time: '2h 15m', departure: '15:00', arrival: '16:15', price: 187, airline: 'Atlas Air', stops: 'Nonstop' },
  { id: 15, from: 'New York (JFK)', to: 'Los Angeles (LAX)', time: '6h 05m', departure: '08:15', arrival: '11:20', price: 298, airline: 'Skyline', stops: 'Nonstop' },
  { id: 16, from: 'Singapore (SIN)', to: 'Sydney (SYD)', time: '7h 55m', departure: '23:40', arrival: '10:35', price: 489, airline: 'Southern Cross', stops: 'Nonstop' },
];

const airports = [
  'New York (JFK)',
  'Los Angeles (LAX)',
  'Chicago (ORD)',
  'London (LHR)',
  'Paris (CDG)',
  'Lisbon (LIS)',
  'Reykjavik (KEF)',
  'Bangkok (BKK)',
  'Marrakesh (RAK)',
  'Dubai (DXB)',
  'Tokyo (HND)',
  'Singapore (SIN)',
  'Seoul (ICN)',
  'Sydney (SYD)',
  'Auckland (AKL)',
  'Toronto (YYZ)',
  'Lima (LIM)',
  'Cape Town (CPT)',
  'Dhaka (DAC)',
  'Kuala Lumpur (KUL)',
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

function getCode(airport) {
  const match = airport.match(/\(([^)]+)\)/);
  return match ? match[1] : airport;
}

function toMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = String(Math.floor(normalized / 60)).padStart(2, '0');
  const minutes = String(normalized % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function addMinutes(timeString, minutesToAdd) {
  return fromMinutes(toMinutes(timeString) + minutesToAdd);
}

function getClassMultiplier(cabin) {
  if (cabin === 'Business') return 1.6;
  if (cabin === 'First Class') return 2.2;
  return 1;
}

function getTripMultiplier(tripType) {
  return tripType === 'Round trip' ? 1.85 : 1;
}

export default function FlightsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);

  const [search, setSearch] = useState({
    from: '',
    to: '',
    departDate: today,
    returnDate: tomorrow,
    passengers: 1,
    type: 'Round trip',
    class: 'Economy',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setSearch(prev => {
      const nextState = { ...prev, [key]: value };
      if (key === 'type' && value === 'One way') {
        nextState.returnDate = addDays(prev.departDate, 1);
      }
      if (key === 'departDate' && prev.returnDate <= value) {
        nextState.returnDate = addDays(value, 1);
      }
      return nextState;
    });
  };

  const handleSwap = () => {
    setSearch(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.type === 'Round trip' && search.returnDate <= search.departDate) {
      setSearch(prev => ({ ...prev, returnDate: addDays(prev.departDate, 1) }));
    }
    setSubmitted(true);
  };

  const handleBook = (flight) => {
    if (isLoggedIn) {
      // Navigate to booking flow with flight pre-selected
      const flightParam = encodeURIComponent(flight.id);
      const pax = search.passengers;
      const cabin = encodeURIComponent(search.class);
      const tripType = encodeURIComponent(search.type);
      const depart = search.departDate;
      const ret = search.returnDate;
      router.push(`/book?service=flight&flight=${flightParam}&passengers=${pax}&cabin=${cabin}&tripType=${tripType}&departDate=${depart}&returnDate=${ret}`);
    } else {
      const next = encodeURIComponent(pathname);
      router.push(`/login?reason=booking&next=${next}`);
    }
  };

  const minReturnDate = useMemo(() => addDays(search.departDate, 1), [search.departDate]);

  const filteredFlights = flightsData.filter(f => {
    if (!submitted) return true;
    const fromMatch = !search.from || f.from.toLowerCase().includes(search.from.toLowerCase());
    const toMatch = !search.to || f.to.toLowerCase().includes(search.to.toLowerCase());
    return fromMatch && toMatch;
  });

  return (
    <PageShell
      title="Find Your Flight"
      subtitle="Search and compare the best fares for your next adventure."
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
          <div className="p-6">
            <div className="mb-4 flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
              <select value={search.type} onChange={handleChange('type')} className="bg-transparent outline-none cursor-pointer">
                <option className="bg-[#0f1115]">Round trip</option>
                <option className="bg-[#0f1115]">One way</option>
              </select>
              <select value={search.passengers} onChange={handleChange('passengers')} className="bg-transparent outline-none cursor-pointer">
                {[1, 2, 3, 4, 5, 6].map(count => (
                  <option key={count} value={count} className="bg-[#0f1115]">
                    {count} {count === 1 ? 'adult' : 'adults'}
                  </option>
                ))}
              </select>
              <select value={search.class} onChange={handleChange('class')} className="bg-transparent outline-none cursor-pointer">
                <option className="bg-[#0f1115]">Economy</option>
                <option className="bg-[#0f1115]">Business</option>
                <option className="bg-[#0f1115]">First Class</option>
              </select>
            </div>
            
            <form onSubmit={handleSearch} className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] items-end">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">From</label>
                <input 
                  type="text" 
                  placeholder="Departure city" 
                  value={search.from}
                  onChange={handleChange('from')}
                  list="airport-options"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
                />
              </div>
              
              <button 
                type="button" 
                onClick={handleSwap}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-white/10 bg-black/40 text-slate-400 hover:text-white hover:border-[#2ea2d8] transition shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
              </button>
              
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">To</label>
                <input 
                  type="text" 
                  placeholder="Destination city" 
                  value={search.to}
                  onChange={handleChange('to')}
                  list="airport-options"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Departure</label>
                <input 
                  type="date" 
                  min={today}
                  value={search.departDate}
                  onChange={handleChange('departDate')}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition [color-scheme:dark]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Return</label>
                <input 
                  type="date" 
                  min={minReturnDate}
                  value={search.returnDate}
                  onChange={handleChange('returnDate')}
                  disabled={search.type !== 'Round trip'}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#2ea2d8] transition [color-scheme:dark] disabled:opacity-40"
                />
              </div>
              
              <button 
                type="submit"
                className="h-[46px] rounded-xl bg-[#2ea2d8] px-8 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 shrink-0"
              >
                Search
              </button>
            </form>
            <datalist id="airport-options">
              {airports.map(airport => (
                <option key={airport} value={airport} />
              ))}
            </datalist>
          </div>
        </BorderGlow>
      </div>

      <div className="grid gap-4">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No flights found matching your search.</div>
        ) : (
          filteredFlights.map(flight => (
            (() => {
              const cabinMultiplier = getClassMultiplier(search.class);
              const tripMultiplier = getTripMultiplier(search.type);
              const passengerCount = Number(search.passengers) || 1;
              const totalPrice = Math.round(flight.price * cabinMultiplier * tripMultiplier * passengerCount);
              const departLabel = search.departDate || 'Select date';
              const returnLabel = search.returnDate || 'Select date';
              const returnDepart = addMinutes(flight.departure, 150);
              const returnArrive = addMinutes(flight.arrival, 180);
              return (
            <div key={flight.id} className="rounded-2xl border border-white/10 bg-[#0f1115] p-5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-1 flex-col gap-4 min-w-[280px]">
                  <div className="text-left">
                    <p className="text-base font-bold text-slate-100">{flight.airline}</p>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid items-center gap-6 [grid-template-columns:120px_1fr_120px]">
                      <div className="text-left">
                        <p className="text-lg font-bold text-slate-100 tabular-nums">{flight.departure}</p>
                        <p className="text-xs text-slate-400">{flight.from}</p>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="w-full relative flex items-center justify-center">
                          <div className="absolute w-full h-[1px] bg-white/20"></div>
                          <span className="z-10 bg-[#0f1115] px-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">{departLabel}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{flight.time} • {flight.stops}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-100 tabular-nums">{flight.arrival}</p>
                        <p className="text-xs text-slate-400">{flight.to}</p>
                      </div>
                    </div>

                    {search.type === 'Round trip' && (
                      <div className="grid items-center gap-6 [grid-template-columns:120px_1fr_120px]">
                        <div className="text-left">
                          <p className="text-lg font-bold text-slate-100 tabular-nums">{returnDepart}</p>
                          <p className="text-xs text-slate-400">{flight.to}</p>
                        </div>
                        <div className="flex flex-1 flex-col items-center">
                          <div className="w-full relative flex items-center justify-center">
                            <div className="absolute w-full h-[1px] bg-white/20"></div>
                            <span className="z-10 bg-[#0f1115] px-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">{returnLabel}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{flight.time} • {flight.stops}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-100 tabular-nums">{returnArrive}</p>
                          <p className="text-xs text-slate-400">{flight.from}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 sm:pl-6 sm:border-l border-white/10 w-full sm:w-auto">
                  <p className="text-2xl font-bold text-slate-100">${totalPrice}</p>
                  <p className="text-xs text-slate-400">{search.class} · {search.passengers} {Number(search.passengers) === 1 ? 'passenger' : 'passengers'}</p>
                  <button
                    onClick={() => handleBook(flight)}
                    className="rounded-full bg-[#2ea2d8] px-6 py-2 text-sm font-semibold text-white transition hover:brightness-110 w-full sm:w-auto"
                  >
                    {isLoggedIn ? 'Book Now' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
              );
            })()
          ))
        )}
      </div>
    </PageShell>
  );
}
