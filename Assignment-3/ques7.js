const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

//using body parser
app.use(bodyParser.json());

//creating secret key
const secret_key = "puneet@123";

//creating test user
const user = {
    id: 1,
    username: "Puneet",
    password: "puneet123",
};

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(`${req.headers}`);
    console.log(req.headers);
});

//route to authenticate and get a token
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign(
            { id: user.id, username: user.username },
            secret_key
        );
        res.json(token);
    } else {
        res.status(401).send("Invalid credentials");
    }
});

//middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.body.token;
    if (!token) return res.status(401).send("Invalid token");

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(401).send("invalid token");
        // res.status(200).send("user verified");
        req.user = user;
        next();
    });
}

//protected route
app.post("/protected", authenticateToken, (req, res) => {
    res.send(`Hello. This is a protected route`);
});

app.listen(8000, () => {
    console.log("server started");
});
