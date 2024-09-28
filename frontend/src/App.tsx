import { Routes, Route, Link } from "react-router-dom";
import { Conversation } from "./pages/Conversation";
import { useConversations } from "./apiHooks/useConversations";

function App() {
	const { data: conversations } = useConversations({});

	return (
		<main className="flex w-full h-screen">
			<div className="w-full max-w-[236px] h-full bg-brand-secondary p-4">
				<ol className="flex flex-col">
					{conversations?.map((conversation) => (
						<li key={conversation.id} className="">
							<Link
								to={`/${conversation.id}`}
								className={`block whitespace-nowrap text-sm p-2 rounded-md hover:bg-brand-primary overflow-hidden `}
							>
								{conversation.name}
							</Link>
						</li>
					))}
				</ol>
			</div>

			<Routes>
				<Route path="/:conversationId" element={<Conversation />} />
				<Route path="/" element={<Conversation />} />
			</Routes>
		</main>
	);
}

export default App;
