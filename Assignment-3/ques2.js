const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.end("Home page");
    } else if (req.method === "GET" && req.url === "/requests") {
        res.statusCode = 200;
        res.end("GET request");
    } else if (req.method === "POST" && req.url === "/requests") {
        res.statusCode = 200;
        res.end("POST request");
    } else {
        res.statusCode = 404;
        res.end("NOT FOUND");
    }
});

server.listen(8000, () => {
    console.log("Server started");
});
