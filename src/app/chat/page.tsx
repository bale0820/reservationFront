
"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useChat } from "@/hooks/useChat";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatAnswer } from "@/components/chat/ChatAnswer";
import { ChatHistory } from "@/components/chat/ChatHistory";

export default function ChatPage() {
  const { question, setQuestion, answer, history, loading, handleAsk } = useChat();

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-10 p-5">
        <h2 className="mb-5 text-center text-2xl font-semibold">💬 GPT 채팅</h2>

        <ChatInput
          question={question}
          setQuestion={setQuestion}
          handleAsk={handleAsk}
          loading={loading}
        />

        <ChatAnswer answer={answer} />
        <ChatHistory history={history} />
      </div>
    </ProtectedRoute>
  );
}
