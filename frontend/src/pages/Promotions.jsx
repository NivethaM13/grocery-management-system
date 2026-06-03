import { useState, useEffect } from "react";
import API from "../services/api";

function Promotions() {

  const [promotions, setPromotions] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    discount: "",
    status: ""
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await API.get("/promotions");
      setPromotions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePromotion = async (id) => {
    try {
      const response = await API.delete(
        `/delete-promotion/${id}`
      );

      alert(response.data.message);

      fetchPromotions();

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const editPromotion = (promotion) => {

    setEditId(promotion.id);

    setFormData({
      title: promotion.title,
      discount: promotion.discount,
      status: promotion.status
    });

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let response;

      if (editId) {

        response = await API.put(
          `/update-promotion/${editId}`,
          formData
        );

      } else {

        response = await API.post(
          "/add-promotion",
          formData
        );

      }

      alert(response.data.message);

      setFormData({
        title: "",
        discount: "",
        status: ""
      });

      setEditId(null);

      fetchPromotions();

    } catch (error) {

      console.log(error);

      alert("Failed");

    }

  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Promotions Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
      >

        <input
          type="text"
          name="title"
          placeholder="Promotion Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="discount"
          placeholder="Discount"
          value={formData.discount}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Promotion" : "Add Promotion"}
        </button>

      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Promotions List
      </h2>

      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {promotions.map((promotion) => (
            <tr key={promotion.id}>
              <td className="border p-2">{promotion.id}</td>
              <td className="border p-2">{promotion.title}</td>
              <td className="border p-2">{promotion.discount}</td>
              <td className="border p-2">{promotion.status}</td>

              <td className="border p-2 space-x-10">

                <button
                  onClick={() => editPromotion(promotion)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePromotion(promotion.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Promotions;