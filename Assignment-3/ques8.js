const express = require("express");
const app = express();

// middleware to parse json requests
app.use(express.json());

//route for home page
app.get("/", (req, res) => {
    res.end("Home page for Ques 8");
});

//route for post request
app.post("/input", (req, res, next) => {
    const userInput = req.body.input;
    if (!userInput) {
        const err = new Error("Invalid input");
        err.status = 400;
        next(err);
    } else {
        res.status(200).json(req.body.input);
        // res.end("User verified");
    }
});

//middleware for unauthorized user
app.use((req, res, next) => {
    const err = new Error("Unauthorized User");
    err.status = 401;
    next(err);
});

//custom middleware for error handling
app.use((err, req, res, next) => {
    const status = err.status;
    res.status(status).json({
        error: {
            message: err.message,
            status: status,
        },
    });
});

//starting server
app.listen(8000, () => {
    console.log("Server started");
});
