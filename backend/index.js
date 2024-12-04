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

//Routes:
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

//post:
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Book has been created successfully ");
    }
  });
});

app.listen(8800, () => {
  console.log("The Server is running!!");
});
