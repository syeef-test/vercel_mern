import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:3000/books/${id}`);
        setAuthor(response.data.data.author);
        setTitle(response.data.data.title);
        setPublishYear(response.data.data.publishYear);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        alert("An error occurred, please see the console");
      }
    };

    fetchData(); // Fetch data when component mounts based on id
  }, [id]); // Add `id` to the dependency array

  const handleEditBook = async () => {
    try {
      const data = {
        title,
        author,
        publishYear,
      };
      setLoading(true);

      const response = await axios.put(
        `http://127.0.0.1:3000/books/${id}`,
        data
      );
      setLoading(false);
      alert("Book updated successfully!"); // You can handle success message as per your requirement
      navigate("/"); // Navigate back to the main page after saving
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("An error occurred, please check the console");
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;