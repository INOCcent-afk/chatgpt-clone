import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Conversation } from "../models/OpenAi";

interface Props {
	enabled?: boolean;
}

export const useConversations = ({ enabled }: Props) => {
	const query = useQuery({
		queryKey: ["conversations"],
		queryFn: async () => {
			const { data } = await axios.get<Conversation[]>(
				`http://localhost:8080/api/conversations`
			);

			return data;
		},
		enabled,
	});

	return { ...query };
};
