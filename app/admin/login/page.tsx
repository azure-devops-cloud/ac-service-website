'use client';

import { FormEvent, useEffect, useState } from 'react';
import { LockKeyhole, LogIn, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

const supabase = createClient();

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin');
    });
  }, [router, supabase]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  }

  return (
    <main className="adminAuth">
      <div className="adminAuthCard">
        <div className="adminLogo"><ShieldCheck size={24} /></div>
        <div className="adminKicker">AC CARE ADMIN</div>
        <h1>Manage your bookings</h1>
        <p>Sign in to view customer requests and update their service status.</p>

        <form onSubmit={handleLogin} className="adminForm">
          <label>
            Email
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          {error && <div className="adminError">{error}</div>}
          <button className="adminPrimary" disabled={loading}>
            <LogIn size={17} /> {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="adminSecurity"><LockKeyhole size={15} /> Booking data is protected by Supabase Auth + RLS.</div>
      </div>
    </main>
  );
}
