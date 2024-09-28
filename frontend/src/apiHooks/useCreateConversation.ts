import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ConversationFeedback } from "../models/OpenAi";

interface Props {
	question: string;
}

export const useCreateConversation = () => {
	const mutation = useMutation({
		mutationFn: async (props: Props) => {
			const { data } = await axios.post<ConversationFeedback>(
				"http://localhost:8080/api/conversations/",
				props
			);

			return data;
		},
	});

	return mutation;
};
