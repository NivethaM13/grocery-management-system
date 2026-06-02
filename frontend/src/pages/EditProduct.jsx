import { useState } from "react";

import API from "../services/api";

function EditProduct() {

  const [productId, setProductId] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      image: "",
      rating: "",
      review: "",
      category: "",
      stock: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const response = await API.put(
        `/update-product/${productId}`,
        {
          ...formData,
          price: Number(formData.price),
          rating: Number(formData.rating),
          stock: Number(formData.stock),
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Edit Product
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleUpdate}
        >

          <input
            type="number"
            placeholder="Product ID"
            value={productId}
            onChange={(e) =>
              setProductId(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

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
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
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

          <input
            type="number"
            step="0.1"
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
            name="stock"
            placeholder="Available Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;