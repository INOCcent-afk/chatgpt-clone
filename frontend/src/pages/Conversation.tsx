import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PromptInput } from "../ui/PromptInput";
import { useCreateConversation } from "../apiHooks/useCreateConversation";
import { useConversation } from "../apiHooks/useConversation";
import { useQueryClient } from "@tanstack/react-query";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import useStreamResponse from "../apiHooks/useStreamResponse";

export const Conversation = () => {
	const { conversationId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const scrollToBottom = useScrollToBottom();

	const { mutate: createConversation } = useCreateConversation();
	const { data: conversation, refetch } = useConversation({
		enabled: Boolean(conversationId),
		id: String(conversationId),
	});

	const [newFeedbacks, setNewFeedbacks] = useState<
		{ question: string; answer: string }[]
	>([]);

	const [sentence, setSentence] = useState("");

	const { startStream, isLoading } = useStreamResponse({
		streamCallback: (text) => {
			setNewFeedbacks((prevPairs) => {
				if (prevPairs.length === 0) return prevPairs;

				const updatedPairs = [...prevPairs];
				updatedPairs[updatedPairs.length - 1].answer += text;

				return updatedPairs;
			});
		},
	});

	const handleAskQuestion = (e: any) => {
		e.preventDefault();

		if (sentence.trim()) {
			setNewFeedbacks((prev) => [
				...prev,
				{ question: sentence, answer: "" },
			]);

			if (!conversationId) {
				createConversation(
					{ question: sentence },
					{
						onSuccess: (data) => {
							navigate(`/${data.id}`);
							queryClient.invalidateQueries({
								queryKey: ["conversations"],
							});
							startStream({
								question: sentence,
								conversationId: String(data.id),
							});
						},
					}
				);
			} else {
				startStream({ question: sentence, conversationId });
			}

			setSentence("");
		}
	};

	useEffect(() => {
		if (conversation) {
			const initialConvo = conversation.map((convo) => ({
				question: convo.question,
				answer: convo.answer,
			}));
			setNewFeedbacks(initialConvo);
		}
	}, [conversation]);

	useEffect(() => {
		refetch();
	}, [conversationId]);

	useEffect(() => {
		scrollToBottom({
			behavior: "smooth",
		});
	}, [conversation, scrollToBottom]);

	return (
		<div className="relative w-full h-full bg-brand-primary">
			<ScrollToBottom className="!flex flex-col w-full overflow-y-auto h-[calc(100%-400px)] mx-auto max-w-[768px] my-14">
				{newFeedbacks?.length ? (
					newFeedbacks.map((feedbacks, index) => (
						<Fragment key={feedbacks.answer + index}>
							<p className="mb-10 ml-auto py-3 px-6 bg-brand-medium-gray rounded-3xl w-fit">
								{feedbacks.question}
							</p>

							{feedbacks.answer && (
								<p className="mb-10 max-w-[500px]">
									{feedbacks.answer}
								</p>
							)}

							{isLoading && !feedbacks.answer && (
								<div className="py-2 px-4 bg-brand-medium-gray rounded-3xl w-fit">
									<div className="loader"></div>
								</div>
							)}
						</Fragment>
					))
				) : (
					<div className="text-center mt-40">
						<h1>What it do Stephen!</h1>
					</div>
				)}
			</ScrollToBottom>

			<form
				onSubmit={handleAskQuestion}
				className="absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[768px]"
			>
				<div className="px-4">
					<PromptInput
						value={sentence}
						onChange={(e) => setSentence(e.currentTarget.value)}
						placeholder="Message OpenAI!"
					/>
				</div>
			</form>
		</div>
	);
};
