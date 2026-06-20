const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "tasks.json";

// Get All Tasks
app.get("/tasks", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(FILE));
    res.json(tasks);
});

// Add Task
app.post("/tasks", (req, res) => {

    const tasks = JSON.parse(fs.readFileSync(FILE));

    const newTask = {
        id: Date.now(),
        text: req.body.text,    
        completed: false 
    };

    tasks.push(newTask);

    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

    res.json(newTask);
});

// Toggle Complete
app.put("/tasks/:id", (req, res) => {

    const tasks = JSON.parse(fs.readFileSync(FILE));

    const task = tasks.find(
        t => t.id == req.params.id
    );

    if(task){
        task.completed = !task.completed;
    }

    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

    res.json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {

    let tasks = JSON.parse(fs.readFileSync(FILE));

    tasks = tasks.filter(
        t => t.id != req.params.id
    );

    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

    res.json({message:"Deleted"});
});

app.listen(3000, () => {
    console.log("Server Running");
});