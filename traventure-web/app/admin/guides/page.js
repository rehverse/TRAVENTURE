'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialGuides = [
  { id: 'G001', name: 'Rina Anderson', city: 'Paris', focus: 'History & Culture', rating: 4.9, bookings: 42, earnings: 8500 },
  { id: 'G002', name: 'Marco Rossi', city: 'Rome', focus: 'Art & Architecture', rating: 4.7, bookings: 35, earnings: 7200 },
  { id: 'G003', name: 'Sarah Chen', city: 'Tokyo', focus: 'Local Experiences', rating: 4.8, bookings: 28, earnings: 5800 },
  { id: 'G004', name: 'James Murphy', city: 'Dublin', focus: 'Beer & Culture', rating: 4.6, bookings: 22, earnings: 4500 },
];

export default function ManageGuides() {
  const [guides, setGuides] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    focus: '',
    rating: 4.5,
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_guides');
    if (saved) {
      setGuides(JSON.parse(saved));
    } else {
      setGuides(initialGuides);
      localStorage.setItem('admin_guides', JSON.stringify(initialGuides));
    }
  }, []);

  useEffect(() => {
    if (guides.length > 0) {
      localStorage.setItem('admin_guides', JSON.stringify(guides));
    }
  }, [guides]);

  const handleAddGuide = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.focus) {
      alert('Please fill in all fields');
      return;
    }
    const newGuide = {
      id: 'G' + String(guides.length + 1).padStart(3, '0'),
      ...formData,
      bookings: 0,
      earnings: 0,
    };
    setGuides([...guides, newGuide]);
    setFormData({ name: '', city: '', focus: '', rating: 4.5 });
    setShowAddForm(false);
  };

  const handleDeleteGuide = (guideId) => {
    setGuides(guides.filter(g => g.id !== guideId));
  };

  return (
    <AdminShell title="Manage Guides" subtitle="View and manage tour guides">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-6 rounded-lg bg-[#2ea2d8] px-4 py-2 font-semibold text-white hover:bg-[#2ea2d8]/90 transition"
      >
        {showAddForm ? 'Cancel' : '+ Add Guide'}
      </button>

      {showAddForm && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Add New Guide</h2>
          <form onSubmit={handleAddGuide} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Guide Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Focus Area (e.g., History & Culture)"
                value={formData.focus}
                onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Initial Rating (0-5)"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
            >
              Add Guide
            </button>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-slate-300">ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">City</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Focus</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Bookings</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Earnings</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map(guide => (
                <tr key={guide.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{guide.id}</td>
                  <td className="py-3 px-4 text-slate-300">{guide.name}</td>
                  <td className="py-3 px-4 text-slate-400">{guide.city}</td>
                  <td className="py-3 px-4 text-slate-300">{guide.focus}</td>
                  <td className="py-3 px-4 text-slate-300">{guide.rating}</td>
                  <td className="py-3 px-4 text-slate-400">{guide.bookings}</td>
                  <td className="py-3 px-4 text-green-400">${guide.earnings}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteGuide(guide.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Delete
                    </button>
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
