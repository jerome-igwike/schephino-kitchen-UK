"use client";
import { useCart } from '../../lib/CartContext';
import { Trash2, ArrowLeft, MessageCircle, CreditCard, Loader2, ShoppingCart, Sparkles, Award, Plus, Minus, Home as HomeIcon, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleWhatsApp = () => {
    let message = "🌟 Hello Schephino's Kitchen! I'd like to place an order:\n\n";
    cart.forEach((item) => {
      message += `🍽️ ${item.quantity}x ${item.name} (${item.variant.size_label}) - £${item.totalPrice.toFixed(2)}\n`;
    });
    message += `\n💰 Total: £${cartTotal.toFixed(2)}\n\nThank you!`;
    const phoneNumber = "447000000000";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStripe = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout unavailable. Please use WhatsApp to complete your order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please use WhatsApp to complete your order.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream-primary)]">
      {/* Header - Desktop & Mobile Optimized */}
      <div className="bg-gradient-to-b from-white to-[var(--cream-primary)] border-b border-[var(--cream-dark)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-3.5 bg-white rounded-2xl shadow-md border border-[var(--cream-dark)] hover:shadow-lg transition-all"
              >
                <ArrowLeft size={22} className="text-[var(--text-dark)]" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--green-primary)]">Your Cart</h1>
                <p className="text-[var(--text-medium)] text-sm md:text-base mt-1">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} ready to order
                </p>
              </div>
            </div>

            {/* Quick Actions (Desktop) */}
            <div className="hidden md:flex gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-[var(--cream-secondary)] hover:bg-[var(--cream-dark)] rounded-2xl font-semibold text-[var(--text-dark)] transition-all"
              >
                <UtensilsCrossed size={20} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 md:py-32 px-6"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[var(--cream-secondary)] to-[var(--cream-dark)] rounded-full flex items-center justify-center shadow-lg">
              <ShoppingCart size={56} className="text-[var(--text-light)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)] mb-4">Your cart is empty</h2>
            <p className="text-[var(--text-medium)] text-lg mb-8 max-w-md mx-auto">
              Discover our exquisite selection of premium Nigerian dishes and start your culinary journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="inline-flex items-center justify-center gap-3 btn-primary text-lg px-10 py-5 rounded-3xl">
                <Sparkles size={22} />
                Explore Our Menu
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-white border-2 border-[var(--green-primary)] text-[var(--green-primary)] font-semibold text-lg px-10 py-5 rounded-3xl hover:bg-[var(--cream-primary)] transition-all">
                <HomeIcon size={22} />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">Order Summary</h2>
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.cartId}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[var(--cream-dark)] hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                      {/* Image */}
                      <div className="relative h-32 md:h-36 md:w-36 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--cream-secondary)] to-[var(--cream-dark)]">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-[var(--text-dark)] mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-[var(--text-medium)] text-sm md:text-base mb-3">
                            {item.variant.size_label}
                          </p>
                          <div className="flex items-center gap-3 bg-[var(--cream-secondary)] px-4 py-2 rounded-2xl w-fit">
                            <span className="text-[var(--text-medium)] text-sm font-medium">Qty:</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-7 h-7 bg-white hover:bg-[var(--cream-dark)] rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} strokeWidth={2.5} className="text-[var(--text-dark)]" />
                            </button>
                            <span className="font-bold text-[var(--green-primary)] min-w-[1.5rem] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-7 h-7 bg-[var(--green-primary)] hover:bg-[var(--green-dark)] rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} strokeWidth={2.5} className="text-white" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-between mt-4 pt-4 border-t border-[var(--cream-dark)]">
                          <div>
                            <p className="text-xs text-[var(--text-light)] mb-1">Total Price</p>
                            <span className="text-2xl md:text-3xl font-bold text-[var(--green-primary)]">
                              £{item.totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.cartId)}
                            className="p-3 md:p-3.5 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors shadow-sm"
                          >
                            <Trash2 size={20} strokeWidth={2} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Sidebar */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-white border-2 border-[var(--green-primary)]/30 p-6 md:p-8 rounded-[2rem] shadow-2xl">
                {/* Premium Badge */}
                <div className="flex items-center justify-center gap-2 mb-6 pb-6 border-b border-[var(--cream-dark)]">
                  <Award size={20} className="text-[var(--gold-accent)]" />
                  <span className="text-sm font-semibold text-[var(--text-medium)] tracking-wide uppercase">Premium Checkout</span>
                </div>

                {/* Order Summary */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[var(--text-medium)]">
                    <span className="text-base">Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold text-lg">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-medium)]">
                    <span className="text-base">Delivery Fee</span>
                    <span className="font-semibold text-lg text-green-600">FREE</span>
                  </div>
                  <div className="h-px bg-[var(--cream-dark)]"></div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xl font-bold text-[var(--text-dark)]">Total</span>
                    <span className="text-4xl font-bold text-[var(--green-primary)]">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-4">
                  <motion.button
                    onClick={handleStripe}
                    disabled={isCheckingOut}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[var(--green-primary)] via-[var(--green-primary)] to-[var(--green-dark)] text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-[0_12px_40px_rgba(44,95,45,0.4)] transition-all disabled:opacity-70"
                  >
                    {isCheckingOut ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <CreditCard size={24} strokeWidth={2.5} />
                        <span>Secure Card Payment</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={handleWhatsApp}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white border-2 border-green-500 text-green-700 py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-50 transition-all shadow-lg"
                  >
                    <MessageCircle size={24} strokeWidth={2.5} />
                    <span>Order via WhatsApp</span>
                  </motion.button>

                  <p className="text-xs text-center text-[var(--text-light)] mt-4">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>

              {/* Continue Shopping (Mobile) */}
              <Link
                href="/"
                className="mt-4 w-full flex md:hidden items-center justify-center gap-2 px-6 py-4 bg-[var(--cream-secondary)] hover:bg-[var(--cream-dark)] rounded-2xl font-semibold text-[var(--text-dark)] transition-all"
              >
                <UtensilsCrossed size={20} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
