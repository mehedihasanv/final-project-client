import React, { useEffect, useState } from "react";
import api from "../../services/apiClient"; // তোমার axios instance import করো

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs"); // backend থেকে blogs ফেচ করা
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-12">Loading blogs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">ContestHub Blog</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
        Stay updated with the latest contests, tips, and announcements.
      </p>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {blog.description.slice(0, 100)}...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span>{blog.author}</span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
