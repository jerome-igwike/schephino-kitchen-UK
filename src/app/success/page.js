"use client";
import { useEffect } from 'react';
import { CheckCircle, Home, Sparkles, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem('schephino_cart');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cream-primary)] via-white to-[var(--cream-secondary)] flex flex-col items-center justify-center p-6 md:p-8">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-24 h-24 mx-auto mb-4"
        >
          <Image 
            src="/logo.svg" 
            alt="Schephino's Kitchen Logo" 
            fill
            className="object-contain"
          />
        </motion.div>
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-36 h-36"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-full blur-2xl opacity-40"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white">
            <CheckCircle size={72} className="text-white" strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award size={20} className="text-[var(--gold-accent)]" />
            <span className="text-sm font-semibold text-[var(--text-medium)] tracking-wider uppercase">
              Order Confirmed
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-[var(--green-primary)] mb-3">
            Thank You!
          </h1>
          
          <p className="text-xl text-[var(--text-dark)] font-medium">
            Your order has been received
          </p>
          
          <p className="text-[var(--text-medium)] text-base leading-relaxed max-w-sm mx-auto">
            Our master chefs are preparing your premium Nigerian dishes with care. You'll receive a confirmation email shortly.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 py-6"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <Sparkles
                size={24}
                className="text-[var(--gold-accent)]"
                fill="currentColor"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-[var(--green-primary)]/20"
        >
          <h3 className="font-bold text-lg text-[var(--text-dark)] mb-4">What's Next?</h3>
          <ul className="space-y-3 text-left text-[var(--text-medium)]">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[var(--green-primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span>Check your email for order confirmation</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[var(--green-primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span>Our chefs will prepare your dishes fresh</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[var(--green-primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span>Enjoy your premium Nigerian cuisine!</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-4 pt-4"
        >
          <Link
            href="/"
            className="w-full bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-[0_12px_40px_rgba(44,95,45,0.4)] transition-all"
          >
            <Home size={24} />
            <span>Back to Menu</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
