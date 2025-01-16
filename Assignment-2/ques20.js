const mysql = require("mysql");

//creating connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "copydatabase",
});

//initiating connection
connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to the database");
    }
});

//function to create a new user with proper error handling
const createUser = (name, age) => {
    const query = "INSERT INTO users (name, age) VALUES (?, ?)";
    const values = [name, age];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);

            // Specific error cases
            if (err.code === "ER_DUP_ENTRY") {
                console.error("Duplicate entry:", err.message);
            } else if (err.code === "ER_BAD_NULL_ERROR") {
                console.error("Null value error:", err.message);
            } else {
                // General error handling
                console.error("An unexpected error occurred:", err);
            }
        } else {
            console.log("Record inserted:", results.insertId);
        }
    });
};

//calling function
createUser("Alice", 25);

//closing connection
connection.end((err) => {
    if (err) {
        console.error("Error closing the connection:", err);
        return;
    }
    console.log("Connection closed");
});
