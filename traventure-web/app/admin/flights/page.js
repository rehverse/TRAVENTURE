'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialFlights = [
  { id: 'F001', airline: 'SkyAir', from: 'NYC', to: 'LAX', departure: '08:00', arrival: '11:30', duration: '5h 30m', price: 450, available: 45 },
  { id: 'F002', airline: 'CloudWings', from: 'NYC', to: 'MIA', departure: '14:00', arrival: '17:30', duration: '3h 30m', price: 280, available: 32 },
  { id: 'F003', airline: 'SkyAir', from: 'LAX', to: 'NYC', departure: '10:00', arrival: '18:00', duration: '5h 30m', price: 480, available: 28 },
  { id: 'F004', airline: 'AeroConnect', from: 'NYC', to: 'ORD', departure: '09:30', arrival: '11:00', duration: '2h 30m', price: 220, available: 56 },
];

export default function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '',
    from: '',
    to: '',
    departure: '',
    arrival: '',
    duration: '',
    price: 0,
    available: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_flights');
    if (saved) {
      setFlights(JSON.parse(saved));
    } else {
      setFlights(initialFlights);
      localStorage.setItem('admin_flights', JSON.stringify(initialFlights));
    }
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      localStorage.setItem('admin_flights', JSON.stringify(flights));
    }
  }, [flights]);

  const handleAddFlight = (e) => {
    e.preventDefault();
    if (!formData.airline || !formData.from || !formData.to || formData.price <= 0 || formData.available <= 0) {
      alert('Please fill in all fields');
      return;
    }
    const newFlight = {
      id: 'F' + String(flights.length + 1).padStart(3, '0'),
      ...formData,
    };
    setFlights([...flights, newFlight]);
    setFormData({ airline: '', from: '', to: '', departure: '', arrival: '', duration: '', price: 0, available: 0 });
    setShowAddForm(false);
  };

  const handleDeleteFlight = (flightId) => {
    setFlights(flights.filter(f => f.id !== flightId));
  };

  return (
    <AdminShell title="Manage Flights" subtitle="View and manage all flights">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-6 rounded-lg bg-[#2ea2d8] px-4 py-2 font-semibold text-white hover:bg-[#2ea2d8]/90 transition"
      >
        {showAddForm ? 'Cancel' : '+ Add Flight'}
      </button>

      {showAddForm && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Add New Flight</h2>
          <form onSubmit={handleAddFlight} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Airline Name"
                value={formData.airline}
                onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="From (e.g., NYC)"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value.toUpperCase() })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="To (e.g., LAX)"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value.toUpperCase() })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="time"
                placeholder="Departure"
                value={formData.departure}
                onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="time"
                placeholder="Arrival"
                value={formData.arrival}
                onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 5h 30m)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price ($)"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Available Seats"
                min="1"
                value={formData.available}
                onChange={(e) => setFormData({ ...formData, available: parseInt(e.target.value) })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
            >
              Add Flight
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
                <th className="text-left py-3 px-4 font-medium text-slate-300">Airline</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Route</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Departure</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Arrival</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Price</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Available</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <tr key={flight.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{flight.id}</td>
                  <td className="py-3 px-4 text-slate-300">{flight.airline}</td>
                  <td className="py-3 px-4 text-slate-400">{flight.from} → {flight.to}</td>
                  <td className="py-3 px-4 text-slate-400">{flight.departure}</td>
                  <td className="py-3 px-4 text-slate-400">{flight.arrival}</td>
                  <td className="py-3 px-4 text-slate-400">{flight.duration}</td>
                  <td className="py-3 px-4 text-slate-300">${flight.price}</td>
                  <td className="py-3 px-4 text-slate-400">{flight.available}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteFlight(flight.id)}
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
