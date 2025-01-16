const mysql = require("mysql");

//creating connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "copydatabase",
});

//connecting to database
connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("connection successful");
    }

    //starting transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("connected to database");

        //inserting first record
        connection.query('insert into users values ("Ford", 32)', (err) => {
            if (err) {
                return connection.rollback(() => {
                    console.error("err inserting record: ", err);
                });
            }

            //inserting second record
            connection.query(
                "insert into users values(?,?)",
                ["glen", 45],
                (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("error inserting record: ", err);
                        });
                    }

                    //printing records
                    connection.query("select * from users", (err, results) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error("Error printing records: ", err);
                            });
                        }
                        console.log(results);

                        //commiting results
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error(
                                        "Error commiting transaction: ",
                                        err
                                    );
                                });
                            }
                            console.log("Transaction committed successfully");

                            //closing connection
                            connection.end((err) => {
                                if (err) {
                                    console.error(
                                        "Error closing connection: ",
                                        err
                                    );
                                } else {
                                    console.log(
                                        "Connection closed successfully"
                                    );
                                }
                            });
                        });
                    });
                }
            );
        });
    });
});
