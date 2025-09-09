"use client";

import { useRouter } from "next/navigation";

export default function RegisterTypePage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#6cc20bff",
          color: "white",
          padding: "16px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        MAI 회원가입
      </div>

      {/* 중앙 카드 */}
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "32px",
          width: "100%",
          maxWidth: "400px",
          marginTop: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
            color: "#374151",
          }}
        >
          회원 유형 선택
        </h2>

        {/* 버튼 리스트 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            onClick={() => router.push("/register/step2?type=adult")}
            style={{
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#b2e776ff",
              color : 'black'
            }}
          >
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>일반가입</p>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>만 14세 이상</p>
            </div>
            <span style={{ color: "#2563eb", fontSize: "18px" }}>→</span>
          </button>

          <button
            onClick={() => router.push("/register/step2?type=child")}
            style={{
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#b2e776ff",
              color : 'black'
            }}
          >
            <div>
              <p style={{ fontWeight: "600", margin: 0 }}>소아/청소년 가입</p>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>만 14세 미만</p>
            </div>
            <span style={{ color: "#2563eb", fontSize: "18px" }}>→</span>
          </button>
        </div>
      </div>

      {/* 하단 푸터 */}
      <div
        style={{
          marginTop: "32px",
          color: "#9ca3af",
          fontSize: "14px",
        }}
      >
        © MEDICAL AI CENTER
      </div>
    </div>
  );
}
