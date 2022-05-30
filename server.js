import express from "express";
import cors from "cors";
import master from "./routes/master.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use("/master", master);

export default app;
