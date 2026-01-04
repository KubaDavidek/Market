import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        404
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Stránka nebyla nalezena.
      </Typography>

      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Zpět na dashboard
      </Button>
    </Container>
  );
}
