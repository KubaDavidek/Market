import { useEffect, useState } from "react";
import type { Meme } from "../types/meme";
import { fetchMemes } from "../api/memesApi";

export function useMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchMemes();
        if (alive) setMemes(data);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : "Neznámá chyba");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { memes, loading, error };
}
