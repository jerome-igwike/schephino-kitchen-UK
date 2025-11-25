"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Award, Star, ChefHat, Search, X, TrendingUp, Clock, Heart, Sparkles } from 'lucide-react';
import DishCard from '../components/menu/DishCard';
import DishModal from '../components/menu/DishModal';
import { useCart } from '../lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIG: Your Hero Images ---
const HERO_IMAGES = [
  "/images/hero-bg.jpg",    // Default
  "/images/hero-bg-2.jpg",  // Create this!
  "/images/hero-bg-3.jpg"   // Create this!
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { addToCart } = useCart();

  // Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- SLIDER LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(timer);
  }, []);

  // Data Fetching
  useEffect(() => {
    async function getCategories() {
      const { data } = await supabase.from('categories').select('*').order('name');
      if (data && data.length > 0) {
        setCategories(data);
        setActiveCategory(data[0].id);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getAllDishes() {
      const { data } = await supabase
        .from('menu_items')
        .select(`*, product_variants (id, price, size_label), categories (name)`);
      if (data) setAllDishes(data);
    }
    getAllDishes();
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    async function getDishes() {
      setLoading(true);
      const { data } = await supabase
        .from('menu_items')
        .select(`*, product_variants (id, price, size_label)`)
        .eq('category_id', activeCategory);
      if (data) setDishes(data);
      setLoading(false);
    }
    getDishes();
  }, [activeCategory]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allDishes.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(true);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery, allDishes]);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[var(--cream-primary)] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden min-h-[50vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center">
        
        {/* BACKGROUND SLIDER */}
        <div className="absolute inset-0 bg-black"> {/* Black base prevents flashing */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }} // Slow Luxury Fade
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGES[currentImageIndex]}
                alt="Hero Background"
                fill
                priority={currentImageIndex === 0} // Only prioritize the first one
                quality={90}
                className="object-cover animate-slow-zoom"
              />
            </motion.div>
          </AnimatePresence>

          {/* STATIC OVERLAYS (So text remains readable regardless of image) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-[var(--green-dark)]/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--gold-accent)] rounded-full blur-[128px] animate-pulse-slow"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8 md:space-y-12 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Award size={18} className="text-[var(--gold-accent)]" />
                <p className="text-[var(--gold-light)] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  Est. 2020 • London's Finest
                </p>
              </div>
              
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
                  Schephino's<br/>
                  <span className="text-[var(--gold-accent)]">Kitchen</span>
                </h1>
                <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 font-light drop-shadow-md">
                  Authentic Nigerian cuisine, elevated. Experience the rich traditions and vibrant flavors of West Africa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center md:justify-start">
                <button
                  onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[var(--gold-accent)] text-[var(--text-dark)] px-8 sm:px-10 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:bg-[#d4b36a] transition-all hover:scale-105 active:scale-95"
                >
                  Explore Our Menu
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 sm:px-10 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-white/20 transition-all active:scale-95"
                >
                  Book a Table
                </button>
              </div>
            </motion.div>

            {/* Right Features (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="hidden md:grid grid-cols-2 gap-4 lg:gap-6"
            >
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-black/40 transition-all group">
                <ChefHat size={24} className="text-[var(--gold-accent)] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">Master Chefs</h3>
                <p className="text-white/70 text-sm leading-relaxed">Expert Nigerian cuisine specialists.</p>
              </div>
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-black/40 transition-all group mt-8">
                <TrendingUp size={24} className="text-[var(--gold-accent)] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">Premium Quality</h3>
                <p className="text-white/70 text-sm leading-relaxed">Authentic ingredients imported directly.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- STICKY SEARCH BAR --- */}
      <div className="sticky top-[72px] z-30 bg-[#FAF8F3]/95 backdrop-blur-xl border-b border-[var(--cream-dark)] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-12 py-2.5 sm:py-3 md:py-4">
          <div className="relative max-w-2xl mx-auto">
            <Search size={18} className="sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--text-medium)]" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 md:py-4 bg-[var(--cream-primary)] border border-[var(--cream-dark)] rounded-xl sm:rounded-2xl md:rounded-3xl focus:border-[var(--green-primary)] focus:ring-2 focus:ring-[var(--green-primary)]/20 transition-all outline-none text-sm md:text-base font-medium"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 hover:bg-[var(--cream-secondary)] rounded-full transition-colors">
                <X size={16} className="sm:w-[18px] sm:h-[18px] text-[var(--text-medium)]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA (Grid Logic) --- */}
      <div id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
        
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 sm:gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-lg border border-[var(--cream-dark)]">
              <h3 className="text-xl font-bold text-[var(--text-dark)] mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-[var(--gold-accent)]" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); clearSearch(); }}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white shadow-md'
                        : 'bg-[var(--cream-secondary)] text-[var(--text-medium)] hover:bg-[var(--cream-dark)]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Mobile Cats + Dishes) */}
          <div className="min-w-0 space-y-8">
            
            {/* Mobile Categories */}
            <div className="lg:hidden bg-white rounded-2xl p-4 shadow-lg border border-[var(--cream-dark)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[var(--text-dark)]">Menu Categories</h3>
                <Sparkles size={16} className="text-[var(--gold-accent)]" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full touch-pan-x snap-x overscroll-x-contain">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); clearSearch(); }}
                    className={`flex-shrink-0 snap-center px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white shadow-lg'
                        : 'bg-[var(--cream-secondary)] text-[var(--text-medium)]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dish Grid */}
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-[var(--green-dark)] mb-1">
                  {isSearching ? 'Search Results' : categories.find(c => c.id === activeCategory)?.name || 'Featured Dishes'}
                </h2>
                <p className="text-[var(--text-medium)] text-sm">
                  {isSearching ? searchResults.length : dishes.length} {(isSearching ? searchResults.length : dishes.length) === 1 ? 'dish' : 'dishes'} available
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <div className="w-16 h-16 border-4 border-[var(--cream-dark)] border-t-[var(--green-primary)] rounded-full animate-spin mb-4"></div>
                  <p className="text-[var(--text-medium)] font-medium">Loading delicious dishes...</p>
                </motion.div>
              ) : (
                <motion.div
                  key={isSearching ? 'search' : activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                >
                  {(isSearching ? searchResults : dishes).map((dish, index) => (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleDishClick(dish)}
                    >
                      <DishCard item={dish} />
                    </motion.div>
                  ))}
                  {(isSearching ? searchResults : dishes).length === 0 && (
                    <div className="col-span-1 sm:col-span-2 text-center py-20">
                      <p className="text-[var(--text-medium)] text-lg mb-4">
                        {isSearching ? 'No dishes match your search' : 'No dishes available in this category'}
                      </p>
                      {isSearching && (
                        <button onClick={clearSearch} className="text-[var(--green-primary)] font-semibold hover:underline">
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-[var(--cream-secondary)] to-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--green-dark)] mb-4">What Our Customers Say</h2>
            <p className="text-[var(--text-medium)] text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied customers who love our authentic Nigerian cuisine
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Adewale Johnson", rating: 5, text: "The best Jollof rice I've had outside Nigeria! Absolutely authentic." },
              { name: "Sarah Mitchell", rating: 5, text: "Amazing food, great service. The Suya is perfectly spiced!" },
              { name: "David Okonkwo", rating: 5, text: "Finally found a place that makes Egusi soup like home." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--cream-dark)]">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => <Star key={j} size={18} className="text-[var(--gold-accent)] fill-[var(--gold-accent)]" />)}
                </div>
                <p className="text-[var(--text-dark)] leading-relaxed mb-6">"{testimonial.text}"</p>
                <p className="font-bold text-[var(--green-primary)]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedDish}
        onAddToOrder={(orderItem) => { addToCart(orderItem); setIsModalOpen(false); }}
      />
    </div>
  );
}