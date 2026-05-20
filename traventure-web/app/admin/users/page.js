'use client';

import AdminShell from '../../components/AdminShell';
import { useState, useEffect } from 'react';

const initialUsers = [
  { id: 'U001', name: 'John Smith', email: 'john@example.com', role: 'User', joinDate: '2026-01-15', status: 'Active' },
  { id: 'U002', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', joinDate: '2026-02-20', status: 'Active' },
  { id: 'U003', name: 'Mike Brown', email: 'mike@example.com', role: 'User', joinDate: '2026-03-10', status: 'Active' },
  { id: 'U004', name: 'Emily Davis', email: 'emily@example.com', role: 'User', joinDate: '2026-04-05', status: 'Inactive' },
  { id: 'U005', name: 'Admin User', email: 'admin@example.com', role: 'Admin', joinDate: '2025-12-01', status: 'Active' },
];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_users');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('admin_users', JSON.stringify(initialUsers));
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
  }, [users]);

  const handleDeleteUser = (userId) => {
    if (userId === 'U005') {
      alert('Cannot delete admin user');
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <AdminShell title="Manage Users" subtitle="View and manage all registered users">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-slate-300">ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Email</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Role</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Join Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-slate-400">{user.id}</td>
                  <td className="py-3 px-4 text-slate-300">{user.name}</td>
                  <td className="py-3 px-4 text-slate-400">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-purple-500/20 text-purple-300' :
                      user.role === 'Guide' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-slate-500/20 text-slate-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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
