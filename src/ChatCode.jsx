import axios from 'axios'
import React, { useState } from 'react'

const ChatCode = () => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");


	const generateAnswer = async () => {

		setAnswer("loading...");

		const response = await axios({
			url: import.meta.env.VITE_GEMINI_API_URL,
			method: "post",
			data: {
				contents: [{
					parts: [{ text: question }]
				}],

				generationConfig: {
					maxOutputTokens: 200,
					temperature: 0.7,
					topK: 40,
					topP: 0.95
				}
			}
		});
		setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
		setQuestion("");


	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			generateAnswer();
		}
	};

	return (
		<>
			<div className='w-full h-screen bg-neutral-900 flex flex-col justify-between'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-4 text-gray-400'>Chat AI</h1>

				<div className='mx-auto w-11/12 max-w-2xl bg-zinc-800 text-neutral-100 p-4 rounded overflow-y-auto h-60 my-6'>
					{answer}
				</div>

				<div className='flex items-center justify-center flex-col mb-8 space-y-3'>
					<input
						className='border border-gray-400 rounded px-4 py-2 w-11/12 sm:w-96 bg-zinc-800 text-neutral-100'
						value={question}
						placeholder='Ask me anything'
						onChange={(e) => setQuestion(e.target.value)}
						onKeyDown={handleKeyDown}
						type="text"
					/>
					<button
						className='rounded border bg-gray-300 font-bold p-2 w-50 sm:w-50'
						onClick={generateAnswer}
					>
						Generate answer
					</button>
				</div>
			</div>

		</>
	)
}

export default ChatCode
