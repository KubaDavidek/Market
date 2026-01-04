import type { Meme, MemeApi } from "../types/meme";

const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"] as const;

type ImgflipResponse = {
  success: boolean;
  data: { memes: MemeApi[] };
};

function randomRating(): number {
  return Math.floor(Math.random() * 5) + 1; 
}

function randomCategory(): string {
  const i = Math.floor(Math.random() * CATEGORIES.length);
  return CATEGORIES[i];
}

export async function fetchMemes(): Promise<Meme[]> {
  const res = await fetch("https://api.imgflip.com/get_memes");
  if (!res.ok) throw new Error("Nepodařilo se načíst memy (HTTP error).");

  const json = (await res.json()) as ImgflipResponse;
  if (!json.success) throw new Error("API vrátilo success=false.");

  
  return json.data.memes.map((m) => ({
    ...m,
    rating: randomRating(),
    category: randomCategory(),
  }));
}

export const memeCategories = CATEGORIES;
