const express = require("express");
const app = express();

//using middleware
app.use(express.json());

//defining route
app.get("/ping", (req, res) => {
    res.status(200).send({ message: "Hello" });
});

//exporting
module.exports = app;
