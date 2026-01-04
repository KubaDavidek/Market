import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import layout from "../styles/AppLayout.module.css";
import styles from "./LoginPage.module.css";

type Errors = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};

    const u = username.trim();
    if (u.length < 3) e.username = "Username musí mít alespoň 3 znaky.";
    if (password.length < 5) e.password = "Password musí mít alespoň 5 znaků.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const res = login(username.trim(), password);

if (!res.ok) {
  setErrors({ password: res.error });
  return;
}

navigate("/dashboard", { replace: true });
  }

  return (
    <div className={layout.page}>
      <div className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>
                Username
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  placeholder="min. 3 znaky"
                />
              </label>
              {errors.username && <div className={styles.error}>{errors.username}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="min. 5 znaků"
                />
              </label>
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>

            <button type="submit" className={styles.button}>
              Přihlásit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
