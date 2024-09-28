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

		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{
					role: "user",
					content: question,
				},
			],
		});

		const sqlite = db.prepare(
			"INSERT INTO question_and_answer (conversation_id, question, answer) VALUES (?, ?, ?)"
		);

		const insteredQuestion = sqlite.run(
			conversationId,
			question,
			completion.choices[0].message.content
		);

		const getLastInsertedQuestion = db.prepare(
			"SELECT * FROM question_and_answer WHERE id = ?"
		);

		const lastQuestionData = getLastInsertedQuestion.get(
			insteredQuestion.lastInsertRowid
		);

		return res.status(200).send(lastQuestionData);
	} catch (error) {
		return res.status(500).send({ message: error });
	}
});

export default router;
