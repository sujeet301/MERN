const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const students = [
    { id: 1, name: "Sujeet", course: "MERN" },
    { id: 2, name: "Rahul", course: "NodeJS" },
    { id: 3, name: "Ashu", course: "React" },
    { id: 4, name: "Amit", course: "Java" },
    { id: 5, name: "Rohit", course: "Python" }
];

// GET API
app.get("/students", (req, res) => {
    res.json(students);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});