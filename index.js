import app from "./server.js";
import db from "mssql";
import dotenv from "dotenv";

// PRODUCTION
const sqlConfig = {
	user: "ciputraestate",
	password: "ciputraestate123",
	database: "ems",
	server: "36.91.140.55",
	port: 22222,
	options: {
		encrypt: false,
		enableArithAbort: true,
		trustServerCertificate: false, // change to true for local dev / self-signed certs
	},
};
// const sqlConfig = {
// 	user: "sa",
// 	password: "antihack22",
// 	database: "ems",
// 	server: "localhost",
// 	options: {
// 		encrypt: false,
// 		enableArithAbort: true,
// 		trustServerCertificate: false, // change to true for local dev / self-signed certs
// 	},
// };
const port = process.env.PORT || 3000;
dotenv.config();
db.connect(sqlConfig)
	.then(() => {
		app.listen(port, () => {
			console.log(`App listening at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
		console.error("Cancelling app server launch");
	});

export default db;
