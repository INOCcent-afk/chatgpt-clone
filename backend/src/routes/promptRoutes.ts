import { Request, Response, Router } from "express";
import OpenAI from "openai";
import { db } from "../database/sqlite";

const router = Router();

const openai = new OpenAI({
	apiKey: "",
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const { conversationId, prompt } = req.body;

		if (!prompt) {
			res.status(400).json({ message: "No prompt provided" });
		}

		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{
					role: "user",
					content: prompt,
				},
			],
		});

		const sqlite = db.prepare(
			"INSERT INTO question_and_answer (conversation_id, question, answer) VALUES (?, ?, ?)"
		);
		const result = sqlite.run(
			conversationId,
			completion.choices[0].message.content,
			prompt
		);

		res.status(200).send(result);
	} catch (error) {
		res.status(500).send({ message: error });
	}
});

export default router;
