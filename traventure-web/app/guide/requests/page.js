'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

// Static demo requests (shown alongside real bookings)
const staticRequests = [
  {
    id: 'REQ-2041',
    traveler: 'Jenna M.',
    city: 'Lisbon',
    date: 'Jun 12, 2026',
    time: '09:00',
    groupSize: 2,
    focus: 'Food markets and river walk',
    payout: 120,
  },
  {
    id: 'REQ-2044',
    traveler: 'Malik S.',
    city: 'Marrakesh',
    date: 'Jun 14, 2026',
    time: '16:30',
    groupSize: 3,
    focus: 'Souks and artisan studios',
    payout: 150,
  },
  {
    id: 'REQ-2049',
    traveler: 'Olivia R.',
    city: 'Kyoto',
    date: 'Jun 16, 2026',
    time: '08:15',
    groupSize: 4,
    focus: 'Temple sunrise walk',
    payout: 165,
  },
];

const staticAssigned = [
  {
    id: 'TOUR-3012',
    traveler: 'Rina P.',
    city: 'Kyoto',
    date: 'Jun 03, 2026',
    time: '13:00',
    groupSize: 4,
    payout: 185,
    status: 'Confirmed',
  },
  {
    id: 'TOUR-3017',
    traveler: 'Lucas G.',
    city: 'Lisbon',
    date: 'Jun 06, 2026',
    time: '10:45',
    groupSize: 2,
    payout: 140,
    status: 'Confirmed',
  },
];

function getStatusColor(status) {
  if (status === 'Confirmed') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (status === 'Pending') return 'bg-[#2ea2d8]/20 text-[#2ea2d8] border-[#2ea2d8]/30';
  if (status === 'Declined') return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-white/10 text-slate-300 border-white/10';
}

function formatBookingDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return 'N/A'; }
}

export default function GuideRequestsPage() {
  const { getGuideBookings, updateGuideBooking } = useAuth();
  const [requests, setRequests] = useState(staticRequests);
  const [assigned, setAssigned] = useState(staticAssigned);
  const [actionNote, setActionNote] = useState('');

  // Load real user bookings from localStorage
  const [realBookings, setRealBookings] = useState([]);

  useEffect(() => {
    const guideBookings = getGuideBookings();
    setRealBookings(guideBookings);
  }, [getGuideBookings]);

  const pendingReal = realBookings.filter(b => b.status === 'Pending');
  const confirmedReal = realBookings.filter(b => b.status === 'Confirmed');

  // Accept a static request
  const handleAccept = (request) => {
    setRequests(prev => prev.filter(item => item.id !== request.id));
    setAssigned(prev => [
      {
        ...request,
        id: `TOUR-${Date.now().toString(36).toUpperCase()}`,
        status: 'Confirmed',
      },
      ...prev,
    ]);
    setActionNote(`Accepted ${request.traveler}'s request.`);
    setTimeout(() => setActionNote(''), 3000);
  };

  // Reject a static request
  const handleReject = (request) => {
    setRequests(prev => prev.filter(item => item.id !== request.id));
    setActionNote(`Declined ${request.traveler}'s request.`);
    setTimeout(() => setActionNote(''), 3000);
  };

  // Accept a real user booking
  const handleAcceptReal = (booking) => {
    updateGuideBooking(booking.id, { status: 'Confirmed' });
    setRealBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Confirmed' } : b));
    setActionNote(`Accepted ${booking.travelerName}'s booking request.`);
    setTimeout(() => setActionNote(''), 3000);
  };

  // Reject a real user booking
  const handleRejectReal = (booking) => {
    updateGuideBooking(booking.id, { status: 'Declined' });
    setRealBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Declined' } : b));
    setActionNote(`Declined ${booking.travelerName}'s booking request.`);
    setTimeout(() => setActionNote(''), 3000);
  };

  return (
    <DashboardShell
      title="Booking Requests"
      subtitle="Accept or decline tour requests and manage confirmed tours."
    >
      {actionNote && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          {actionNote}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Pending requests</p>
            <span className="text-xs text-slate-500">{requests.length + pendingReal.length} pending</span>
          </div>

          {/* Real user booking requests */}
          {pendingReal.length > 0 && (
            <div className="grid gap-4">
              {pendingReal.map(booking => (
                <BorderGlow
                  key={booking.id}
                  edgeSensitivity={20}
                  glowColor="200 90 70"
                  backgroundColor="#0f1115"
                  borderRadius={22}
                  glowRadius={22}
                  glowIntensity={0.7}
                  coneSpread={30}
                  animated={false}
                  colors={['#fbbf24', '#2ea2d8', '#38bdf8']}
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor('Pending')}`}>
                            Pending
                          </span>
                          <span className="rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/30 px-2 py-0.5 text-[10px] font-semibold text-[#fbbf24]">
                            User Booking
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-100">{booking.travelerName} - {booking.guideCity}</p>
                        <p className="text-xs text-slate-400">{formatBookingDate(booking.createdAt)}</p>
                        {booking.travelerEmail && (
                          <p className="text-xs text-slate-500 mt-1">{booking.travelerEmail}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-100">${booking.payout}</p>
                        <p className="text-xs text-slate-400">Estimated payout</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1">{booking.guideFocus}</span>
                      <span className="rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/10 px-3 py-1 text-[#fbbf24]">Booked via Traventure</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleAcceptReal(booking)}
                        className="rounded-full bg-[#2ea2d8] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectReal(booking)}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/40"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </BorderGlow>
              ))}
            </div>
          )}

          {/* Static demo requests */}
          {requests.length === 0 && pendingReal.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-slate-400 text-sm">No new requests right now.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {requests.map(request => (
                <BorderGlow
                  key={request.id}
                  edgeSensitivity={20}
                  glowColor="200 90 70"
                  backgroundColor="#0f1115"
                  borderRadius={22}
                  glowRadius={22}
                  glowIntensity={0.7}
                  coneSpread={30}
                  animated={false}
                  colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
                >
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor('Pending')}`}>
                          Pending
                        </span>
                        <p className="mt-3 text-sm font-semibold text-slate-100">{request.traveler} - {request.city}</p>
                        <p className="text-xs text-slate-400">{request.date} at {request.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-100">${request.payout}</p>
                        <p className="text-xs text-slate-400">Estimated payout</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1">{request.groupSize} guests</span>
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1">{request.focus}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleAccept(request)}
                        className="rounded-full bg-[#2ea2d8] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(request)}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-white/40"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </BorderGlow>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Assigned tours</p>
            <span className="text-xs text-slate-500">{assigned.length + confirmedReal.length} confirmed</span>
          </div>

          {(assigned.length === 0 && confirmedReal.length === 0) ? (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-slate-400 text-sm">No confirmed tours yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* Real confirmed bookings */}
              {confirmedReal.map(booking => (
                <div key={booking.id} className="rounded-2xl border border-emerald-500/20 bg-[#0f1115] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor('Confirmed')}`}>
                          Confirmed
                        </span>
                        <span className="rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/30 px-2 py-0.5 text-[10px] font-semibold text-[#fbbf24]">
                          User Booking
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-100">{booking.travelerName} - {booking.guideCity}</p>
                      <p className="text-xs text-slate-400">{formatBookingDate(booking.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-100">${booking.payout}</p>
                      <p className="text-xs text-slate-400">Payout</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Static assigned tours */}
              {assigned.map(tour => (
                <div key={tour.id} className="rounded-2xl border border-white/10 bg-[#0f1115] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(tour.status)}`}>
                        {tour.status}
                      </span>
                      <p className="mt-3 text-sm font-semibold text-slate-100">{tour.traveler} - {tour.city}</p>
                      <p className="text-xs text-slate-400">{tour.date} at {tour.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-100">${tour.payout}</p>
                      <p className="text-xs text-slate-400">Payout</p>
                      <p className="text-xs text-slate-500 mt-1">{tour.groupSize} guests</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
