// get the client
const mysql = require("mysql2");
require("dotenv").config();

const options = {
	host: "localhost",
	user:
		process.env.NODE_ENV === "development"
			? "root"
			: process.env.MYSQL_USERNAME,
	password:
		process.env.NODE_ENV === "development"
			? "root"
			: process.env.MYSQL_PASSWORD,
	database:
		process.env.NODE_ENV === "development" ? "meruwell" : "skillmind_meruwell",
	port: 3306,
	multipleStatements: true,
};

// create the connection to database
exports.db = mysql.createPool(options).promise();
