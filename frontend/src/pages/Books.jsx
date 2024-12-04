import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setbooks] = useState([]);

  //useeffect
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setbooks(res.data);
      } catch (error) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  //return body :
  return (
    <div>
      <h1 className="">Nevin Book Shop</h1>
      {books.map((book) => (
        <div className="">
          {book.cover && <img src={book.cover} />}
          <h2>{book.title}</h2>
          <p>{book.desc}</p>
          <span>{book.price}</span>
        </div>
      ))}
      <button className="">
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
