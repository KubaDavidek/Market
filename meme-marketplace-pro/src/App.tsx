import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MemesPage from "./pages/MemesPage";
import MemeDetailPage from "./pages/MemeDetailPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />

      <Route
        path="/memes"
        element={
          <RequireAuth>
            <MemesPage />
          </RequireAuth>
        }
      />

      <Route
        path="/memes/:id"
        element={
          <RequireAuth>
            <MemeDetailPage />
          </RequireAuth>
        }
      />

      <Route
        path="/cart"
        element={
          <RequireAuth>
            <CartPage />
          </RequireAuth>
        }
      />


      <Route path="/" element={<Navigate to="/login" replace />} />


      <Route
        path="*"
        element={
          <RequireAuth>
            <NotFoundPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
