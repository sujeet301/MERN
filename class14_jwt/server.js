const express = require("express");

const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");

const secretKey = "hello_world";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
});


const token = jwt.sign({ 
    userId: 123,
    username: "john_doe"
}, secretKey, { expiresIn: "1h" });


