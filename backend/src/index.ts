import express, { Application } from "express";
import promptRoutes from "./routes/promptRoutes";
import cors from "cors";
import { createTable } from "./database/sqlite";

const app: Application = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

createTable();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/prompt", promptRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on -- ${PORT}`);
});
