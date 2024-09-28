import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Feedback } from "../models/OpenAi";

interface Props {
	prompt: string;
}

export const useCreatePrompt = () => {
	const mutation = useMutation({
		mutationFn: async (prompt: Props) => {
			const { data } = await axios.post<Feedback>(
				"http://localhost:8080/api/prompt/",
				prompt
			);

			return data;
		},
	});

	return mutation;
};
