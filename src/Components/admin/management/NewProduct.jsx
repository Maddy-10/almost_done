import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  //Navigation
  const navigate = useNavigate();

  
  const [msg, setMsg] = useState(false);
  const [p_name, setP_name] = useState("");
  const [p_price, setP_price] = useState("");
  const [p_stock, setP_stock] = useState("");
  const [p_img, setP_img] = useState("");
  const [p_descrip, setP_descrip] = useState("");

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("p_name", p_name);
    formData.append("p_price", p_price);
    formData.append("p_stock", p_stock);
    formData.append("p_img", p_img);
    formData.append("p_descrip", p_descrip);
    const response = await axios.post(
      "http://localhost/shopserver/api/products.php",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setP_name("");
    setP_price("");
    setP_stock("");
    setP_descrip("");
    setP_img("");
    setMsg(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
    setTimeout(() => {
      navigate("/admin/panel");
      setMsg(false);
    }, 1000);
  };

  return (
    <div className="newproduct mt-5">
      <div className="container">
        <div className="formbdr border border-primary p-5 m-2 rounded">
          {msg && (
            <p className="border bg-success text-light fw-semibold fs-5 rounded">
              Product Added Successfully...!
            </p>
          )}
          <h2 className="display-5 mb-5">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="p_name"
                  className="form-group w-100 rounded mt-4 form-control"
                  placeholder="Product Name"
                  value={p_name}
                  onChange={(e) => setP_name(e.target.value)}
                />
                <input
                  type="number"
                  name="p_price"
                  className="form-group w-100 rounded mt-4 form-control"
                  placeholder="Product Price"
                  value={p_price}
                  onChange={(e) => setP_price(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="p_stock"
                  className="form-group w-100 rounded mt-4 form-control"
                  placeholder="Product Stock"
                  value={p_stock}
                  onChange={(e) => setP_stock(e.target.value)}
                />
                <input
                  type="file"
                  className="form-group rounded mt-4 ml-5 form-control"
                  onChange={(e) => setP_img(e.target.files[0])}
                />
              </div>
              <div className="col-md-12">
                <textarea
                  name="p_descrip"
                  cols="30"
                  rows="5"
                  placeholder="Product Description"
                  value={p_descrip}
                  onChange={(e) => setP_descrip(e.target.value)}
                  className="mt-4 w-100 rounded"
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-outline-success w-100 mt-4"
                >
                  <b>Add Product</b>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
