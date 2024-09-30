import { Request, Router } from "express";
import { db } from "../database/sqlite";

const router = Router();

router.post("/conversations", async (req: Request, res: any) => {
	try {
		const { question } = req.body;

		if (!question) {
			return res.status(400).json({ message: "No question provided" });
		}

		const insertConversation = db.prepare(
			"INSERT INTO conversations (name) VALUES (?)"
		);

		const name = question.substring(0, 50);
		const insertedConversation = insertConversation.run(name);

		const getLastInsertedConversation = db.prepare(
			"SELECT * FROM conversations WHERE id = ?"
		);

		const lastConversationData = getLastInsertedConversation.get(
			insertedConversation.lastInsertRowid
		);

		return res.status(200).send(lastConversationData);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error });
	}
});

router.get("/conversations", async (_: Request, res: any) => {
	try {
		const sqlite = db.prepare(
			"SELECT * FROM conversations ORDER BY id DESC"
		);
		const conversations = sqlite.all();

		return res.status(200).send(conversations);
	} catch (error) {
		return res.status(500).send({ message: error });
	}
});

router.get("/conversation/:id", async (req: Request, res: any) => {
	try {
		const { id } = req.params;

		const getConversationWithQAs = db.prepare(`
        SELECT * FROM question_and_answer WHERE conversation_id = ?
      `);

		const conversationWithQAs = getConversationWithQAs.all(id);

		return res.status(200).send(conversationWithQAs);
	} catch (error) {
		return res.status(500).send({ message: error });
	}
});

export default router;
