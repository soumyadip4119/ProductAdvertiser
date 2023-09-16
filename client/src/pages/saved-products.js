import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/savedProducts/${userID}`
        );
        setSavedProducts(response.data.savedProducts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedProducts();
  }, []);
  return (
    <div>
      <h1>Saved Products</h1>
      <ul>
        {savedProducts.map((product) => (
          <li key={product._id}>
            <div>
              <h2>{product.name}</h2>
            </div>
            <div className="summary">
              <p>{product.summary}</p>
            </div>
            <img src={product.imageUrl} alt={product.name} />
            <div>
            <h3>Specifications:</h3>
            {product.specifications.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
            <p>Phone Number: {product.phone} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
