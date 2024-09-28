import React from "react";
import { useParams } from "react-router-dom";

export const Prompt = () => {
	const { promptId } = useParams();

	return <div className="w-full h-full bg-brand-primary">{promptId}</div>;
};
