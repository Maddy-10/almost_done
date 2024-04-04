import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

export default function Shipment() {
  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [btnOf, setBtnOf] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    customername: "",
    mobile: "",
    alterMobile: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  const [alter, setAlter] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        customername: storedUser,
      }));
    }
  }, [setUser]);

  const submit = (e) => {
    e.preventDefault();
    setBtnOf(true);
  
    // Retrieve existing customer details from localStorage
    const storedCustomerDetails = JSON.parse(localStorage.getItem("customerDetails")) || [];
  
    // Check if the current customer details already exist in the array
    const existingCustomerIndex = storedCustomerDetails.findIndex(
      (customer) =>
        customer.customername === customerDetails.customername ||
        customer.mobile === customerDetails.mobile
    );
  
    if (existingCustomerIndex !== -1) {
      // Customer details already exist, navigate back to home
      navigate("/");
    } else {
      // Append the current customer details to the array
      const updatedCustomerDetails = [...storedCustomerDetails, customerDetails];
  
      // Store the updated array back into localStorage
      localStorage.setItem("customerDetails", JSON.stringify(updatedCustomerDetails));
      setTimeout(() => {
        navigate("/");
        setCustomerDetails({
          customername: "",
          mobile: "",
          alterMobile: "",
          address: "",
          city: "",
          pincode: "",
          landmark: "",
        });
        setBtnOf(false);
      }, 2000);
    }
  };
  
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="container mt-3">
        <h1 className="display-5">Shipping Details</h1>
        <form onSubmit={submit} className="mt-5">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control mt-4"
                placeholder="Username"
                value={customerDetails.customername}
                disabled
              />
              <input
                type="number"
                className="form-control mt-4"
                placeholder="Mobile number"
                name="mobile"
                value={customerDetails.mobile}
                onChange={handleInputChange}
              />
              {alter ? (
                <input
                  type="number"
                  className="form-control mt-4"
                  placeholder="Alternate Mobile number"
                  name="alterMobile"
                  value={customerDetails.alterMobile}
                  onChange={handleInputChange}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setAlter(true)}
                  className="btn mt-4 btn-primary btn-sm d-flex justify-content-start"
                >
                  <FaPlus className="my-auto mx-2" size={20} /> Alternate Mobile
                  Number
                </button>
              )}
              <textarea
                className="form-control mt-4"
                placeholder="Enter your address"
                name="address"
                value={customerDetails.address}
                onChange={handleInputChange}
              ></textarea>
              <input
                type="text"
                className="form-control mt-4"
                placeholder="City"
                name="city"
                value={customerDetails.city}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="form-control mt-4"
                placeholder="Pincode"
                name="pincode"
                value={customerDetails.pincode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control mt-4"
                placeholder="Landmark"
                name="landmark"
                value={customerDetails.landmark}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-1"></div>
          </div>
          <div className="m-5">
            <button className="btn btn-primary" type="submit" disabled={btnOf}>
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
