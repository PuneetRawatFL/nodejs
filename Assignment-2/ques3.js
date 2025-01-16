//importing event module
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

//importing fs module
const fs = require("fs");

//registering listener
myEmitter.on("fileSuccess", () => {
    console.log("File read success");
});

//reading file
fs.readFile("example.txt", (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
        myEmitter.emit("fileSuccess");
    }
});
