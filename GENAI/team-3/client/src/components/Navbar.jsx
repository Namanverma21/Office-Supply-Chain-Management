import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Office Supply Manager</Link>
      </div>
      <div className="navbar-links">
        {user.role === "admin" && (
          <>
            <Link to="/admin">Pending Requests</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/history">Request History</Link>
          </>
        )}
        {user.role === "employee" && (
          <Link to="/employee">My Dashboard</Link>
        )}
        <span className="navbar-user">
          {user.username} ({user.role})
        </span>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}
