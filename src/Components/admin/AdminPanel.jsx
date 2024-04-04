import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
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
          setLoading(false);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(
      "http://localhost/shopserver/api/products.php/" + id
    );

    setMsg(response.data.success);
  };

  return (
    <>
    
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(products) && products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="card m-2 mt-5" style={{ width: 300 }}>
            {msg && <p className="text-danger">{msg}</p>}
            <div className="imgs">
              <img
                src={`http://localhost/shopserver/images/${product.p_img}`}
                height={150}
                width={180}
                alt={product.p_name}
                className="borderradious"
              />
            </div>
            <div className="card-body">
              <div className="card-title">
                <h5 className="card-title">{product.p_name}</h5>
                <div className="h-25">
                  <p className="text-start">{product.p_descrip}</p>
                </div>
              </div>
              <div className="mb-3"></div>
              <div className="mb-3">
                <button
                  onClick={() => {
                    navigate(`del/${product.p_id}`);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </>
  );
}
