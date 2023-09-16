import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/savedProducts/ids/${userID}`
        );
        setSavedProducts(response.data.savedProducts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    fetchSavedProducts();
  }, []);

  const saveProduct = async (productID) => {
    try {
      const response = await axios.put("http://localhost:3001/products", {
        productID,
        userID,
      });
      setSavedProducts(response.data.savedProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const isProductSaved = (id) => savedProducts.includes(id);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <h2>{product.name}</h2>
              <button
                onClick={() => saveProduct(product._id)}
                disabled={isProductSaved(product._id)}
              >
                {isProductSaved(product._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="summary">
              <p>{product.summary}</p>
            </div>
            <img src={product.imageUrl} alt={product.name} />
            <div>
            <h3>Specifications:</h3>
            {product.specifications.map((specification, index) => (
              <p key={index}>{specification}</p>
            ))}
          </div>
            <p>Phone Number: {product.phone} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
