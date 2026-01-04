import React, { createContext, useContext, useMemo, useState } from "react";
import type { Meme } from "../types/meme";
import { fetchMemes } from "../api/memesApi";

type MemesContextValue = {
  memes: Meme[];
  loading: boolean;
  error: string | null;
  ensureLoaded: () => Promise<void>;
  getById: (id: string) => Meme | undefined;
};

const MemesContext = createContext<MemesContextValue | null>(null);

export function MemesProvider({ children }: { children: React.ReactNode }) {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ensureLoaded = async () => {
    if (memes.length > 0 || loading) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMemes();
      setMemes(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Neznámá chyba");
    } finally {
      setLoading(false);
    }
  };

  const getById = (id: string) => memes.find((m) => m.id === id);

  const value = useMemo(
    () => ({ memes, loading, error, ensureLoaded, getById }),
    [memes, loading, error]
  );

  return <MemesContext.Provider value={value}>{children}</MemesContext.Provider>;
}

export function useMemesStore() {
  const ctx = useContext(MemesContext);
  if (!ctx) throw new Error("useMemesStore musí být použit uvnitř <MemesProvider>.");
  return ctx;
}
