'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

function randomDate(startDays, endDays) {
  const now = new Date();
  const start = new Date(now.getTime() - startDays * 86400000);
  const end = new Date(now.getTime() + endDays * 86400000);
  const random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return random.toISOString().split('T')[0];
}

const initialBookings = [
  { id: 'BK001', guest: 'John Smith', type: 'Hotel', item: 'Grand Plaza - Room 101', checkIn: '2026-06-01', checkOut: '2026-06-05', bookingDate: randomDate(15, 0), amount: 750, status: 'Confirmed' },
  { id: 'BK002', guest: 'Sarah Johnson', type: 'Flight', item: 'SkyAir NYC-LAX', date: '2026-06-10', passengers: 2, bookingDate: randomDate(10, 0), amount: 900, status: 'Confirmed' },
  { id: 'BK003', guest: 'Mike Brown', type: 'Guide', item: 'Rina Anderson - Paris Tour', date: '2026-06-15', duration: '3 days', bookingDate: randomDate(20, 0), amount: 540, status: 'Pending' },
  { id: 'BK004', guest: 'Emily Davis', type: 'Hotel', item: 'Seaside Resort - Room 201', checkIn: '2026-05-20', checkOut: '2026-05-24', bookingDate: randomDate(25, 0), amount: 1400, status: 'Completed' },
  { id: 'BK005', guest: 'David Wilson', type: 'Flight', item: 'CloudWings NYC-MIA', date: '2026-07-01', passengers: 1, bookingDate: randomDate(8, 0), amount: 280, status: 'Confirmed' },
  { id: 'BK006', guest: 'Lisa Chen', type: 'Guide', item: 'Marco Rossi - Rome History', date: '2026-06-20', duration: '2 days', bookingDate: randomDate(5, 0), amount: 360, status: 'Pending' },
];

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_bookings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all bookings have a bookingDate
      const withDates = parsed.map(b => ({
        ...b,
        bookingDate: b.bookingDate || b.createdAt?.split('T')[0] || randomDate(30, 0),
      }));
      setBookings(withDates);
    } else {
      setBookings(initialBookings);
      localStorage.setItem('admin_bookings', JSON.stringify(initialBookings));
    }
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('admin_bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  return (
    <AdminShell title="Manage Bookings" subtitle="View all customer bookings">
      <div className="mb-4 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
          <span className="text-sm font-medium text-slate-400">Total Bookings:</span>
          <span className="text-lg font-bold text-slate-100">{bookings.length}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
          <span className="text-sm font-medium text-slate-400">Confirmed:</span>
          <span className="text-lg font-bold text-green-400">{bookings.filter(b => b.status === 'Confirmed').length}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2">
          <span className="text-sm font-medium text-slate-400">Pending:</span>
          <span className="text-lg font-bold text-yellow-400">{bookings.filter(b => b.status === 'Pending').length}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-slate-300">Booking ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Guest</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Item</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Booking Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{booking.id}</td>
                  <td className="py-3 px-4 text-slate-300">{booking.guest}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      booking.type === 'Hotel' ? 'bg-purple-500/20 text-purple-300' :
                      booking.type === 'Flight' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {booking.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{booking.item}</td>
                  <td className="py-3 px-4 text-slate-400">{booking.bookingDate}</td>
                  <td className="py-3 px-4 text-slate-300">${booking.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-300' :
                      booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      booking.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
