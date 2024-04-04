import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validation logic
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password");
    } else {
    navigate('panel');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-md-8 mt-5">
            <h2 className="display-4">Admin Login</h2>
            <div className="formbrd border border-primary border-2 rounded mt-5">
              <div className="row ">
                <div className="col-md-2 "></div>
                <div className="col-md-8">
                  <form action="" className="align-items-center p-4 mt-5">
                    <input
                      type="text"
                      className="form-control mt-5 w-100"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setError("")
                      }}
                    />
                    <input
                      type="password"
                      className="form-control mt-5"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError("")
                      }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                    <div
                      className="btn btn-outline-success mt-5 btn-sm w-50 mb-5"
                      onClick={handleLogin}
                    >
                      Login
                    </div>
                  </form>
                </div>
                <div className="col-md-2 "></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
