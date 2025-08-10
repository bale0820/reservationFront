export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContent}>
        <p>© 2025 Medical AI Service. All rights reserved.</p>
        <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
          AI 기반 의료 영상 분석 & 예약 관리 시스템
        </p>
        <p>
          <a
            href="mailto:support@medicalai.com"
            style={{ color: "#ccc", marginRight: "10px" }}
          >
            문의하기
          </a>
          <a href="#" style={{ color: "#ccc" }}>
            이용약관
          </a>
        </p>
      </div>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "30px 20px",
  marginTop: "40px",
  textAlign: "center",
};

const footerContent: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};
