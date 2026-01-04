import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

export default function RequireAuth({ children }: Props) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
