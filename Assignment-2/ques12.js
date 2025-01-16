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
        console.log("connection successful");
    }
});

//inserting records
function createRecord() {
    const query = "insert into users values (?, ?)";
    const values = ["alice", 28];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

//reading records
function readRecord() {
    const query = "select * from users";

    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

//update records
function updateRecord() {
    const query = "update users set age = ? where name = ?";
    const values = [32, "john"];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

//deleting records
function deleteRecords() {
    const query = "delete from users where name = ?";
    const values = ["michael"];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

//calling functions
createRecord();
// readRecord();
// updateRecord();
// deleteRecords();

//ending connection
connection.end();
