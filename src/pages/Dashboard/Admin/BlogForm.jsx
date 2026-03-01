import React, { useState } from "react";
import api from "../../../services/apiClient";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/blogs", formData);
      if (res.data.success) {
        alert("Blog added successfully!");
        setFormData({
          title: "",
          description: "",
          image: "",
          author: "",
          date: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
