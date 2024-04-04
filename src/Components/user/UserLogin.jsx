import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export default function UserLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(ShopContext);

  const handleLogin = () => {
    // Validation logic
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password");
    } else {
      const storedData = localStorage.getItem('users');
      const datas = JSON.parse(storedData);
  
      // Check if username exists in stored data
      const userExists = datas.find(item => item.username === username);
  
      if (userExists) {
        // Username found, now check password
        if (userExists.password === password) {
          // Set user in context
          setUser(username);
          localStorage.setItem('user', username);
          navigate('/');
          console.log("User state after setUser:", user);
        } else {
          setError("Incorrect Password");
        }
      } else {
        setError("Invalid Username");
      }
    }
  };
  

  useEffect(() => {
    const storedData = localStorage.getItem('users')
    const datas = JSON.parse(storedData)
    setData(datas)
  }, []); // Log user whenever it changes

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-md-8 mt-5">
            <h2 className="display-4">Login</h2>
            <div className="formbrd border border-primary border-2 rounded mt-5">
              <div className="row ">
                <div className="col-md-2 "></div>
                <div className="col-md-8">
                  <form action="" className="align-items-center p-4">
                    <input
                      type="text"
                      className="form-control mt-5 w-100"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUser(e.target.value);
                        setError("");
                      }}
                    />
                    <input
                      type="password"
                      className="form-control mt-5"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                    />
                    {error && <div className="text-danger">{error}</div>}
                    <div
                      className="btn btn-outline-success mt-5 btn-sm w-50 mb-5"
                      onClick={handleLogin}
                    >
                      Login
                    </div>
                    <p>Don't have an Accoun? <span className="text-primary" role="button" onClick={()=>navigate('/register')}><u>Register</u></span></p>
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
