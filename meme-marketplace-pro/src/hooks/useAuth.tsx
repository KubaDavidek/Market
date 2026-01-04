import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

type User = {
  username: string;
};

type StoredUser = {
  username: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  loggedIn: boolean;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { value: auth, setValue: setAuth, remove: removeAuth } = useLocalStorage<User | null>(
    "auth",
    null
  );

  const { value: users, setValue: setUsers } = useLocalStorage<StoredUser[]>("users", []);

  function login(username: string, password: string): { ok: boolean; error?: string } {
    const existing = users.find((u) => u.username === username);

    if (existing) {
      if (existing.password !== password) {
        return { ok: false, error: "Špatné heslo." };
      }
    } else {
      setUsers([...users, { username, password }]);
    }

    setAuth({ username });
    return { ok: true };
  }

  function logout() {
    removeAuth();
    setAuth(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth,
      loggedIn: !!auth,
      login,
      logout,
    }),
    [auth, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
