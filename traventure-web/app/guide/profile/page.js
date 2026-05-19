'use client';

import { useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import DashboardShell from '../../components/DashboardShell';
import BorderGlow from '../../components/BorderGlow';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

const baseProfile = {
  name: 'Rina S.',
  title: 'Local Guide',
  bio: 'Kyoto-based guide specializing in temple mornings, artisan lanes, and tea rituals.',
  experienceYears: 5,
  languages: 'English, Japanese',
  email: 'rina@traventure.com',
  phone: '+81 90 1234 5678',
  city: 'Kyoto',
  specialties: 'Temple mornings, artisan lanes, tea rituals',
};

export default function GuideProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || baseProfile.name,
    title: baseProfile.title,
    bio: baseProfile.bio,
    experienceYears: baseProfile.experienceYears,
    languages: baseProfile.languages,
    email: user?.email || baseProfile.email,
    phone: baseProfile.phone,
    city: baseProfile.city,
    specialties: baseProfile.specialties,
  });

  const handleChange = (key) => (event) => {
    setForm(prev => ({ ...prev, [key]: event.target.value }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardShell
      title="Guide Profile"
      subtitle="View and edit your guide details and traveler-facing profile."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <BorderGlow
          edgeSensitivity={25}
          glowColor="200 90 70"
          backgroundColor="#0f1115"
          borderRadius={28}
          glowRadius={28}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#2ea2d8', '#fbbf24', '#38bdf8']}
        >
          <div className="p-8 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2ea2d8] text-3xl font-bold text-white shadow-lg mx-auto">
              {getInitials(form.name)}
            </div>
            <p className="mt-4 text-xl font-semibold text-slate-100">{form.name}</p>
            <p className="text-sm text-slate-400">{form.title}</p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Experience</p>
                <p className="text-sm font-semibold text-slate-200">{form.experienceYears} years</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Languages</p>
                <p className="text-sm font-semibold text-slate-200">{form.languages}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Base city</p>
                <p className="text-sm font-semibold text-slate-200">{form.city}</p>
              </div>
            </div>
          </div>
        </BorderGlow>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-semibold text-[#2ea2d8] uppercase tracking-widest">Guide Details</p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/40"
              >
                Edit
              </button>
            )}
          </div>

          {saved && (
            <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              Profile updated successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="grid gap-5">
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Guide name</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Your full name"
                disabled={!editing}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                placeholder="Senior Guide"
                disabled={!editing}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Bio</label>
              <textarea
                value={form.bio}
                onChange={handleChange('bio')}
                placeholder="Share your tour style and experience"
                rows={4}
                disabled={!editing}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Experience (years)</label>
                <input
                  type="number"
                  min={0}
                  value={form.experienceYears}
                  onChange={handleChange('experienceYears')}
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Languages</label>
                <input
                  type="text"
                  value={form.languages}
                  onChange={handleChange('languages')}
                  placeholder="English, Arabic, French"
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@email.com"
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="+1 (555) 000-0000"
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Base city</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={handleChange('city')}
                  placeholder="Marrakesh"
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Specialties</label>
                <input
                  type="text"
                  value={form.specialties}
                  onChange={handleChange('specialties')}
                  placeholder="Souks, tea houses, artisan lanes"
                  disabled={!editing}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#2ea2d8] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {editing && (
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#2ea2d8] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      name: user?.name || baseProfile.name,
                      title: baseProfile.title,
                      bio: baseProfile.bio,
                      experienceYears: baseProfile.experienceYears,
                      languages: baseProfile.languages,
                      email: user?.email || baseProfile.email,
                      phone: baseProfile.phone,
                      city: baseProfile.city,
                      specialties: baseProfile.specialties,
                    });
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/40"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
