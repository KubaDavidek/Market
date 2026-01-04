import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) =>
    location.pathname === path || (path === "/memes" && location.pathname.startsWith("/memes"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Meme Marketplace
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          přihlášen: <b>{user?.username || "—"}</b>
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          variant={isActive("/dashboard") ? "contained" : "outlined"}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>

        <Button
          variant={isActive("/memes") ? "contained" : "outlined"}
          onClick={() => navigate("/memes")}
        >
          Memes
        </Button>

        <Button
          variant={isActive("/cart") ? "contained" : "outlined"}
          onClick={() => navigate("/cart")}
        >
          Košík
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          Odhlásit
        </Button>
      </Box>
    </Box>
  );
}
