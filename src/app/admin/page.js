"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Success! Go to the dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--green-dark)] via-[var(--green-primary)] to-[var(--green-secondary)] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4">
            <Image 
              src="/logo.svg" 
              alt="Schephino's Kitchen Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="p-3 sm:p-4 bg-[var(--cream-primary)] rounded-2xl text-[var(--green-primary)]">
            <Lock size={28} className="sm:w-8 sm:h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[var(--green-dark)] mb-2">Admin Access</h1>
        <p className="text-center text-[var(--text-medium)] text-sm sm:text-base mb-6 sm:mb-8">Schephino's Kitchen Command Center</p>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 sm:py-4 border-2 border-[var(--cream-dark)] rounded-2xl focus:ring-4 focus:ring-[var(--green-primary)]/20 focus:border-[var(--green-primary)] focus:outline-none transition-all text-sm sm:text-base"
              placeholder="admin@schephinos.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 sm:py-4 border-2 border-[var(--cream-dark)] rounded-2xl focus:ring-4 focus:ring-[var(--green-primary)]/20 focus:border-[var(--green-primary)] focus:outline-none transition-all text-sm sm:text-base"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 text-red-600 text-sm rounded-2xl text-center font-medium">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--gold-accent)] to-[var(--gold-light)] text-[var(--green-dark)] font-bold py-4 sm:py-5 rounded-2xl hover:shadow-xl transition-all flex justify-center items-center gap-2 text-base sm:text-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Enter Kitchen"}
          </button>
        </form>
      </div>
    </div>
  );
}