import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Question } from "../models/OpenAi";

interface Props {
	enabled?: boolean;
	id: string;
}

export const useConversation = ({ enabled, id }: Props) => {
	const query = useQuery({
		queryKey: ["conversation"],
		queryFn: async () => {
			const { data } = await axios.get<Question[]>(
				`http://localhost:8080/api/conversation/${id}`
			);

			return data;
		},
		enabled,
	});

	return { ...query };
};
