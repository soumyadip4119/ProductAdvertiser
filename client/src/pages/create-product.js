import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateProduct = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [product, setProduct] = useState({
    name: "",
    specifications: [],
    summary: "",
    imageUrl: "",
    phone: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSpecificationChange = (event, index) => {
    const { value } = event.target;
    const specifications = [...product.specifications];
    specifications[index] = value;
    setProduct({ ...product, specifications });
  };

  const handleAddSpecification = () => {
    const specifications = [...product.specifications, ""];
    setProduct({ ...product, specifications });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/products",
        { ...product },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Product Added");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <label htmlFor="specifications">Specifications</label>
        {product.specifications.map((specification, index) => (
          <input
            key={index}
            type="text"
            name="specifications"
            value={specification}
            onChange={(event) => handleSpecificationChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddSpecification}>
          Add Specification
        </button>
        <label htmlFor="summary">Description</label>
        <textarea
          id="summary"
          name="summary"
          value={product.summary}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={product.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
