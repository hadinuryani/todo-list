const http = require("http");
const fs = require("fs");
const path = require("path");

const tasks = []; 

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "pages", "index.html");
    fs.readFile(filePath, (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }


  else if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url);
    const ext = path.extname(filePath);
    const contentTypes = {
      ".js": "text/javascript",
      ".css": "text/css",
    };
    const contentType = contentTypes[ext] || "text/plain";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }

  else if (req.url === "/tasks" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  }


  else if (req.url === "/add-task" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { task } = JSON.parse(body);
      if (task && task.trim() !== "") {
        tasks.push(task.trim());
        res.writeHead(200);
        res.end("Task ditambahkan");
      } else {
        res.writeHead(400);
        res.end("Task tidak valid");
      }
    });
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3001, () => {
  console.log("Server nyala di http://localhost:3001");
});
