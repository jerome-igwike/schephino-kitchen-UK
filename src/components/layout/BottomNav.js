"use client";
import { Home, UtensilsCrossed, ShoppingCart, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Menu', icon: UtensilsCrossed, href: '/' }, // Keeping Menu as Home anchor
    { name: 'Cart', icon: ShoppingCart, href: '/cart' },
    { name: 'Contact', icon: Phone, href: '/contact' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[var(--cream-dark)] pb-safe pt-2 px-4 premium-shadow z-50">
      <div className="flex justify-between items-end max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative flex flex-col items-center gap-1 transition-all duration-300 group w-16"
            >
              {/* Reduced padding from p-2.5 to p-1.5 to shrink height */}
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-[var(--green-primary)] shadow-sm' 
                  : 'bg-transparent group-hover:bg-[var(--cream-secondary)]'
              }`}>
                <Icon 
                  size={20} // Reduced icon size from 22 to 20
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[var(--text-medium)] group-hover:text-[var(--green-primary)]'
                  }`}
                />
              </div>
              
              <span className={`text-[9px] font-semibold tracking-wide transition-colors duration-300 ${
                isActive ? 'text-[var(--green-primary)]' : 'text-[var(--text-light)]'
              }`}>
                {item.name}
              </span>
              
              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -top-2 w-1 h-1 bg-[var(--gold-accent)] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}