const express = require("express");

const app = express();

app.use(express.json());


// Custom Middleware
app.use((req, res, next) => {

    console.log(
        `${req.method} ${req.url}`
    );

    next();

});


// In-Memory Array
let students = [
    {
        id: 1,
        name: "Sujeet",
        course: "MERN"
    },
    {
        id: 2,
        name: "Rahul",
        course: "NodeJS"
    },
    {
        id: 3,
        name: "Ashu",
        course: "React"
    },
    {
        id: 4,
        name: "Amit",
        course: "Java"
    },
    {
        id: 5,
        name: "Rohit",
        course: "Python"
    }
];


// GET All Students
app.get("/students", (req, res) => {

    res.status(200).json(students);

});


// GET Student By ID
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);

});


// POST Add Student
app.post("/students", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added",
        student: newStudent
    });

});


// PUT Update Student
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name =
        req.body.name || student.name;

    student.course =
        req.body.course || student.course;

    res.status(200).json({
        message: "Student updated",
        student
    });

});


// DELETE Student
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students = students.filter(
        s => s.id !== id
    );

    res.status(200).json({
        message: "Student deleted"
    });

});


app.listen(3000, () => {

    console.log(
        "Server running on port 3000"
    );

});