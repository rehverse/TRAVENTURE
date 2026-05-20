'use client';

import AdminShell from '../components/AdminShell';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    avgRating: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // Read data from localStorage
    try {
      const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const bookings = JSON.parse(localStorage.getItem('admin_bookings') || '[]');
      const payments = JSON.parse(localStorage.getItem('admin_payments') || '[]');
      const reviews = JSON.parse(localStorage.getItem('admin_reviews') || '[]');

      // Calculate stats
      const totalRevenue = payments.reduce((sum, p) => sum + (p.status === 'Completed' ? p.amount : 0), 0);
      const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

      setStats({
        totalUsers: users.length,
        totalBookings: bookings.length,
        totalRevenue,
        avgRating,
      });

      setRecentBookings(bookings.slice(0, 6));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }, []);

  return (
    <AdminShell title="Admin Dashboard" subtitle="Welcome to the Traventure Admin Panel">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Users</p>
          <p className="mt-2 text-4xl font-bold text-slate-100">{stats.totalUsers}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Bookings</p>
          <p className="mt-2 text-4xl font-bold text-slate-100">{stats.totalBookings}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Revenue</p>
          <p className="mt-2 text-4xl font-bold text-slate-100">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Avg Rating</p>
          <p className="mt-2 text-4xl font-bold text-slate-100">{stats.avgRating}</p>
          <p className="mt-2 text-xs text-yellow-400">Out of 5.0</p>
        </div>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Guest</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Booking Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="py-3 px-4 text-slate-400">{booking.id}</td>
                    <td className="py-3 px-4 text-slate-300">{booking.guest}</td>
                    <td className="py-3 px-4 text-slate-400">{booking.type}</td>
                    <td className="py-3 px-4 text-slate-300">${booking.amount}</td>
                    <td className="py-3 px-4 text-slate-400">{booking.bookingDate || booking.date || booking.createdAt || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
      )}
    </AdminShell>
  );
}
