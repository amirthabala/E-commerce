// get the client
const mysql = require("mysql2");

// create the connection to database
exports.db = mysql
	.createPool({
		host: "localhost",
		user: "root",
		password: "root",
		database: "meruwell",
		port: 3306,
		multipleStatements: true,
	})
	.promise();
