import { X, Minus, Plus, Check, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DishModal({ isOpen, onClose, item, onAddToOrder }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (item && item.product_variants?.length > 0) {
      setSelectedVariant(item.product_variants[0]);
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const handleAdd = () => {
    if (onAddToOrder) {
      onAddToOrder({
        ...item,
        variant: selectedVariant,
        quantity: quantity,
        totalPrice: (selectedVariant?.price || 0) * quantity
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
          />

          {/* The Sheet Itself */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-[100] rounded-t-[2rem] max-h-[90vh] overflow-y-auto pb-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/90 rounded-full shadow-md"
            >
              <X size={20} className="text-[var(--text-dark)]" />
            </button>

            {/* Hero Image (Responsive Height: h-56 on mobile, h-72 on desktop) */}
            <div className="relative h-56 md:h-72 w-full">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover rounded-t-[2rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-t-[2rem]"></div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-1 mb-1">
                  <span className="bg-[var(--gold-accent)] text-[var(--green-dark)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    PREMIUM
                  </span>
                </div>
                {/* Responsive Text Size: text-2xl on mobile, text-3xl on desktop */}
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-1">
                  {item.name}
                </h2>
                <p className="text-white/80 text-xs md:text-sm line-clamp-2">
                  {item.description || 'Authentic Nigerian cuisine prepared fresh.'}
                </p>
              </div>
            </div>

            {/* Content Area (Less padding on mobile: p-5) */}
            <div className="p-5 md:p-8 space-y-6 bg-white">
              
              {/* Variants */}
              <div>
                <h3 className="text-sm font-bold text-[var(--text-medium)] uppercase tracking-wider mb-3">Select Size</h3>
                <div className="space-y-2">
                  {item.product_variants?.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full p-3 md:p-4 rounded-xl border flex justify-between items-center transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-[var(--green-primary)] bg-green-50 shadow-sm'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom Radio Button */}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedVariant?.id === variant.id
                            ? 'border-[var(--green-primary)] bg-[var(--green-primary)]'
                            : 'border-stone-300'
                        }`}>
                          {selectedVariant?.id === variant.id && <Check size={12} className="text-white" />}
                        </div>
                        <span className={`font-semibold text-sm md:text-base ${
                          selectedVariant?.id === variant.id ? 'text-[var(--green-primary)]' : 'text-gray-600'
                        }`}>
                          {variant.size_label}
                        </span>
                      </div>
                      <span className="font-bold text-base md:text-lg text-[var(--green-primary)]">
                        £{variant.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add Button */}
              <div className="flex gap-4 items-center pt-2">
                <div className="flex items-center bg-stone-100 rounded-xl p-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center active:scale-95"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 bg-[var(--green-primary)] text-white rounded-lg shadow-md flex items-center justify-center active:scale-95"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 h-12 md:h-14 rounded-xl font-bold text-sm md:text-base flex justify-between items-center px-5 shadow-lg active:scale-95 transition-transform ${
                    showSuccess ? 'bg-green-600' : 'bg-[var(--green-primary)]'
                  } text-white`}
                >
                  <span>{showSuccess ? 'Added!' : 'Add to Order'}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs md:text-sm">
                    £{((selectedVariant?.price || 0) * quantity).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
