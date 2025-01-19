const express = require("express");
const app = express();

//creating middleware for logging
function logRequests(req, res, next) {
    const newLog = new Date().toISOString();
    console.log(`${newLog} ${req.method} ${req.url}`);
    next();
}

//middlware for authentication
function authenticate(req, res, next) {
    const token = req.headers["authenticate"]; //fetch token from request

    if (token === "verified") {
        next();
    } else {
        res.status(401).end("Unauthorised");
    }
}

//using logging middleware
app.use(logRequests);

app.get("/", (req, res) => {
    res.end("Home page for ques6");
});

//using middleware for protected route
app.get("/protected", authenticate, (req, res) => {
    res.send("This is a protected route");
});

app.listen(8000, () => {
    console.log("Server started");
});
