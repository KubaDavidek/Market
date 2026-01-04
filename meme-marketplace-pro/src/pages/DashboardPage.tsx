import { Box, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbaar";
import layout from "../styles/AppLayout.module.css";
import { useMemes } from "../hooks/useMemes";
import { useCart } from "../cart/CartContext";

export default function DashboardPage() {
  const { memes, loading, error } = useMemes();
  const { itemsCount } = useCart();

  const memeCount = memes.length;
  const categoriesCount = new Set(memes.map((m) => m.category)).size;

  const topMeme =
    memes.length > 0
      ? memes.reduce((best, cur) => (cur.rating > best.rating ? cur : best), memes[0])
      : null;

  return (
    <div className={layout.page}>
      <div className={layout.panel}>
        <Navbar />
      </div>

      <div style={{ height: 16 }} />

      {loading && <Typography>Načítám memy…</Typography>}
      {error && <Typography color="error">Chyba: {error}</Typography>}

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">Počet meme</Typography>
            <Typography variant="h4">{memeCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Počet kategorií</Typography>
            <Typography variant="h4">{categoriesCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Položky v košíku</Typography>
            <Typography variant="h4">{itemsCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Nejoblíbenější meme</Typography>
            {topMeme ? (
              <>
                <Typography sx={{ mt: 1 }}>
                  <b>{topMeme.name}</b>
                </Typography>
                <Typography>Rating: {topMeme.rating} / 5</Typography>
                <Typography>Kategorie: {topMeme.category}</Typography>
              </>
            ) : (
              <Typography sx={{ mt: 1 }}>—</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
