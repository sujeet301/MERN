// const http = require('http');

// const server = http.createServer((req, res) => {
// //    res.end('Hello, World!\n');
//     if (req.url === '/') {
//         res.end('home page\n');
//     }
//     else if (req.url === '/about') {
//         res.end('about page\n');
//     }
//     else {
//         res.end('404 page not found\n');
//     }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// 

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   if (req.url === "/users" ) {
//     fs.readFile("data.json", "utf8", (err, data) => {
//       if (err) {
//         res.end("Internal Server Error");
//         return;
//       }
//       res.end(data);
//     });
//   } else {
//     res.end("404 - Route Not Found");
//   } 
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });


const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });

    if (req.url === "/") {
        res.end("Welcome to Home Page");
    } 
    else if (req.url === "/about") {
        res.end("About Us Page");
    } 
    else if (req.url === "/contact") {
        res.end("Contact Us Page");
    } 
    else {
       
        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});