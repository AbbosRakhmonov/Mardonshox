import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid justify-content-space-between">
          <Link
            className="navbar-brand me-0"
            style={{
              fontWeight: "600",
            }}
            to={"/"}
          >
            Mardonshox
          </Link>
          <Link
            className="me-0"
            style={{
              color: "#0D6EFD",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "500",
              textDecoration: "none",
              fontSize: "1.2rem",
              backgroundColor: "white",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
            }}
            to={"/stats"}
          >
            Hisobot
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
