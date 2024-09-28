import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PromptInput } from "../ui/PromptInput";
import { useAskQuestion } from "../apiHooks/useAskQuestion";
import { useCreateConversation } from "../apiHooks/useCreateConversation";
import { useConversation } from "../apiHooks/useConversation";
import { useQueryClient } from "@tanstack/react-query";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

export const Conversation = () => {
	const { conversationId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const scrollToBottom = useScrollToBottom();

	const { mutate: askQuestion, isPending } = useAskQuestion();
	const { mutate: createConversation } = useCreateConversation();
	const { data: conversation, refetch } = useConversation({
		enabled: Boolean(conversationId),
		id: String(conversationId),
	});

	const [value, setValue] = useState("");

	const [newFeedbacks, setNewFeedbacks] = useState<
		{ question: string; answer: string }[]
	>([]);

	const submit = (e: any) => {
		if (!value) return;

		e.preventDefault();

		setNewFeedbacks([...newFeedbacks, { question: value, answer: "" }]);

		if (!conversationId) {
			createConversation(
				{
					question: value,
				},
				{
					onSuccess: (data) => {
						navigate(`/${data.lastConversationData.id}`);

						setNewFeedbacks([
							...newFeedbacks,
							{
								answer: data.lastQuestionData.question,
								question: data.lastQuestionData.answer,
							},
						]);

						queryClient.invalidateQueries({
							queryKey: ["conversations"],
						});
					},
				}
			);
		} else {
			askQuestion(
				{
					question: value,
					conversationId,
				},
				{
					onSuccess: (data) => {
						setNewFeedbacks([
							...newFeedbacks,
							{ answer: data.answer, question: data.question },
						]);
					},
				}
			);
		}

		setValue("");
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

							{isPending && !feedbacks.answer && (
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
				onSubmit={submit}
				className="absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[768px]"
			>
				<div className="px-4">
					<PromptInput
						value={value}
						onChange={(e) => setValue(e.currentTarget.value)}
						placeholder="Message OpenAI!"
					/>
				</div>
			</form>
		</div>
	);
};
