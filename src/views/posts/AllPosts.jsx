import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
} from "./redux/Types/blogs.js";

const BlogTable = () => {
  const dispatch = useDispatch();

  const fetchBlogs = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_BLOGS_REQUEST });
      try {
        const response = await fetch("http://localhost:5000/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogs = await response.json();
        // Map the fetched data to extract only the required attributes
        const simplifiedBlogs = blogs.map((blog) => ({
          _id: blog._id, // Include the ID here
          link: blog.link,
          image1: blog.image1,
          image2: blog.image2,
          categorie: blog.categorie,
        }));
        setBlogs(simplifiedBlogs);
        dispatch({ type: FETCH_BLOGS_SUCCESS, payload: simplifiedBlogs });
      } catch (error) {
        dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
      }
    };
  };

  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [Blogs, setBlogs] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => { // Modify the handleDelete function to accept the ID
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/${id}`, // Use the ID in the endpoint URL
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
  
      // If deletion is successful, update the local state to reflect the changes
      setBlogs(Blogs.filter((item) => item._id !== id)); // Filter out the deleted blog by its ID
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#003566] text-white">
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Lien
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Image 1
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Image 2
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Blogs &&
              Blogs.map((blog, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 text-sm">{blog.link}</td>
                  <td className="py-3 px-4 text-sm">
                    <img src={blog.image1} alt="Image 1" className="w-20 h-20" />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <img src={blog.image2} alt="Image 2" className="w-20 h-20" />
                  </td>
                  <td className="py-3 px-4 text-sm flex flex-row space-x-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash cursor-pointer mt-5"
                      onClick={() => handleDelete(blog._id)} // Pass the ID to the handleDelete function
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
