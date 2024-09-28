import express, { Application } from "express";
import questionRoutes from "./routes/questionRoutes";
import conversationRoutes from "./routes/conversationRoutes";
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

app.use("/api", questionRoutes, conversationRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on -- ${PORT}`);
});
