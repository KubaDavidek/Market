import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemeCardSkeleton from "../components/MemeCardSkeleton";
import { memeCategories } from "../api/memesApi";
import { useCart } from "../cart/CartContext";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useMemesStore } from "../memes/MemesContext";
import type { Meme } from "../types/meme";

import Navbar from "../components/Navbaar";
import layout from "../styles/AppLayout.module.css";
import styles from "./MemesPage.module.css";

type SortMode = "name_asc" | "rating_desc" | "size_desc";

function stars(rating: number) {
  return "⭐".repeat(rating);
}

export default function MemesPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { memes, loading, error, ensureLoaded } = useMemesStore();

  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortMode>("name_asc");

  const filtered = useMemo(() => {
    let list: Meme[] = memes;

    if (category !== "All") list = list.filter((m) => m.category === category);

    const q = debouncedSearch.trim().toLowerCase();
    if (q.length > 0) list = list.filter((m) => m.name.toLowerCase().includes(q));

    const sorted = [...list];
    if (sort === "name_asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "rating_desc") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "size_desc") sorted.sort((a, b) => b.width * b.height - a.width * a.height);

    return sorted;
  }, [memes, category, debouncedSearch, sort]);

  return (
    <div className={layout.page}>
      <div className={layout.panel}>
        <Navbar />
      </div>

      <div style={{ height: 16 }} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Memes
      </Typography>

    
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
          mb: 3,
        }}
      >
        <TextField
          label="Hledat podle názvu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="např. Drake"
        />

        <FormControl>
          <InputLabel>Kategorie</InputLabel>
          <Select label="Kategorie" value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            {memeCategories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Třídění</InputLabel>
          <Select label="Třídění" value={sort} onChange={(e) => setSort(e.target.value as SortMode)}>
            <MenuItem value="name_asc">Název A–Z</MenuItem>
            <MenuItem value="rating_desc">Rating (sestupně)</MenuItem>
            <MenuItem value="size_desc">Velikost (w×h)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      
      {loading && (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          }}
        >
          <MemeCardSkeleton />
          <MemeCardSkeleton />
          <MemeCardSkeleton />
        </Box>
      )}

      {error && !loading && (
        <Typography color="error" sx={{ mt: 2 }}>
          Nepodařilo se načíst memy 😢
        </Typography>
      )}

     
      {!loading && !error && (
        <>
          <Typography sx={{ mb: 2 }}>
            Zobrazeno: <b>{filtered.length}</b>
          </Typography>

          <div className={styles.grid}>
            {filtered.map((m) => (
              <Card key={m.id} sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" image={m.url} alt={m.name} className={styles.cardImg} />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {m.name}
                  </Typography>
                  <Typography variant="body2">Kategorie: {m.category}</Typography>
                  <Typography variant="body2">
                    Rating: {m.rating} {stars(m.rating)}
                  </Typography>
                  <Typography variant="body2">
                    Velikost: {m.width}×{m.height}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" onClick={() => navigate(`/memes/${m.id}`)}>
                    Detail
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => addItem({ id: m.id, name: m.name, url: m.url, rating: m.rating })}
                  >
                    Přidat do košíku
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
