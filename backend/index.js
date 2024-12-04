import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//database connection with details
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nevin12345",
  database: "test",
});

//Route basic:
app.get("/", (req, res) => {
  res.json("Hello this is from backend ");
});

//ALL ROUTES :

//Create Route:
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Book has been created successfully ");
    }
  });
});

//Read Route :
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"; // query state in mysql and pass it as a argument using db-identifier.query
  db.query(q, (err, data) => {
    if (err) {
      res.status(401).json({ err: true, message: "Error occured" });
    } else {
      return res.json(data);
    }
  });
});

//Update Route :
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?,`price` = ?,`cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      res.json("Book has been updated successfully !");
    } else {
      res.json(err);
    }
  });
});

//Delete Route :
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) {
      res.json("Book has been deleted successfully !");
    } else {
      res.json(err);
    }
  });
});

app.listen(8800, () => {
  console.log("The Server is running!!");
});
