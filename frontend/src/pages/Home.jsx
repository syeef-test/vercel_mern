import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import { BiInfoCircle } from "react-icons/bi";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vercel-mern-bookstore-server.vercel.app/books"
        );
        setBooks(response.data.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : books.length === 0 ? ( // Check if there are no books
        <p>No books available.</p>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border-slate-600 rounded-md">No</th>
              <th className="border-slate-600 rounded-md">Title</th>
              <th className="border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BiInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
