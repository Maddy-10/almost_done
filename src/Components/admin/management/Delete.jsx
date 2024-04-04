import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Delete() {
  const params = useParams();
  console.log(params);
  const navigate =useNavigate();

  const [msg,setMsg]=useState("")
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [loading, setLoading] = useState(false);
 
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
    setLoading(true)
    const response= await axios.delete("http://localhost/shopserver/api/products.php/"+id);

    setMsg(response.data.success);
    setTimeout(()=>{
      navigate('../');
      setLoading(false)
    },2000)
  }

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundItem = products.find(product => product.p_id === params.id);
      setDeleteProduct(foundItem);
    }
  }, [params.id, products]);
  
  return (
    <>
    
      <div>
        <div
          className="card m-2 mt-5 cursor-pointer"
          style={{ width: 300 }}
          role="button"
        >
          <div className="imgs">
            {deleteProduct && (
              <img
                src={`http://localhost/shopserver/images/${deleteProduct.p_img}`}
                height={150}
                width={180}
                alt={deleteProduct.p_name}
                className="borderradious"
              />
            )}
          </div>
          <div className="card-body">
            {deleteProduct && (
              <div className="card-title">
                <h5 className="card-title">{deleteProduct.p_name}</h5>
                <h6>Price: {`₹${deleteProduct.p_price}`}</h6>
                <p>{deleteProduct.p_descrip}</p>
              </div>
            )}
            <div className="mb-3">
              {deleteProduct && (
                deleteProduct.p_stock > 0 && (
                  <button className="btn btn-success" disabled={loading} onClick={()=>handleDelete(deleteProduct.p_id)}>Delete</button>
                ) 
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
