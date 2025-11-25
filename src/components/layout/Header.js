"use client";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../lib/CartContext';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // Ultra-Premium Glass Effect: High blur, low opacity, subtle border
    <header className="sticky top-0 z-40 w-full h-[72px] bg-[#FAF8F3]/70 backdrop-blur-2xl border-b border-[var(--green-primary)]/5 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-[#FAF8F3]/60">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.svg" 
              alt="Schephino's" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-bold text-[var(--green-primary)] leading-none tracking-tight group-hover:text-[var(--green-dark)] transition-colors">
              Schephino's
            </h1>
            <p className="text-[8px] md:text-[10px] text-[var(--gold-accent)] tracking-[0.3em] uppercase font-bold mt-0.5">
              Kitchen
            </p>
          </div>
        </Link>
        
        {/* Cart Button - Classic Icon, Modern Interaction */}
        <Link href="/cart" className="relative group">
          <div className="p-2.5 bg-white/80 border border-[var(--cream-dark)] rounded-full hover:bg-[var(--green-primary)] hover:border-[var(--green-primary)] hover:shadow-md transition-all duration-300 group-active:scale-95">
            <ShoppingCart 
              size={22} 
              className="text-[var(--green-primary)] group-hover:text-white transition-colors duration-300" 
              strokeWidth={2} 
            />
            
            {/* Notification Dot */}
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-[var(--gold-accent)] text-[var(--green-dark)] text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-[#FAF8F3] animate-in fade-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </div>
        </Link>

      </div>
    </header>
  );
}