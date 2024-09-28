import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Prompt } from "./pages/prompt";

function App() {
	return (
		<main className="flex w-full h-screen">
			<div className="min-w-[236px] h-full bg-brand-secondary p-4">
				<ol className="flex flex-col">
					<li className="p-2 rounded-md bg-brand-primary">
						<Link to="/">Bank Api Security Measures</Link>
					</li>
					<li className="p-2 rounded-md bg-brand-primary">
						<Link to="/">Bank Api Security Measures</Link>
					</li>
					<li className="p-2 rounded-md bg-brand-primary">
						<Link to="/">Bank Api Security Measures</Link>
					</li>
				</ol>
			</div>

			<Routes>
				<Route path="/:promptId" element={<Prompt />} />
			</Routes>
		</main>
	);
}

export default App;
