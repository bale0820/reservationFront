"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute";

interface AiQuestion {
  id: number;
  userEmail: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<AiQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

  // ✅ 대화 내역 불러오기
  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get<AiQuestion[]>(`${API_BASE}/api/gpt/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("히스토리 불러오기 실패", err);
    }
  };

  // ✅ 질문 보내기
  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      const res = await axios.get(`${API_BASE}/api/gpt/ask`, {
        params: { q: question },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswer(res.data as string);
      setQuestion(""); // 입력창 초기화
      fetchHistory();  // 새로고침
    } catch (err) {
      setAnswer("❌ GPT 호출 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: 20 }}>
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>💬 GPT 채팅</h2>

        {/* 질문 입력 */}
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요..."
          style={{
            width: "100%",
            minHeight: 80,
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "답변 생성 중..." : "질문 보내기"}
        </button>

        {/* 최신 답변 표시 */}
        {answer && (
          <div
            style={{
              marginTop: 20,
              padding: 15,
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: 6,
            }}
          >
            <strong>답변:</strong>
            <p>{answer}</p>
          </div>
        )}

        {/* 대화 내역 리스트 */}
        <div style={{ marginTop: 40 }}>
          <h3>📜 내 대화 내역</h3>
          {history.length === 0 ? (
            <p style={{ color: "#666" }}>아직 대화 기록이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {history.map((h) => (
                <li
                  key={h.id}
                  style={{
                    marginBottom: 20,
                    padding: 15,
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    background: "#fff",
                  }}
                >
                  <p>
                    <strong>Q:</strong> {h.question}
                  </p>
                  <p>
                    <strong>A:</strong> {h.answer}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#999" }}>
                    {new Date(h.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
