'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialHotels = [
  { id: 'H001', name: 'Grand Plaza Hotel', city: 'New York', rating: 4.8, rooms: 45, price: 150, status: 'Active' },
  { id: 'H002', name: 'Seaside Resort', city: 'Miami', rating: 4.6, rooms: 78, price: 200, status: 'Active' },
  { id: 'H003', name: 'Mountain View Lodge', city: 'Denver', rating: 4.5, rooms: 32, price: 120, status: 'Active' },
  { id: 'H004', name: 'Downtown Boutique', city: 'Los Angeles', rating: 4.7, rooms: 20, price: 180, status: 'Active' },
];

export default function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    rating: 4.5,
    rooms: 0,
    price: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_hotels');
    if (saved) {
      setHotels(JSON.parse(saved));
    } else {
      setHotels(initialHotels);
      localStorage.setItem('admin_hotels', JSON.stringify(initialHotels));
    }
  }, []);

  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem('admin_hotels', JSON.stringify(hotels));
    }
  }, [hotels]);

  const handleAddHotel = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city || formData.rooms <= 0 || formData.price <= 0) {
      alert('Please fill in all fields');
      return;
    }
    const newHotel = {
      id: 'H' + String(hotels.length + 1).padStart(3, '0'),
      ...formData,
      status: 'Active',
    };
    setHotels([...hotels, newHotel]);
    setFormData({ name: '', city: '', rating: 4.5, rooms: 0, price: 0 });
    setShowAddForm(false);
  };

  const handleDeleteHotel = (hotelId) => {
    setHotels(hotels.filter(h => h.id !== hotelId));
  };

  const handleChangeStatus = (hotelId, newStatus) => {
    setHotels(hotels.map(h => 
      h.id === hotelId ? { ...h, status: newStatus } : h
    ));
  };

  const statusOptions = ['Active', 'Inactive', 'Maintenance'];

  return (
    <AdminShell title="Manage Hotels" subtitle="Add, view, and manage all hotels">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-6 rounded-lg bg-[#2ea2d8] px-4 py-2 font-semibold text-white hover:bg-[#2ea2d8]/90 transition"
      >
        {showAddForm ? 'Cancel' : '+ Add Hotel'}
      </button>

      {showAddForm && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Add New Hotel</h2>
          <form onSubmit={handleAddHotel} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Hotel Name"
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
                type="number"
                placeholder="Number of Rooms"
                min="1"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price per Night ($)"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Rating (0-5)"
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
              Add Hotel
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
                <th className="text-left py-3 px-4 font-medium text-slate-300">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Rooms</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Price/Night</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(hotel => (
                <tr key={hotel.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{hotel.id}</td>
                  <td className="py-3 px-4 text-slate-300">{hotel.name}</td>
                  <td className="py-3 px-4 text-slate-400">{hotel.city}</td>
                  <td className="py-3 px-4 text-slate-300">{hotel.rating}</td>
                  <td className="py-3 px-4 text-slate-400">{hotel.rooms}</td>
                  <td className="py-3 px-4 text-slate-300">${hotel.price}</td>
                  <td className="py-3 px-4">
                    <select
                      value={hotel.status}
                      onChange={(e) => handleChangeStatus(hotel.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer focus:outline-none ${
                        hotel.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                        hotel.status === 'Inactive' ? 'bg-red-500/20 text-red-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteHotel(hotel.id)}
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
