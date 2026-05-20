'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialPayments = [
  { id: 'PAY001', bookingId: 'BK001', guest: 'John Smith', amount: 750, method: 'Credit Card', date: '2026-05-19', status: 'Completed' },
  { id: 'PAY002', bookingId: 'BK002', guest: 'Sarah Johnson', amount: 900, method: 'PayPal', date: '2026-05-18', status: 'Completed' },
  { id: 'PAY003', bookingId: 'BK003', guest: 'Mike Brown', amount: 540, method: 'Debit Card', date: '2026-05-18', status: 'Pending' },
  { id: 'PAY004', bookingId: 'BK004', guest: 'Emily Davis', amount: 1400, method: 'Credit Card', date: '2026-05-15', status: 'Completed' },
  { id: 'PAY005', bookingId: 'BK005', guest: 'David Wilson', amount: 280, method: 'Credit Card', date: '2026-05-17', status: 'Refunded' },
];

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_payments');
    if (saved) {
      setPayments(JSON.parse(saved));
    } else {
      setPayments(initialPayments);
      localStorage.setItem('admin_payments', JSON.stringify(initialPayments));
    }
  }, []);

  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem('admin_payments', JSON.stringify(payments));
    }
  }, [payments]);

  const totalRevenue = payments.reduce((sum, p) => sum + (p.status === 'Completed' ? p.amount : 0), 0);
  const pendingAmount = payments.reduce((sum, p) => sum + (p.status === 'Pending' ? p.amount : 0), 0);
  const refundedAmount = payments.reduce((sum, p) => sum + (p.status === 'Refunded' ? p.amount : 0), 0);

  return (
    <AdminShell title="Manage Payments/Bills" subtitle="Track payments and revenue">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Revenue</p>
          <p className="mt-2 text-4xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
          <p className="mt-2 text-xs text-slate-500">{payments.filter(p => p.status === 'Completed').length} completed</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Pending Amount</p>
          <p className="mt-2 text-4xl font-bold text-yellow-400">${pendingAmount.toLocaleString()}</p>
          <p className="mt-2 text-xs text-slate-500">{payments.filter(p => p.status === 'Pending').length} pending</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Refunded Amount</p>
          <p className="mt-2 text-4xl font-bold text-red-400">${refundedAmount.toLocaleString()}</p>
          <p className="mt-2 text-xs text-slate-500">{payments.filter(p => p.status === 'Refunded').length} refunded</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-slate-300">Payment ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Booking ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Guest</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Method</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{payment.id}</td>
                  <td className="py-3 px-4 text-slate-400">{payment.bookingId}</td>
                  <td className="py-3 px-4 text-slate-300">{payment.guest}</td>
                  <td className="py-3 px-4 text-slate-300">${payment.amount}</td>
                  <td className="py-3 px-4 text-slate-400">{payment.method}</td>
                  <td className="py-3 px-4 text-slate-400">{payment.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      payment.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                      payment.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {payment.status}
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
