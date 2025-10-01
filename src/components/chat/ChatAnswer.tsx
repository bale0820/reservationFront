// components/chat/ChatAnswer.tsx
export function ChatAnswer({ answer }: { answer: string }) {
    if (!answer) return null;
    return (
        <div className="mt-5 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <strong className="block mb-1">답변:</strong>
            <p>{answer}</p>
        </div>
    );
}