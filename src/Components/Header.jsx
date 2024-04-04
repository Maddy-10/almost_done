import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Header() {
  const { user, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("user");
    if (User) {
      setUser(User);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    // Refresh the window
    // Reload the webpage without reloading the browser
    window.location.href = window.location.href;
  };
  return (
    <section>
      <div className="containers">
        <nav className="navbar  navbar-light bg-primary ">
          <div className="container">
            <a className="navbar-brand">
              
                <NavLink to={"/"}><h1 id="head" className="text-light">Shop</h1></NavLink>
              
            </a>

            {user ? (
              <div className="d-flex">
                <div className="text-light fs-3 fw-semibold">User:{user}</div>
                <div className="text-light fs-3 fw-semibold px-3"> | </div>
                <div
                  className="btn btn-warning btn-sm"
                  role="button"
                  onClick={logout}
                >
                  <div className="text-dark fs-5 fw-semibold">Logout</div>
                </div>
              </div>
            ) : (
              <div
                className="btn btn-warning btn-sm"
                role="button"
                onClick={() => navigate("/login")}
              >
                <div className="text-dark fs-5 fw-semibold">Login</div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
}
