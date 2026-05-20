'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialReviews = [
  { id: 'REV001', guest: 'John Smith', type: 'Hotel', item: 'Grand Plaza Hotel', rating: 5, comment: 'Excellent service and clean rooms!', date: '2026-05-19' },
  { id: 'REV002', guest: 'Sarah Johnson', type: 'Flight', item: 'SkyAir NYC-LAX', rating: 4, comment: 'Good flight, slight delay but overall ok', date: '2026-05-18' },
  { id: 'REV003', guest: 'Mike Brown', type: 'Guide', item: 'Rina Anderson', rating: 5, comment: 'Best tour guide ever! Very informative', date: '2026-05-17' },
  { id: 'REV004', guest: 'Emily Davis', type: 'Hotel', item: 'Seaside Resort', rating: 3, comment: 'Average experience, needs improvement', date: '2026-05-16' },
  { id: 'REV005', guest: 'David Wilson', type: 'Flight', item: 'CloudWings NYC-MIA', rating: 2, comment: 'Flight was cancelled without notice', date: '2026-05-15' },
];

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(initialReviews);
      localStorage.setItem('admin_reviews', JSON.stringify(initialReviews));
    }
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('admin_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  return (
    <AdminShell title="Manage Reviews" subtitle="Monitor and manage customer reviews">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Total Reviews</p>
          <p className="mt-2 text-4xl font-bold text-slate-100">{reviews.length}</p>
          <p className="mt-2 text-xs text-slate-500">All reviews</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">Average Rating</p>
          <p className="mt-2 text-4xl font-bold text-yellow-400">{avgRating}</p>
          <p className="mt-2 text-xs text-slate-500">Out of 5.0</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <p className="text-sm font-medium text-slate-400">5-Star Reviews</p>
          <p className="mt-2 text-4xl font-bold text-green-400">{reviews.filter(r => r.rating === 5).length}</p>
          <p className="mt-2 text-xs text-slate-500">Excellent feedback</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">All Reviews</h2>
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-slate-100">{review.guest}</span>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-slate-400">{review.type}</span>
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-slate-400">{review.item}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-600'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-500">{review.rating}.0 / 5.0</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-slate-500">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-red-400 hover:text-red-300 text-xs font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
