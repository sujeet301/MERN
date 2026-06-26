const express = require('express');
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('home page');
// });

// app.get('/about', (req, res) => {
//     res.send('about page');
// });

// app.get('/contact', (req, res) => {
//     res.send('contact page');
// });

// //error handling
// app.use((req, res) => {
//     res.status(404).send('404 Not Found');
// });


let students = [
    { id: 1, name: 'sujeet', course: 'MERN' },
    { id: 2, name: 'rahul', course: 'MERN' },
    { id: 3, name: 'ashu', course: 'MERN' }
];      

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    student.name = req.body.name;
    student.course = req.body.course;
    res.json(student);
});

app.patch('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    if (req.body.name) {
        student.name = req.body.name;
    }
    if (req.body.course) {
        student.course = req.body.course;
    }
    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }
    students.splice(studentIndex, 1);
    res.json({ message: 'Student deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});