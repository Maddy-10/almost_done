import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(() => {
    // Retrieve customer details from localStorage
    const storedCustomerDetails = JSON.parse(localStorage.getItem("customerDetails")) || [];
    setCustomerDetails(storedCustomerDetails);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Customers Detail List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mobile</th>
            <th>Alternate Mobile</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Landmark</th>
          </tr>
        </thead>
        <tbody>
          {customerDetails.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customername}</td>
              <td>{customer.mobile}</td>
              <td>{customer.alterMobile}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.pincode}</td>
              <td>{customer.landmark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
