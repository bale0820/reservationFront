// components/chat/ChatHistory.tsx
import { AiQuestion } from "@/types";

export function ChatHistory({ history }: { history: AiQuestion[] }) {
    return (
        <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3">📜 내 대화 내역</h3>
            {history.length === 0 ? (
                <p className="text-gray-500">아직 대화 기록이 없습니다.</p>
            ) : (
                <ul className="space-y-5">
                    {history?.map((h) => (
                        <li
                            key={h.id}
                            className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
                        >
                            <p>
                                <strong>Q:</strong> {h.question}
                            </p>
                            <p>
                                <strong>A:</strong> {h.answer}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(h.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
