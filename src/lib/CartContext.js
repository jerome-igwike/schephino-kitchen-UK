"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from storage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('schephino_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('schephino_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity, totalPrice: item.variant.price * newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);