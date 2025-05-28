import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role || "user");

      // If your backend returns role info, store it too
      // localStorage.setItem('role', data.role || 'user');
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default LoginPage;
