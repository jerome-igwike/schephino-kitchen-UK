import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Award, ChefHat } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--cream-primary)] pb-32">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--green-dark)] via-[var(--green-primary)] to-[var(--green-secondary)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-20">
          <div className="relative w-20 h-20 mx-auto mb-6 bg-white/10 rounded-3xl p-3 backdrop-blur-sm">
            <Image 
              src="/logo.svg" 
              alt="Schephino's Kitchen Logo" 
              fill
              className="object-contain p-2"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            We'd love to hear from you. Visit us or reach out today for reservations and inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10 space-y-12">
        
        {/* --- NEW: MEET THE CHEF SECTION --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[var(--cream-dark)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--green-light)] rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            {/* Chef Image */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 group">
              <div className="absolute inset-0 bg-[var(--gold-accent)] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                <Image
                  src="/images/chef-joseph.jpg" // <--- MAKE SURE YOU UPLOAD THIS IMAGE
                  alt="Chef Joseph Nkemaosi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[var(--green-primary)] text-white p-3 rounded-full shadow-lg border-4 border-white">
                <ChefHat size={24} />
              </div>
            </div>

            {/* Chef Bio */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-[var(--green-primary)]/10 text-[var(--green-primary)] px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4">
                Head Chef
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-4">
                Joseph Nkemaosi
              </h2>
              <p className="text-[var(--text-medium)] text-lg leading-relaxed mb-6">
                A visionary young Nigerian chef bringing the vibrant, authentic flavors of home to the UK. With a deep respect for tradition and a modern culinary flair, Chef Joseph crafts every dish to tell a story of heritage and passion.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--gold-accent)] font-medium">
                <Award size={20} />
                <span>Award Winning Culinary Artist</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTACT CARDS GRID --- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Location Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[var(--green-primary)]/10 hover:border-[var(--green-primary)]/30 transition-all">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">Visit Our Restaurant</h3>
                <p className="text-[var(--text-medium)] leading-relaxed">
                  123 Premium Street<br />
                  Mayfair, London<br />
                  W1K 5AB, United Kingdom
                </p>
                <a href="#" className="inline-block mt-4 text-[var(--green-primary)] font-semibold text-sm hover:underline">
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[var(--green-primary)]/10 hover:border-[var(--green-primary)]/30 transition-all">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">Call Us</h3>
                <p className="text-[var(--text-medium)] text-lg font-semibold mb-1">
                  +44 7000 000 000
                </p>
                <p className="text-[var(--text-light)] text-sm">
                  Available daily from 12:00 PM - 11:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[var(--green-primary)]/10 hover:border-[var(--green-primary)]/30 transition-all">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">Email Us</h3>
                <a href="mailto:hello@schephinos.kitchen" className="text-[var(--green-primary)] text-lg font-semibold hover:underline">
                  hello@schephinos.kitchen
                </a>
                <p className="text-[var(--text-light)] text-sm mt-1">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[var(--green-primary)]/10 hover:border-[var(--green-primary)]/30 transition-all">
            <h3 className="text-xl font-bold text-[var(--text-dark)] mb-5">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="flex-1 bg-gradient-to-br from-pink-500 to-purple-600 text-white p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all">
                <Instagram size={24} />
                <span className="font-semibold">Instagram</span>
              </a>
              <a href="#" className="flex-1 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all">
                <Facebook size={24} />
                <span className="font-semibold">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Opening Hours Card (Full Width) */}
        <div className="bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] rounded-3xl p-8 md:p-12 shadow-xl text-white">
          <div className="flex items-center gap-3 mb-8">
            <Clock size={32} className="text-[var(--gold-accent)]" />
            <h3 className="text-3xl font-bold">Opening Hours</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-lg">
            <div className="flex flex-col border-l-4 border-[var(--gold-accent)] pl-4">
              <span className="font-bold text-[var(--gold-light)] mb-1">Monday - Thursday</span>
              <span className="text-white/90">12:00 PM - 10:00 PM</span>
            </div>
            <div className="flex flex-col border-l-4 border-[var(--gold-accent)] pl-4">
              <span className="font-bold text-[var(--gold-light)] mb-1">Friday - Saturday</span>
              <span className="text-white/90">12:00 PM - 11:00 PM</span>
            </div>
            <div className="flex flex-col border-l-4 border-[var(--gold-accent)] pl-4">
              <span className="font-bold text-[var(--gold-light)] mb-1">Sunday</span>
              <span className="text-white/90">1:00 PM - 9:00 PM</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}