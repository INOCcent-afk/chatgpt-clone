import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Prompt } from "./pages/Prompt";

function App() {
	return (
		<main className="flex w-full h-screen">
			<div className="min-w-[236px] h-full bg-brand-secondary p-4">
				<ol className="flex flex-col">
					<li className="p-2 rounded-md bg-brand-primary">
						<Link
							to="/"
							className="block whitespace-nowrap text-sm"
						>
							Bank Api Security Measures
						</Link>
					</li>
					<li className="p-2 rounded-md">
						<Link
							className="block whitespace-nowrap text-sm"
							to="/"
						>
							Bank Api Security Measures
						</Link>
					</li>
					<li className="p-2 rounded-md">
						<Link
							className="block whitespace-nowrap text-sm"
							to="/"
						>
							Bank Api Security Measures
						</Link>
					</li>
				</ol>
			</div>

			<Routes>
				<Route path="/:promptId" element={<Prompt />} />
				<Route path="/" element={<Prompt />} />
			</Routes>
		</main>
	);
}

export default App;
