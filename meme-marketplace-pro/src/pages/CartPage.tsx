import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Navbar from "../components/Navbaar";
import layout from "../styles/AppLayout.module.css";
import { useCart } from "../cart/CartContext";

function stars(rating: number) {
  return "⭐".repeat(rating);
}

export default function CartPage() {
  const { items, addItem, decreaseCount, removeItem, clearCart, getTotalPrice } = useCart();
  const total = getTotalPrice();

  return (
    <div className={layout.page}>
      <div className={layout.panel}>
        <Navbar />
      </div>

      <div style={{ height: 16 }} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Košík
      </Typography>

      {items.length === 0 ? (
        <Typography>Košík je prázdný.</Typography>
      ) : (
        <>
          <Box sx={{ display: "grid", gap: 2 }}>
            {items.map((it) => (
              <Card key={it.meme.id} sx={{ display: "flex", alignItems: "stretch" }}>
                <CardMedia
                  component="img"
                  image={it.meme.url}
                  alt={it.meme.name}
                  sx={{ width: 180, objectFit: "cover" }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{it.meme.name}</Typography>
                  <Typography>
                    Rating: {it.meme.rating} {stars(it.meme.rating)}
                  </Typography>
                  <Typography>
                    Počet kusů: <b>{it.qty}</b>
                  </Typography>
                  <Typography>
                    Cena za kus: <b>{it.meme.rating * 25} Kč</b>
                  </Typography>

                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button variant="outlined" onClick={() => decreaseCount(it.meme.id)}>
                      –
                    </Button>
                    <Button variant="outlined" onClick={() => addItem(it.meme)}>
                      +
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => removeItem(it.meme.id)}>
                      Odebrat
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6">
              Celková cena: <b>{total} Kč</b>
            </Typography>

            <Button variant="outlined" color="error" onClick={clearCart}>
              Vyprázdnit košík
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
