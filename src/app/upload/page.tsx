"use client";

import { useState } from "react";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute";

interface ApiResponse<T> {
    success : boolean
    message: string
    data : T
  }
interface AnalysisResult {
  filename: string
  diagnosis: string
  confidence: number
}
export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      setMessage("업로드 및 분석 중...");
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인 후 이용 가능합니다");
        return;
      }
      console.log(token);
      const safeToken = token.replace(/[^\x00-\x7F]/g, '');
      const formData = new FormData();
      formData.append("file", file, file.name);

      const API_BASE =
        process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
      const res = await axios.post<ApiResponse<AnalysisResult>>(
        `${API_BASE}/api/upload/analyze`,
        formData,
        {
          headers: {

            Authorization: `Bearer ${safeToken}`,
          },
        }

      );
      const {success, message, data} = res.data
      // const dataStr = res.data as string;
      // const jsonStr = dataStr.replace("AI 분석 결과: ", "");
      // const json = JSON.parse(jsonStr);
      setMessage(message)
      if (success) {
        setResult(data)
        setMessage("분석이 완료되었습니다!");
      }
    } catch (error) {
      console.error(error);
      setMessage("업로드나 분석에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div style={containerStyle}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          의료 영상 업로드 및 분석
        </h2>
        <div style={cardStyle}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={handleUpload}
            style={uploadButton}
            disabled={loading}
          >
            {loading ? "분석 중..." : "업로드 및 분석"}
          </button>
          {message && (
            <p
              style={{
                marginTop: "10px",
                color: loading
                  ? "#333"
                  : message.includes("완료")
                  ? "green"
                  : "red",
              }}
            >
              {message}
            </p>
          )}
        </div>

        {result && (
          <div style={{ ...cardStyle, marginTop: "30px" }}>
            <h3>AI 분석 결과</h3>
            <p>
              <strong>파일명:</strong> {result.filename}
            </p>
            <p>
              <strong>진단:</strong> {result.diagnosis}
            </p>
            <p>
              <strong>정확도:</strong> {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

// 스타일 정의
const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const uploadButton: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
};
