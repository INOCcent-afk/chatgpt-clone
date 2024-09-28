import { Request, Response, Router } from "express";
import { db } from "../database/sqlite";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		const sqlite = db.prepare(
			"INSERT INTO conversations (name) VALUES (?)"
		);
		const result = sqlite.run(name);

		res.status(200).send(result);
	} catch (error) {
		res.status(500).send({ message: error });
	}
});

export default router;
