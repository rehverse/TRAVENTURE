'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';
import DashboardShell from '../components/DashboardShell';
import BorderGlow from '../components/BorderGlow';
import { StepServices, StepSelection, StepReview, StepPayment, calcPricing } from '../components/BookingSteps';
import { hotelsData, flightsData, guidesData } from '../data/constants';

const stepLabels = ['Services', 'Selection', 'Review', 'Payment', 'Confirmed'];

function formatDate(date) { return date.toISOString().split('T')[0]; }
function addDays(ds, d) { const dt = new Date(ds); dt.setDate(dt.getDate() + d); return formatDate(dt); }

export default function BookPage() {
  const { user, addBooking } = useAuth();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [services, setServices] = useState({ hotel: false, flight: false, guide: false });
  const [selections, setSelections] = useState({ hotel: null, flight: null, guide: null, flightPassengers: 1, flightClass: 'Economy' });
  const [traveler, setTraveler] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', requests: '' });
  const [payment, setPayment] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [booking, setBooking] = useState(null);
  const prefilledRef = useRef(false);

  // Auto-populate from URL query params (when arriving from individual pages)
  useEffect(() => {
    if (prefilledRef.current) return;
    const service = searchParams.get('service');
    if (!service) return;
    prefilledRef.current = true;

    const today = formatDate(new Date());
    const tomorrow = addDays(today, 1);

    if (service === 'hotel') {
      const hotelSlug = searchParams.get('hotel');
      const roomName = searchParams.get('room');
      const checkIn = searchParams.get('checkIn') || today;
      const checkOut = searchParams.get('checkOut') || tomorrow;
      const hotel = hotelsData.find(h => h.slug === hotelSlug);
      if (hotel) {
        const room = hotel.rooms.find(r => r.name === roomName) || hotel.rooms[0];
        setServices({ hotel: true, flight: false, guide: false });
        setSelections(prev => ({
          ...prev,
          hotel: { ...hotel, room, checkIn, checkOut, guests: 2, roomCount: 1, rooms: hotel.rooms },
        }));
        setStep(1);
      }
    } else if (service === 'flight') {
      const flightId = Number(searchParams.get('flight'));
      const passengers = Number(searchParams.get('passengers')) || 1;
      const cabin = searchParams.get('cabin') || 'Economy';
      const tripType = searchParams.get('tripType') || 'One way';
      const departDate = searchParams.get('departDate') || today;
      const returnDate = searchParams.get('returnDate') || tomorrow;
      const flight = flightsData.find(f => f.id === flightId);
      if (flight) {
        setServices({ hotel: false, flight: true, guide: false });
        setSelections(prev => ({
          ...prev,
          flight,
          flightPassengers: passengers,
          flightClass: cabin,
          flightType: tripType,
          flightDepartDate: departDate,
          flightReturnDate: returnDate,
        }));
        setStep(1);
      }
    } else if (service === 'guide') {
      const guideId = searchParams.get('guide');
      const guide = guidesData.find(g => g.id === guideId);
      if (guide) {
        setServices({ hotel: false, flight: false, guide: true });
        setSelections(prev => ({ ...prev, guide }));
        setStep(1);
      }
    }
  }, [searchParams]);

  const anyService = services.hotel || services.flight || services.guide;
  const allSelected = (!services.hotel || selections.hotel) && (!services.flight || selections.flight) && (!services.guide || selections.guide);
  const travelerValid = traveler.name.trim() && traveler.email.trim();
  const paymentValid = payment.name.trim() && payment.number.replace(/\s/g,'').length >= 4 && payment.expiry.trim() && payment.cvv.length >= 3;

  const canNext = [anyService, allSelected, travelerValid, paymentValid, false][step];

  const handlePay = () => {
    const pricing = calcPricing(selections);
    const newBooking = addBooking({
      hotel: selections.hotel ? {
        name: selections.hotel.name, slug: selections.hotel.slug, location: selections.hotel.location,
        image: selections.hotel.image, room: selections.hotel.room?.name, roomDesc: selections.hotel.room?.desc,
        pricePerNight: selections.hotel.room?.price, checkIn: selections.hotel.checkIn, checkOut: selections.hotel.checkOut,
        nights: pricing.nights, roomCount: selections.hotel.roomCount || 1, guests: selections.hotel.guests || 2,
        subtotal: pricing.hotelCost,
      } : null,
      flight: selections.flight ? {
        from: selections.flight.from, to: selections.flight.to, airline: selections.flight.airline,
        time: selections.flight.time, stops: selections.flight.stops, departure: selections.flight.departure,
        arrival: selections.flight.arrival, passengers: selections.flightPassengers || 1,
        cabin: selections.flightClass || 'Economy', subtotal: pricing.flightCost,
        tripType: selections.flightType || 'One way',
        departDate: selections.flightDepartDate || '', returnDate: selections.flightReturnDate || '',
      } : null,
      guide: selections.guide ? {
        name: selections.guide.name, city: selections.guide.city, focus: selections.guide.focus,
        rating: selections.guide.rating, subtotal: pricing.guideCost,
      } : null,
      traveler: { name: traveler.name, email: traveler.email, phone: traveler.phone, requests: traveler.requests },
      payment: { last4: payment.number.replace(/\s/g,'').slice(-4), brand: 'Visa', expiry: payment.expiry },
      subtotal: pricing.subtotal, taxes: pricing.taxes, serviceFee: pricing.serviceFee, totalAmount: pricing.total,
    });
    setBooking(newBooking);
    setStep(4);
  };

  if (step === 4 && booking) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-2xl">
          <BorderGlow edgeSensitivity={25} glowColor="200 90 70" backgroundColor="#0f1115" borderRadius={28} glowRadius={28} glowIntensity={1} coneSpread={30} animated={true} colors={['#2ea2d8','#fbbf24','#38bdf8']}>
            <div className="p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 mb-6">
                <svg className="text-emerald-300" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="font-display text-4xl text-slate-100">Booking Confirmed!</h2>
              <p className="mt-2 text-sm text-slate-400">Your trip has been booked successfully.</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-left space-y-3">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Booking ID</span><span className="text-slate-100 font-mono font-semibold">{booking.id}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Total Paid</span><span className="text-emerald-300 font-bold text-lg">${booking.totalAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Status</span><span className="text-emerald-300 font-semibold">{booking.status}</span></div>
                {booking.hotel && <div className="flex justify-between text-sm"><span className="text-slate-400">Hotel</span><span className="text-slate-200">{booking.hotel.name}</span></div>}
                {booking.flight && <div className="flex justify-between text-sm"><span className="text-slate-400">Flight</span><span className="text-slate-200">{booking.flight.from} → {booking.flight.to}</span></div>}
                {booking.guide && <div className="flex justify-between text-sm"><span className="text-slate-400">Guide</span><span className="text-slate-200">{booking.guide.name}</span></div>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href={`/dashboard/bookings/${booking.id}`} className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">View Booking Details</Link>
                <Link href="/dashboard" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40">Go to Dashboard</Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {/* Progress bar */}
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          {stepLabels.slice(0, 4).map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i < step ? 'bg-emerald-500/20 text-emerald-300' : i === step ? 'bg-[#2ea2d8] text-white' : 'bg-white/10 text-slate-500'}`}>
                {i < step ? '✓' : i + 1}
              </span>
              <span className={`text-xs font-semibold hidden sm:inline ${i === step ? 'text-slate-100' : 'text-slate-500'}`}>{label}</span>
              {i < 3 && <div className={`hidden sm:block w-12 lg:w-20 h-px ${i < step ? 'bg-emerald-500/40' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
        <h1 className="font-display text-3xl text-slate-100">{stepLabels[step]}</h1>
      </div>

      {step === 0 && <StepServices services={services} setServices={setServices} />}
      {step === 1 && <StepSelection services={services} selections={selections} setSelections={setSelections} />}
      {step === 2 && <StepReview selections={selections} services={services} traveler={traveler} setTraveler={setTraveler} />}
      {step === 3 && <StepPayment payment={payment} setPayment={setPayment} />}

      {step < 4 && (
        <div className="flex items-center justify-between">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed">
            Back
          </button>
          {step === 3 ? (
            <button onClick={handlePay} disabled={!canNext}
              className="rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed">
              Pay ${calcPricing(selections).total}
            </button>
          ) : (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext}
              className="rounded-full bg-[#2ea2d8] px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed">
              Continue
            </button>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
