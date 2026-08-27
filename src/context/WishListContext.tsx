"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export type WishlistItem = Omit<CartItem, "quantity">;

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  
  //store wishlist data into localstorage
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shopping_wishlist");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse wishlist JSON", e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  //handle add to wishlist
  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  //handle remove wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  //handle toggle wishlists
  const toggleWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};