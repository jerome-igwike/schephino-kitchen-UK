import { Star, ChefHat, Clock } from 'lucide-react';

export default function DishCard({ item }) {
  const prices = item.product_variants?.map(v => v.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer border border-[var(--cream-dark)] h-full">
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-[var(--cream-secondary)] to-[var(--cream-dark)]">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Star size={14} className="text-[var(--gold-accent)] fill-[var(--gold-accent)]" />
          <span className="text-xs font-bold text-[var(--green-primary)]">Premium</span>
        </div>
        
        {/* Time Badge */}
        <div className="absolute top-4 left-4 bg-[var(--green-primary)]/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Clock size={14} className="text-white" />
          <span className="text-xs font-bold text-white">30-40 min</span>
        </div>

        {/* Chef's Pick */}
        <div className="absolute bottom-4 left-4 bg-[var(--gold-accent)]/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
          <ChefHat size={14} className="text-white" />
          <span className="text-xs font-bold text-white">Chef's Special</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-dark)] mb-2 leading-tight group-hover:text-[var(--green-primary)] transition-colors line-clamp-2">
          {item.name}
        </h3>
        
        <p className="text-[var(--text-medium)] text-sm leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
          {item.description || 'Expertly crafted traditional Nigerian dish with authentic spices and premium ingredients'}
        </p>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--cream-dark)]">
          <div>
            <p className="text-xs text-[var(--text-light)] mb-1 font-medium">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-[var(--green-primary)]">
                £{minPrice.toFixed(2)}
              </span>
              {maxPrice > minPrice && (
                <span className="text-sm text-[var(--text-light)]">- £{maxPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-[var(--green-primary)] to-[var(--green-dark)] text-white px-5 md:px-6 py-3 md:py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
