import app from "./server.js";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;

var db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USERS,
	password: process.env.PASSWORD,
	database: process.env.DB,
});

db.connect(function (err) {
	if (err) throw err;
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
});

export default db;
