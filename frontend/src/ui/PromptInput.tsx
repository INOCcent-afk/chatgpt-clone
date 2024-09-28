import React, { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
	className?: string; // input classname
}

export const PromptInput: FC<Props> = ({
	type = "text",
	className,
	...restProps
}) => {
	return (
		<div className="flex justify-between items-center bg-brand bg-brand-medium-gray rounded-3xl py-4 pl-8 pr-4 gap-2">
			<textarea
				className={twMerge(
					"bg-brand-medium-gray resize-none w-full outline-none h-[200px]",
					className
				)}
				{...restProps}
			/>

			<button
				className="bg-white rounded-full self-end disabled:opacity-10"
				type="submit"
				disabled={Boolean(!restProps.value)}
			>
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
						fill="#000000"
					></path>
				</svg>
			</button>
		</div>
	);
};
