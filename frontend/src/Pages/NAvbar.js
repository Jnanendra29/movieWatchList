import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token") || null;
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <>
      <main className="navbar">
        <nav className="navlinks">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? { textDecoration: "underline" }
                : undefined
            }
            to="/"
          >
            <span style={{ fontSize: "1.25rem" }}>{token && "Home"}</span>
          </NavLink>
          <div className="user-options">
            {!token ? (
              <>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "underline" }
                      : undefined
                  }
                  to="/login"
                >
                  <span style={{ fontSize: "1.25rem" }}>
                    Login
                  </span>
                </NavLink>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "underline" }
                      : undefined
                  }
                  to="/register"
                >
                  <span style={{ fontSize: "1.25rem" }}>
                    Register
                  </span>
                </NavLink>
              </>
            ) : (
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : undefined
                }
                to="/register"
              >
                <span style={{ fontSize: "1.25rem" }} onClick={handleLogout}>
                  Logout
                </span>
              </NavLink>
            )}
          </div>
        </nav>
      </main>
      <Outlet />
    </>
  );
};

export default Navbar;
