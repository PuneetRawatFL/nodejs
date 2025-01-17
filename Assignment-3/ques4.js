const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//items array
let items = [];

//route for all items
app.get("/items", (req, res) => {
    res.json(items);
});

//route to get a specific item
app.get("/items/:id", (req, res) => {
    const item = items.find((b) => b.id == parseInt(req.params.id));
    if (!item) {
        res.statusCode = 404;
        res.end("No such item exists");
    }
    res.json(item);
});

//route to add item
app.post("/items", (req, res) => {
    const newitem = {
        id: items.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    items.push(newitem);
    res.statusCode = 201;
    res.json(newitem);
});

//route to update a item
app.put("/items/:id", (req, res) => {
    const updateitem = items.find((b) => b.id == parseInt(req.params.id));
    if (!items) {
        return res.status(404).end("item not found");
    }

    updateitem.name = req.body.name;
    updateitem.price = req.body.price;
    res.json(updateitem);
});

//route to delete items using id
app.delete("/items/:id", (req, res) => {
    const deleteitem = items.findIndex((b) => b.id == parseInt(req.params.id));
    if (deleteitem == -1) {
        res.status(404).end("item not found");
    }

    //remove from array
    const b = items.splice(deleteitem, 1);
    res.json(b);
});

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.end("Express server");
});

app.listen(8000, () => {
    console.log("Server started");
});
