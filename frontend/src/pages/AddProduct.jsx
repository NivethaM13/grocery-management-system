import { useState } from "react";

import API from "../services/api";

function AddProduct() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/add-product",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        rating: "",
        review: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to add product");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Add Product
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >

            <option value="">
              Select Category
            </option>

            <option value="Fruits">
              Fruits
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Soft Drinks">
              Soft Drinks
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Bakery">
              Bakery
            </option>

          </select>

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="review"
            placeholder="Review"
            value={formData.review}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Available Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;