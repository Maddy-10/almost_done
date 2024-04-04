import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "../assets/data/ProductList";
import Header from "./Header";


export default function Cart() {
  const params = useParams();
  console.log(params);

  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 
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

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundItem = products.find(product => product.p_id === params.id);
      setCartProduct(foundItem);
    }
  }, [params.id, products]);
  
  return (
    <>
    <Header/>
      <div>
        <div
          className="card m-2 mt-5 cursor-pointer"
          style={{ width: 300 }}
          role="button"
        >
          <div className="imgs">
            {cartProduct && (
              <img
                src={`http://localhost/shopserver/images/${cartProduct.p_img}`}
                height={150}
                width={180}
                alt={cartProduct.p_name}
                className="borderradious"
              />
            )}
          </div>
          <div className="card-body">
            {cartProduct && (
              <div className="card-title">
                <h5 className="card-title">{cartProduct.p_name}</h5>
                <h6>Price: {`₹${cartProduct.p_price}`}</h6>
                <p>{cartProduct.p_descrip}</p>
              </div>
            )}
            <div className="mb-3">
              {cartProduct && (
                cartProduct.p_stock > 0 ? (
                  <button className="btn btn-success">Available</button>
                ) : (
                  <p className="text-danger">Out of stock</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
