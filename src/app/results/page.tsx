"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import axios from "axios";

type AnalysisResult = {
  id: number;
  filename: string;
  diagnosis: string;
  confidence: number;
  createdAt: string;
  userEmail : string;
};

export default function ResultPage() {
  const [results, setResults] = useState<AnalysisResult[]>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("로그인 후 이용해주세요");
        return;
      }

      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
        const res = await axios.get<AnalysisResult[]>(
          `${API_BASE}/api/results`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResults(res.data);
      } catch {
        setMessage("분석 결과를 불러오는 데 실패했습니다.");
      }
    };
    fetchResults();
  }, []);

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          AI 분석 결과 목록
        </h2>
        {message && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
        {results?.length === 0 ? (
          <p style={{ textAlign: "center" }}>분석 결과가 없습니다</p>
        ) : (
          <div style={cardGrid}>
            {results &&
              results.map((r) => (
                <div key={r.id} style={cardStyle}>
                  <h3>{r.filename}</h3>
                  <p>
                    <strong>진단:</strong> {r.diagnosis}
                  </p>
                  <p>
                    <strong>정확도:</strong> {(r.confidence * 100).toFixed(2)}%
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

const cardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "transform 0.2s ease",
};
