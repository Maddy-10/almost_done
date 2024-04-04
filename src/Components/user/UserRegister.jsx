import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import bcrypt from 'bcryptjs';
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { setUser } = useContext(ShopContext);
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: ''
  })

  const register = async () => {
    const encryptPassword = await bcrypt.hash(formValue.password, 10);
    // Send the encrypted password to the server for registration
    const formData = {
      username:formValue.username,
      email:formValue.email,
      password:encryptPassword
    }
    // console.log(formData);
    const res = await axios.post("http://localhost/shopserver/api/register.php",formData);
  }

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const handleRegister = () => {
    // Clear any previous errors
    setError("");

    // Validation logic
    if (formValue.username.trim() === "") {
      setError("Please enter username");
    } else if (formValue.email.trim() === "") {
      setError("Enter email");
    } else if (!emailPattern.test(formValue.email)) {
      setError("Enter Valid email");
    } else if (formValue.password.trim() === "") {
      setError("Please enter password");
    } else {
      // Store user data in local storage (Not recommended for real-world applications)
      const existingUserData = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUserData = [...existingUserData, formValue];
      localStorage.setItem("users", JSON.stringify(updatedUserData));
      
      // Perform registration
      register();

      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-md-8 mt-5">
            <h2 className="display-4">Register</h2>
            <div className="formbrd border border-primary border-2 rounded mt-5">
              <div className="row ">
                <div className="col-md-2 "></div>
                <div className="col-md-8">
                  <form action="" className="align-items-center p-4">
                    <input
                      type="text"
                      className="form-control mt-5 w-100"
                      placeholder="Username"
                      name="username"
                      value={formValue.username}
                      onChange={handleInput}
                    />
                    <input
                      type="email"
                      className="form-control mt-5 w-100"
                      placeholder="E-mail"
                      name="email"
                      value={formValue.email}
                      onChange={handleInput}
                    />
                    <input
                      type="password"
                      className="form-control mt-5"
                      placeholder="Password"
                      name="password"
                      value={formValue.password}
                      onChange={handleInput}
                    />
                    {error && <div className="text-danger">{error}</div>}
                    <div
                      className="btn btn-outline-success mt-5 btn-sm w-50 mb-5"
                      onClick={handleRegister}
                    >
                      Register
                    </div>
                    <p>Already have an Account? <span className="text-primary" role="button" onClick={() => navigate('/login')}><u>Login</u></span></p>
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
