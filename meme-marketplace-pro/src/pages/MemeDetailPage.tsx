import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useMemesStore } from "../memes/MemesContext";

function stars(rating: number) {
  return "⭐".repeat(rating);
}

export default function MemeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { memes, loading, error, ensureLoaded, getById } = useMemesStore();

  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  const meme = id ? getById(id) : undefined;

  const related = useMemo(() => {
    if (!meme) return [];
    return memes
      .filter((m) => m.category === meme.category && m.id !== meme.id)
      .slice(0, 3);
  }, [memes, meme]);

  return (
    <Container sx={{ py: 4 }}>
      <Button onClick={() => navigate("/memes")} sx={{ mb: 2 }}>
        ← Zpět na seznam
      </Button>

      {loading && <Typography>Načítám…</Typography>}

      {error && !loading && (
        <Typography color="error">Nepodařilo se načíst memy 😢</Typography>
      )}

      {!loading && !error && !meme && (
        <Typography color="error">Meme nenalezeno.</Typography>
      )}

      {!loading && !error && meme && (
        <>
          <Card>
            <CardMedia component="img" image={meme.url} alt={meme.name} />
            <CardContent>
              <Typography variant="h5">{meme.name}</Typography>

              <Typography sx={{ mt: 1 }}>
                Rating: {meme.rating} {stars(meme.rating)}
              </Typography>

              <Typography>Kategorie: {meme.category}</Typography>
              <Typography>
                Rozměry: {meme.width} × {meme.height}
              </Typography>

              <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
  variant="contained"
  onClick={() => addItem({ id: meme.id, name: meme.name, url: meme.url, rating: meme.rating })}
>
  Přidat do košíku
</Button>

                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Zpět
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* RELATED MEMES */}
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Related memes
          </Typography>

          {related.length === 0 ? (
            <Typography variant="body2">Žádné related memy v této kategorii.</Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              }}
            >
              {related.map((r) => (
                <Card key={r.id} sx={{ cursor: "pointer" }} onClick={() => navigate(`/memes/${r.id}`)}>
                  <CardMedia component="img" height="140" image={r.url} alt={r.name} sx={{ objectFit: "cover" }} />
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>
                      {r.name}
                    </Typography>
                    <Typography variant="body2">
                      {r.rating} {stars(r.rating)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
