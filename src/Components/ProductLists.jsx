import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const {user,setuser}=useContext(ShopContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch("http://localhost/shopserver/api/products.php");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.productData && Array.isArray(data.productData)) {
          setProducts(data.productData);
          setLoading(false);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    getProduct();
  }, []);
  
  
  

  const handleCardClick = (productId) => {
    navigate(`/cart/${productId}`);
  };

  const buyproduct = (productId) => {
    if(user)
    {
      navigate(`/checkout/${productId}`)
    }
    else{
      navigate('/login')
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Array.isArray(products) && products.length > 0 ? (
          products.map((product,index) => (
            <div key={index} className="card m-2 mt-5 " style={{ width: 300 }}  >
              <div className="imgs cursor-pointer" role="button" onClick={() => handleCardClick(product.p_id)}>
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
                  <h6>Price: {`₹${product.p_price}`}</h6>
                </div>
                <div className="mb-3">
                  {product.p_stock > 0 ? (
                    <>
                    <button onClick={()=>buyproduct(product.p_id)} className="btn btn-success">Buy Now</button>
                    </>
                  ) : (
                    <p className="text-danger">Out of stock</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )
      )}
    </>
  );
}
