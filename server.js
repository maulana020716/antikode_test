import express from "express";
import cors from "cors";
import brand from "./routes/brand.route.js";
import outlet from "./routes/outlet.route.js";
import product from "./routes/product.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use("/outlet", outlet);
app.use("/brand", brand);
app.use("/product", product);

export default app;
