import React from "react";
import AdminPanel from "./AdminPanel";
import { ProductList } from "../admin/assets/data/ProductList";
import { useNavigate } from "react-router-dom";

export default function Panel() {
  const navigate=useNavigate();
  return (
    <>
    <div className="container">
      <h2 className="display-3">AdminPanel</h2>
      {/* <div className="d-flex flex-wrap justify-content-center">
        {ProductList.map((product) => (
          <AdminPanel {...product} />
        ))}
      </div> */}
        <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => navigate("add")}>
          Add New Product
        </button>
        <div>
        <button
          className="btn btn-success mx-2"
          onClick={() => navigate("userlist")}
        >
          Customers List
        </button>
        <button
          className="btn btn-success mx-2"
          onClick={() => navigate("orderlists")}
        >
          Order List
        </button>
        </div>
      </div>
      </div>
      <div className='d-flex flex-wrap justify-content-center'>
         <AdminPanel />
     </div>
    </>
  );
}
