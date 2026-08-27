"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

//defining cart types
export interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category: string;
  quantity: number;
  tag?: string;
  slug?: string;
  rating?: number;
  inStock?: boolean;
}

//omit quantity from the cartItem
export type AddToCartInput = Omit<CartItem, "quantity">;

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: AddToCartInput, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    //load data from localstorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shopping_cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse saved cart JSON", e);
        }
      }
    }
    return [];
  });

  //store cart data to the local storage
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);


  //handle add to cart
    const addToCart = (product: AddToCartInput, quantity: number = 1) => {
    setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
        return prev.map((item) =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        }
        return [...prev, { ...product, quantity }];
    });
    };

  //handle quantity
  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  //handle remove quantity
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };


  //clear all the carts data
  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};