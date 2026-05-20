'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'traventure_user';
const STORAGE_KEY_BOOKINGS = 'traventure_bookings';
const STORAGE_KEY_GUIDE_BOOKINGS = 'traventure_guide_bookings';

function generateId() {
  return 'TV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

function determineRole(email) {
  const lower = (email || '').toLowerCase();
  if (lower.includes('admin')) return 'admin';
  if (lower.includes('rina')) return 'guide';
  return 'user';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      const savedBookings = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedBookings) setBookings(JSON.parse(savedBookings));
    } catch {
      /* ignore parse errors */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY_USER);
  }, [user, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings, ready]);

  const login = useCallback((email, password) => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.email === email) {
        const role = determineRole(email);
        const withRole = { ...parsed, role };
        setUser(withRole);
        return { success: true };
      }
    }
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const role = determineRole(email);
    const newUser = {
      id: generateId(),
      name,
      email,
      phone: '',
      passport: '',
      nationality: '',
      initials: getInitials(name),
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return { success: true };
  }, []);

  const register = useCallback((name, email, password) => {
    const role = determineRole(email);
    const newUser = {
      id: generateId(),
      name,
      email,
      phone: '',
      passport: '',
      nationality: '',
      initials: getInitials(name),
      role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      next.initials = getInitials(next.name);
      return next;
    });
  }, []);

  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: generateId(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      review: null,
    };
    setBookings(prev => [newBooking, ...prev]);

    // ---- Sync to admin_bookings so admin can see all user bookings ----
    try {
      const adminBookings = JSON.parse(localStorage.getItem('admin_bookings') || '[]');
      // Build a flat admin-friendly booking entry for each service in this booking
      const guestName = booking.traveler?.name || user?.name || 'Traveler';
      const bookingDate = new Date().toISOString().split('T')[0];

      if (booking.hotel) {
        adminBookings.unshift({
          id: newBooking.id + '-H',
          guest: guestName,
          type: 'Hotel',
          item: `${booking.hotel.name} - ${booking.hotel.room || 'Standard'}`,
          checkIn: booking.hotel.checkIn || '',
          checkOut: booking.hotel.checkOut || '',
          bookingDate,
          amount: booking.hotel.subtotal || 0,
          status: 'Confirmed',
        });
      }
      if (booking.flight) {
        adminBookings.unshift({
          id: newBooking.id + '-F',
          guest: guestName,
          type: 'Flight',
          item: `${booking.flight.airline} ${booking.flight.from}-${booking.flight.to}`,
          date: booking.flight.departDate || '',
          passengers: booking.flight.passengers || 1,
          bookingDate,
          amount: booking.flight.subtotal || 0,
          status: 'Confirmed',
        });
      }
      if (booking.guide) {
        adminBookings.unshift({
          id: newBooking.id + '-G',
          guest: guestName,
          type: 'Guide',
          item: `${booking.guide.name} - ${booking.guide.city}`,
          date: booking.guide.departDate || '',
          duration: '1 session',
          bookingDate,
          amount: booking.guide.subtotal || 0,
          status: 'Confirmed',
        });
      }
      localStorage.setItem('admin_bookings', JSON.stringify(adminBookings));
    } catch { /* ignore */ }

    // If booking includes a guide, save to shared guide bookings store
    if (booking.guide) {
      const guideRequest = {
        id: newBooking.id,
        guideName: booking.guide.name,
        guideId: booking.guide.id || booking.guide.name.toLowerCase().replace(/[^a-z]/g, '-'),
        guideCity: booking.guide.city,
        guideFocus: booking.guide.focus,
        travelerName: booking.traveler?.name || user?.name || 'Traveler',
        travelerEmail: booking.traveler?.email || user?.email || '',
        payout: booking.guide.subtotal || booking.guide.price || 0,
        status: 'Pending',
        createdAt: newBooking.createdAt,
        bookingId: newBooking.id,
      };
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_GUIDE_BOOKINGS) || '[]');
        localStorage.setItem(STORAGE_KEY_GUIDE_BOOKINGS, JSON.stringify([guideRequest, ...existing]));
      } catch { /* ignore */ }
    }

    return newBooking;
  }, [user]);

  const cancelBooking = useCallback((bookingId) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  }, []);

  // Shared guide bookings helpers (read from localStorage directly since guide may be different user)
  const getGuideBookings = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_GUIDE_BOOKINGS) || '[]');
    } catch { return []; }
  }, []);

  const updateGuideBooking = useCallback((bookingId, updates) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_GUIDE_BOOKINGS) || '[]');
      const updated = existing.map(b => b.id === bookingId ? { ...b, ...updates } : b);
      localStorage.setItem(STORAGE_KEY_GUIDE_BOOKINGS, JSON.stringify(updated));
    } catch { /* ignore */ }
  }, []);

  const addReview = useCallback((bookingId, review) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, review } : b))
    );
  }, []);

  const value = {
    user,
    bookings,
    ready,
    login,
    register,
    logout,
    updateProfile,
    addBooking,
    cancelBooking,
    addReview,
    getGuideBookings,
    updateGuideBooking,
    isLoggedIn: !!user,
  };

  // convenience: isGuide
  if (user) value.isGuide = user.role === 'guide';

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default AuthContext;
