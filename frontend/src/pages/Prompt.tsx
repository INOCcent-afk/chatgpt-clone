import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PromptInput } from "../ui/PromptInput";

export const Prompt = () => {
	const { promptId } = useParams();

	const [value, setValue] = useState("");

	return (
		<div className="relative w-full h-full bg-brand-primary">
			<div className="w-full mx-auto max-w-[768px] my-14">
				<h1>Hello Guys</h1>
				<h2>Hello Guys</h2>
				<h3>Hello Guys</h3>
				<h4>Hello Guys</h4>
			</div>

			<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[768px]">
				<PromptInput
					value={value}
					onChange={(e) => setValue(e.currentTarget.value)}
					placeholder="Message ChatGPT"
				/>
			</div>
		</div>
	);
};
