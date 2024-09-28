import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PromptInput } from "../ui/PromptInput";
import { useCreatePrompt } from "../apiHooks/useCreatePrompt";

export const Prompt = () => {
	const { promptId } = useParams();

	const { mutate: createPrompt } = useCreatePrompt();

	const [value, setValue] = useState("");

	const [newFeedbacks, setNewFeedbacks] = useState<
		{ question: string; answer: string }[]
	>([]);

	const submit = (e: any) => {
		if (!value) return;

		e.preventDefault();

		setNewFeedbacks([...newFeedbacks, { question: value, answer: "" }]);

		createPrompt(
			{
				prompt: value,
			},
			{
				onSuccess: (data) => {
					setNewFeedbacks([
						...newFeedbacks,
						{ answer: "", question: "" },
					]);
				},
			}
		);
	};

	return (
		<div className="relative w-full h-full bg-brand-primary">
			<div className="flex flex-col gap-4 w-full overflow-y-auto h-[calc(100%-400px)] mx-auto max-w-[768px] my-14">
				{newFeedbacks.map((feedbacks) => (
					<p>{}</p>
				))}
			</div>

			<form
				onSubmit={submit}
				className="absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[768px]"
			>
				<PromptInput
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
					placeholder="Message ChatGPT"
				/>
			</form>
		</div>
	);
};
