import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
	question: string;
	conversationId: string;
}

export const useAskQuestion = () => {
	const mutation = useMutation({
		mutationFn: async (props: Props) => {
			const { data } = await axios.post<any>(
				"http://localhost:8080/api/question/",
				props
			);

			return data;
		},
	});

	return mutation;
};
