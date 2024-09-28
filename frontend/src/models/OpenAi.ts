export interface ConversationFeedback {
	lastConversationData: Conversation;
	lastQuestionData: Question;
}

export interface Conversation {
	id: number;
	name: string;
}

export interface Question {
	id: number;
	conversation_id: number;
	question: string;
	answer: string;
}
