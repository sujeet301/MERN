const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

// About Route
app.get("/about", (req, res) => {
    res.send("About Us Page");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.send("Contact Us Page");
});

// Services Route
app.get("/services", (req, res) => {
    res.send("Our Services Page");
});

// Handle Unknown Routes
app.use((req, res) => {
    res.status(404).send("404 Page Not Found");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});