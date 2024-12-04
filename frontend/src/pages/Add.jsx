import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Main Add Function:
const Add = () => {
  const [book, setbook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  }); // using useState to handle the state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setbook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //axios to post
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book); //json obj : book
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(book);

  return (
    <div className="form">
      <h1> Add New Book </h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="Price:"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
      />
      <button onClick={handleClick}>ADD</button>
    </div>
  );
};

export default Add;
