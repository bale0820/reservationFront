"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step1AgreementPage() {
  const [agreeAll, setAgreeAll] = useState(false);
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const router = useRouter();

  const handleAgreeAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setTerms1(newValue);
    setTerms2(newValue);
  };

  const handleNext = () => {
    if (!terms1 || !terms2) {
      alert("필수 약관에 동의해야 합니다.");
      return;
    }
    router.push("/register/step4");
  };

  return (
    <div style={pageWrapper}>
      {/* 상단 헤더 */}
      <div style={headerStyle}>약관 동의</div>

      {/* 중앙 카드 */}
      <div style={containerStyle}>
        <h2 style={titleStyle}>온라인 채널 통합회원가입을 위한 약관 동의</h2>

        <div style={checkboxGroup}>
          <label>
            <input type="checkbox" checked={agreeAll} onChange={handleAgreeAll} />
            전체 동의
          </label>
        </div>

        <div style={checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={terms1}
              onChange={() => setTerms1(!terms1)}
            />
            이용 약관 동의 (필수)
          </label>
          <button style={detailBtn}>전문보기</button>
        </div>

        <div style={checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={terms2}
              onChange={() => setTerms2(!terms2)}
            />
            개인정보 수집 및 이용 동의 (필수)
          </label>
          <button style={detailBtn}>전문보기</button>
        </div>

        <p style={noticeStyle}>
          ※ 위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다. 그러나
          동의를 거부할 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.
        </p>

        <div style={buttonWrapper}>
          <button style={prevBtn} onClick={() => router.push("/register/step1")}>
            이전
          </button>
          <button style={nextBtn} onClick={handleNext}>
            다음
          </button>
        </div>
      </div>

      <footer style={footerStyle}>© MEDICAL AI CENTER</footer>
    </div>
  );
}

/* 🎨 스타일 정의 (React.CSSProperties) */
const pageWrapper: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "black",
};

const headerStyle: React.CSSProperties = {
  width: "100%",
  color: "white",
  textAlign: "center",
  padding: "16px",
  fontSize: "18px",
  fontWeight: "bold",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "500px",
  margin: "60px auto",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "left",
};

const titleStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "24px",
};

const checkboxGroup: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
  fontSize: "14px",
};

const detailBtn: React.CSSProperties = {
  fontSize: "12px",
  color: "black",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const noticeStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "16px",
};

const buttonWrapper: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
};

const prevBtn: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  border: "1px solid #d1d5db",

};

const nextBtn: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  border: "none",
  color: "white",
};

const footerStyle: React.CSSProperties = {
  marginTop: "auto",
  padding: "16px",
  fontSize: "12px",
  color: "#9ca3af",
};
