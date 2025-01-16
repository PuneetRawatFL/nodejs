// const mongoose = require("mongoose");
import mongoose from "mongoose";

//creating connection
mongoose
    .connect("mongodb://localhost:27017/test_db")
    .then(() => {
        console.log("Mongoose connected successfully");
    })
    .catch((err) => {
        console.log("Error connecting ", err);
    });

//defining schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
});

//creating model
const User = mongoose.model("user", userSchema);

//create operation
const createUser = async (name, age) => {
    try {
        const savedUser = await User.create({ name, age });
        console.log("User created: ", savedUser);
    } catch (err) {
        console.error("Error creating user: ", err);
    }
};

//read operation
const readUser = async () => {
    try {
        const users = await User.find();
        console.log("Users fetched: ", users);
    } catch (err) {
        console.error("Error fetching users: ", err);
    }
};

//update user
const updateUser = async (name) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { name },
            { name: "Charlie" }
        );
        console.log("Update success: ", updatedUser);
    } catch (err) {
        console.error("Err", err);
    }
};

//delete user
const deleteUser = async (name) => {
    try {
        const deletedUser = await User.findOneAndDelete({ name });
        console.log("User deleted: ", deletedUser);
    } catch (err) {
        console.error("error", err);
    }
};

//calling functions
await createUser("Deb", 21);
await readUser();
await updateUser("Charlie");
await readUser();
await deleteUser("Deb");
await readUser();

//closing connection
mongoose.connection.close();
