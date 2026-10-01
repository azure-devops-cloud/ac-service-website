'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, LogOut, Phone, RefreshCw, Search, ShieldCheck, UserRound, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  preferred_time: string | null;
  address: string | null;
  notes: string | null;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
};

const statuses = ['new', 'contacted', 'scheduled', 'completed', 'cancelled'] as const;

const statusLabel: Record<Booking['status'], string> = {
  new: 'New',
  contacted: 'Contacted',
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | Booking['status']>('all');
  const [error, setError] = useState('');

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      router.replace('/admin/login');
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('service_bookings')
      .select('id,customer_name,phone,service,preferred_date,preferred_time,address,notes,status,created_at')
      .order('created_at', { ascending: false });

    if (fetchError) setError(fetchError.message);
    else setBookings((data ?? []) as Booking[]);
    setLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  async function updateStatus(id: string, status: Booking['status']) {
    setUpdating(id);
    setError('');
    const { error: updateError } = await supabase
      .from('service_bookings')
      .update({ status })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
    }
    setUpdating('');
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesFilter = filter === 'all' || booking.status === filter;
      const haystack = [booking.customer_name, booking.phone, booking.service, booking.address, booking.notes].join(' ').toLowerCase();
      return matchesFilter && (!term || haystack.includes(term));
    });
  }, [bookings, filter, search]);

  const counts = useMemo(() => ({
    all: bookings.length,
    new: bookings.filter((b) => b.status === 'new').length,
    contacted: bookings.filter((b) => b.status === 'contacted').length,
    scheduled: bookings.filter((b) => b.status === 'scheduled').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  }), [bookings]);

  return (
    <main className="adminPage">
      <header className="adminNav">
        <a href="/" className="adminBrand"><span><Wrench size={18} /></span> AC CARE <small>ADMIN</small></a>
        <div className="adminNavActions">
          <button onClick={loadBookings} className="adminGhost" title="Refresh"><RefreshCw size={17} /></button>
          <button onClick={signOut} className="adminGhost"><LogOut size={17} /> Sign out</button>
        </div>
      </header>

      <section className="adminMain">
        <div className="adminHeading">
          <div>
            <div className="adminKicker"><ShieldCheck size={15} /> SERVICE OPERATIONS</div>
            <h1>Bookings dashboard</h1>
            <p>Track every customer request from new enquiry through completion.</p>
          </div>
          <div className="adminLive"><span /> Live database</div>
        </div>

        <div className="adminStats">
          {([
            ['all', 'Total', counts.all],
            ['new', 'New', counts.new],
            ['contacted', 'Contacted', counts.contacted],
            ['scheduled', 'Scheduled', counts.scheduled],
            ['completed', 'Completed', counts.completed],
          ] as const).map(([key, label, count]) => (
            <button key={key} className={filter === key ? 'adminStat active' : 'adminStat'} onClick={() => setFilter(key)}>
              <strong>{count}</strong><span>{label}</span>
            </button>
          ))}
        </div>

        <div className="adminToolbar">
          <div className="adminSearch"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer, phone, service…" /></div>
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value="all">All statuses</option>
            {statuses.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
          </select>
        </div>

        {error && <div className="adminError adminErrorWide">{error}</div>}

        {loading ? (
          <div className="adminEmpty"><RefreshCw className="spin" size={22} /> Loading bookings…</div>
        ) : filtered.length === 0 ? (
          <div className="adminEmpty"><CheckCircle2 size={28} /><h3>No bookings found</h3><p>Try another search or status filter.</p></div>
        ) : (
          <div className="bookingTableWrap">
            <table className="bookingTable">
              <thead><tr><th>Customer</th><th>Service</th><th>Location / Issue</th><th>Received</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="customerName"><UserRound size={16} /> {booking.customer_name}</div>
                      <a className="customerPhone" href={`tel:${booking.phone}`}><Phone size={13} /> {booking.phone}</a>
                    </td>
                    <td><strong>{booking.service}</strong></td>
                    <td><div>{booking.address || '—'}</div><small>{booking.notes || 'No issue notes'}</small></td>
                    <td>{new Date(booking.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td><span className={`statusPill ${booking.status}`}><Clock3 size={13} /> {statusLabel[booking.status]}</span></td>
                    <td>
                      <select disabled={updating === booking.id} value={booking.status} onChange={(e) => updateStatus(booking.id, e.target.value as Booking['status'])}>
                        {statuses.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
