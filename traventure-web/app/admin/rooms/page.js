'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialRooms = [
  { id: 'R001', roomNumber: '101', hotel: 'Grand Plaza Hotel', type: 'Single', capacity: 1, price: 150, status: 'Available' },
  { id: 'R002', roomNumber: '102', hotel: 'Grand Plaza Hotel', type: 'Double', capacity: 2, price: 200, status: 'Booked' },
  { id: 'R003', roomNumber: '201', hotel: 'Seaside Resort', type: 'Suite', capacity: 4, price: 350, status: 'Available' },
  { id: 'R004', roomNumber: '105', hotel: 'Grand Plaza Hotel', type: 'Double', capacity: 2, price: 200, status: 'Available' },
  { id: 'R005', roomNumber: '301', hotel: 'Mountain View Lodge', type: 'Single', capacity: 1, price: 120, status: 'Maintenance' },
];

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    hotel: '',
    type: 'Double',
    capacity: 2,
    price: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_rooms');
    if (saved) {
      setRooms(JSON.parse(saved));
    } else {
      setRooms(initialRooms);
      localStorage.setItem('admin_rooms', JSON.stringify(initialRooms));
    }
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      localStorage.setItem('admin_rooms', JSON.stringify(rooms));
    }
  }, [rooms]);

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!formData.roomNumber || !formData.hotel || formData.price <= 0) {
      alert('Please fill in all fields');
      return;
    }
    const newRoom = {
      id: 'R' + String(rooms.length + 1).padStart(3, '0'),
      ...formData,
      status: 'Available',
    };
    setRooms([...rooms, newRoom]);
    setFormData({ roomNumber: '', hotel: '', type: 'Double', capacity: 2, price: 0 });
    setShowAddForm(false);
  };

  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter(r => r.id !== roomId));
  };

  const handleChangeStatus = (roomId, newStatus) => {
    setRooms(rooms.map(r => 
      r.id === roomId ? { ...r, status: newStatus } : r
    ));
  };

  const statusOptions = ['Available', 'Booked', 'Maintenance'];

  return (
    <AdminShell title="Manage Rooms" subtitle="View and manage hotel rooms">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-6 rounded-lg bg-[#2ea2d8] px-4 py-2 font-semibold text-white hover:bg-[#2ea2d8]/90 transition"
      >
        {showAddForm ? 'Cancel' : '+ Add Room'}
      </button>

      {showAddForm && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Add New Room</h2>
          <form onSubmit={handleAddRoom} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Room Number"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Hotel Name"
                value={formData.hotel}
                onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-[#2ea2d8] focus:outline-none"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-slate-100 focus:border-[#2ea2d8] focus:outline-none"
              >
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
                <option>Deluxe</option>
              </select>
              <input
                type="number"
                placeholder="Capacity"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
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
            </div>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
            >
              Add Room
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
                <th className="text-left py-3 px-4 font-medium text-slate-300">Room #</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Hotel</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Capacity</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Price/Night</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{room.id}</td>
                  <td className="py-3 px-4 text-slate-300">{room.roomNumber}</td>
                  <td className="py-3 px-4 text-slate-400">{room.hotel}</td>
                  <td className="py-3 px-4 text-slate-300">{room.type}</td>
                  <td className="py-3 px-4 text-slate-400">{room.capacity} pax</td>
                  <td className="py-3 px-4 text-slate-300">${room.price}</td>
                  <td className="py-3 px-4">
                    <select
                      value={room.status}
                      onChange={(e) => handleChangeStatus(room.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer focus:outline-none ${
                        room.status === 'Available' ? 'bg-green-500/20 text-green-300' :
                        room.status === 'Booked' ? 'bg-red-500/20 text-red-300' :
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
                      onClick={() => handleDeleteRoom(room.id)}
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
