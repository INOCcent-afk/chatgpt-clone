import Database from "better-sqlite3";

const db = new Database("./backend.db", { verbose: console.log });

const createTable = () => {
	db.prepare(
		`
        CREATE TABLE IF NOT EXISTS conversations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50) NOT NULL
        )
      `
	).run();

	db.prepare(
		`
        CREATE TABLE IF NOT EXISTS question_and_answer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          conversation_id INTEGER,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
        )
      `
	).run();
};

export { db, createTable };
