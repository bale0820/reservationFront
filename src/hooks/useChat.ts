// hooks/useChat.ts
import { useState, useEffect } from "react";
import { axiosGet } from "@/utils/axiosGet";
import { AiQuestion } from "@/types";

export function useChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<AiQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axiosGet<AiQuestion[]>(`/api/gpt/history`);
      if (res) setHistory(res);
    } catch (err) {
      console.error("히스토리 불러오기 실패", err);
    }
  };

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axiosGet(`/api/gpt/ask`, question);
      setAnswer(res as string);
      setQuestion("");
      fetchHistory();
    } catch {
      setAnswer("❌ GPT 호출 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    question,
    setQuestion,
    answer,
    history,
    loading,
    handleAsk,
  };
}
