import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import "reflect-metadata";
import { PORT } from "./data/config";
import routes from "./routes";

const app: Application = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use("/api", routes);

const start = async () => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
