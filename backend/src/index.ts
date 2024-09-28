import express, { Application } from "express";
import promptRoutes from "./routes/promptRoutes";

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/prompt", promptRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on -- ${PORT}`);
});
