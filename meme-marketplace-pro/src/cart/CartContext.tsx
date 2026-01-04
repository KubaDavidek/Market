import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export type CartMeme = {
  id: string;
  name: string;
  url: string;
  rating: number;
};

export type CartItem = {
  meme: CartMeme;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  itemsCount: number;
  addItem: (meme: CartMeme) => void;
  removeItem: (id: string) => void;
  decreaseCount: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const cartKey = `cart_${user?.username || "guest-confirm"}`;

  const [items, setItems] = useState<CartItem[]>([]);

  // load when user changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(cartKey);
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, [cartKey]);

  // save when items change
  useEffect(() => {
    try {
      localStorage.setItem(cartKey, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [cartKey, items]);

  function addItem(meme: CartMeme) {
    if (!meme || !meme.id) return;

    setItems((prev) => {
      const existing = prev.find((x) => x.meme.id === meme.id);
      if (existing) {
        return prev.map((x) => (x.meme.id === meme.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { meme, qty: 1 }];
    });
  }

  function decreaseCount(id: string) {
    setItems((prev) => {
      const existing = prev.find((x) => x.meme.id === id);
      if (!existing) return prev;

      if (existing.qty <= 1) return prev.filter((x) => x.meme.id !== id);

      return prev.map((x) => (x.meme.id === id ? { ...x, qty: x.qty - 1 } : x));
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((x) => x.meme.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  function getTotalPrice() {
    return items.reduce((sum, it) => sum + it.qty * (it.meme.rating * 25), 0);
  }

  const itemsCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    itemsCount,
    addItem,
    removeItem,
    decreaseCount,
    clearCart,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
