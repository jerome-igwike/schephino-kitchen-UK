import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[var(--green-dark)] to-[var(--green-primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 bg-white/10 rounded-2xl p-2">
                <Image 
                  src="/logo.svg" 
                  alt="Schephino's Kitchen Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Schephino's</h3>
                <p className="text-sm text-white/70 tracking-wider uppercase">Kitchen</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-6">
              Premium Nigerian cuisine in the heart of the UK. Experience authentic flavors elevated to perfection.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#menu-section" className="text-white/80 hover:text-white transition-colors">Our Menu</Link></li>
              <li><Link href="/cart" className="text-white/80 hover:text-white transition-colors">Cart</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--gold-accent)] flex-shrink-0 mt-1" />
                <span className="text-white/80">123 Premium Street, Mayfair, London, W1K 5AB</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[var(--gold-accent)] flex-shrink-0" />
                <span className="text-white/80">+44 7000 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--gold-accent)] flex-shrink-0" />
                <span className="text-white/80">hello@schephinos.kitchen</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--gold-accent)]" />
                <div className="text-sm">
                  <p className="font-semibold">Mon - Thu</p>
                  <p className="text-white/70">12:00 PM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--gold-accent)]" />
                <div className="text-sm">
                  <p className="font-semibold">Fri - Sat</p>
                  <p className="text-white/70">12:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--gold-accent)]" />
                <div className="text-sm">
                  <p className="font-semibold">Sunday</p>
                  <p className="text-white/70">1:00 PM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2025 Schephino's Kitchen. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
