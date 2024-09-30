import { Request, Router } from "express";
import { db } from "../database/sqlite";
import { openai } from "../config/openAi.config";

const router = Router();

router.post("/question", async (req: Request, res: any) => {
	try {
		const { conversationId, question } = req.body;

		if (!question) {
			return res.status(400).json({ message: "No question provided" });
		}

		const stream = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{
					role: "user",
					content: question,
				},
			],
			stream: true,
			max_tokens: 100,
		});

		let fullResponse = "";

		for await (const part of stream) {
			const content = part.choices[0]?.delta.content || "";
			fullResponse += content;
			res.write(content);
		}

		res.end();

		const sqlite = db.prepare(
			"INSERT INTO question_and_answer (conversation_id, question, answer) VALUES (?, ?, ?)"
		);

		sqlite.run(conversationId, question, fullResponse);
	} catch (error) {
		return res.status(500).send({ message: error });
	}
});

export default router;
