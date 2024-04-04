import React from 'react';
import { useNavigate } from 'react-router-dom';

const Orderlists = () => {
  const navigate = useNavigate();

  // Retrieve order list from localStorage
  const orderList = JSON.parse(localStorage.getItem('orderlist')) || [];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order Lists</h2>
      <div className="mb-3">
        <button className="btn btn-primary " onClick={() => navigate('../')}>Go Back</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr key={index}>
              <td>{order.customername}</td>
              <td>{order.product}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orderlists;
