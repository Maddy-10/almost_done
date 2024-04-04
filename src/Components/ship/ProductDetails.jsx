import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

const ProductDetails = () => {
  const params = useParams();
  const [productdata, setProductdata] = useState(null);
  const [products, setProducts] = useState([]); // Define products state
  const [qty, setQty] = useState(1);
  const [limit, setLimit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost/shopserver/api/products.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (data.productData && Array.isArray(data.productData)) {
          setProducts(data.productData);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProduct();
  }, []); // Fetch products on component mount

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundItem = products.find((product) => product.p_id === params.id);
      setProductdata(foundItem);
    }
  }, [params.id, products]);

  const qtyIn = (e) => {
    e.preventDefault();
    const limit = productdata.p_stock;
    if (qty < limit) {
      setQty(qty + 1);
      setLimit(false);
    } else {
      setLimit(true);
    }
  };

  const qtyDec = (e) => {
    e.preventDefault();
    if (qty > 1) {
      setQty(qty - 1);
      setLimit(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch username from localStorage
    const username = localStorage.getItem("user");

    // Collect order details
    const orderDetails = {
      customername: username,
      product: productdata.p_name,
      price: productdata.p_price,
      quantity: qty,
      total: productdata.p_price * qty,
    };

    // Get existing orders from localStorage or initialize an empty array
    const existingOrders = JSON.parse(localStorage.getItem("orderlist")) || [];
    // Append the new order to the existing orders
    existingOrders.push(orderDetails);
    // Store the updated orders back in localStorage
    localStorage.setItem("orderlist", JSON.stringify(existingOrders));

    // Redirect to the shipment page or perform any other action
    navigate("/shipment");
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="formbdr border border-primary p-5 m-2 rounded">
          <h2 className="display-5 mb-5">Confirm Your Order</h2>
          {productdata && (
            <form onSubmit={handleSubmit}>
              <div className="row ">
                <div className="col-md-12 ">
                  <div className="formcontent">
                    <div className="d-flex">
                      <div className="label mt-4 p-2">
                        <label className="">Product </label>
                      </div>

                      <input
                        type="text"
                        name="p_name"
                        className="form-group w-50 rounded mt-4 form-control"
                        value={productdata.p_name}
                        disabled
                      />
                    </div>

                    <div className="d-flex">
                      <div className="label mt-4 p-2">
                        <label className="">Price</label>
                      </div>

                      <input
                        type="number"
                        name="p_price"
                        className="form-group w-50 rounded  mt-4 form-control"
                        value={productdata.p_price}
                        disabled
                      />
                    </div>

                    <div className="d-flex justyfy-content-between w-100">
                      <div className="d-flex  ">
                        <button className="btn btn-secondary m-3" onClick={qtyIn}>
                          +
                        </button>
                        <input
                          type="number"
                          name="p_stock"
                          className="form-group w-25 rounded mt-2 form-control"
                          placeholder="Product Quantity"
                          value={qty}
                          disabled
                        />
                        <button className="btn btn-secondary m-3" onClick={qtyDec}>
                          -
                        </button>
                        {limit && (
                          <p className="text-danger">Reached Stock Limit...!</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="form-group rounded mt-4 ml-5 form-control w-25"
                        disabled
                        value={`Total : ${productdata.p_price * qty}`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-success  mt-4 buynow"
                    >
                      <b>Buy Now</b>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
