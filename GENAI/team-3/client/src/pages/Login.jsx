import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { api } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === "admin" ? "/admin" : "/employee");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api.login(username, password);
      login(data.user, data.token);
      navigate(data.user.role === "admin" ? "/admin" : "/employee");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Office Supply Management</h2>
        <p className="login-subtitle">Sign in to your account</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
