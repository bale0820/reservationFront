// components/chat/ChatInput.tsx
import { ChatInputProps } from "@/types/chatInputProps";

export function ChatInput({ question, setQuestion, handleAsk, loading }: ChatInputProps) {
    return (
        <>
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="질문을 입력하세요..."
                className="w-full min-h-[80px] p-3 rounded-md border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
                onClick={handleAsk}
                disabled={loading}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60"
            >
                {loading ? "답변 생성 중..." : "질문 보내기"}
            </button>
        </>
    );
}
