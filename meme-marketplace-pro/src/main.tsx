import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./cart/CartContext";
import { MemesProvider } from "./memes/MemesContext";
import { AuthProvider } from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <MemesProvider>
        <BrowserRouter>
         <AuthProvider>
         <CartProvider>
          <App />
          </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </MemesProvider>
  </React.StrictMode>
);
