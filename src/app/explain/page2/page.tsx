import Link from "next/link";

export default function Page2() {
  const heroSection: React.CSSProperties = {
    position: "relative",
    background: "linear-gradient(to right, #bbf7d0, #10b981)", // 연초록 → 진초록
    color: "white",
    padding: "96px 24px",
    textAlign: "center",
    marginBottom: "64px",
  };

  const heroTitle: React.CSSProperties = {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const heroSubtitle: React.CSSProperties = {
    fontSize: "18px",
    maxWidth: "768px",
    margin: "0 auto",
    opacity: 0.9,
  };

  const contentSection: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "64px 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    alignItems: "center",
  };

  const imageWrapper: React.CSSProperties = {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#047857", // 진녹색
    marginBottom: "16px",
  };

  const paragraph: React.CSSProperties = {
    color: "#374151",
    fontSize: "18px",
    lineHeight: 1.7,
    marginBottom: "16px",
  };

  const card: React.CSSProperties = {
    background: "#ecfdf5",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const cardTitle: React.CSSProperties = {
    fontWeight: "600",
    color: "#047857",
    marginBottom: "8px",
  };

  const cardText: React.CSSProperties = {
    fontSize: "14px",
    color: "#4b5563",
  };

  const ctaWrapper: React.CSSProperties = {
    paddingTop: "32px",
  };

  const ctaButton: React.CSSProperties = {
    backgroundColor: "#10b981",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    textDecoration: "none",
    transition: "background 0.3s",
    display: "inline-block",
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>환자를 먼저 생각하는 진료</h1>
        <p style={heroSubtitle}>
          모든 기술의 중심에는 환자가 있습니다. 환자의 편안함과 안심을 최우선으로.
        </p>
      </section>

      {/* Content Section */}
      <section style={contentSection}>
        {/* 왼쪽 텍스트 */}
        <div>
          <h2 style={sectionTitle}>환자 중심 의료 철학</h2>
          <p style={paragraph}>
            환자 중심 진료는 단순히 병을 고치는 것을 넘어, 환자의 삶과 마음까지 이해하는 과정입니다.
            저희는 환자의 불안과 두려움을 줄이고, 의료 과정을 환자와 함께 공유합니다.
          </p>
          <p style={paragraph}>
            복잡한 의료 용어 대신 환자가 이해하기 쉬운 언어로 소통하며,
            치료 방향을 함께 결정합니다. AI 분석 덕분에 대기 시간은 줄고,
            환자는 더 빠른 결과를 받아볼 수 있습니다.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", paddingTop: "24px" }}>
            <div style={card}>
              <h3 style={cardTitle}>🤲 공감</h3>
              <p style={cardText}>환자의 목소리에 귀 기울이고 공감하는 진료</p>
            </div>
            <div style={card}>
              <h3 style={cardTitle}>💬 소통</h3>
              <p style={cardText}>전문 용어 대신 이해하기 쉬운 언어로 설명</p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div style={ctaWrapper}>
            <Link href="/" style={ctaButton}>
              환자 중심 철학 더 알아보기 →
            </Link>
          </div>
        </div>

        {/* 오른쪽 이미지 */}
        <div style={imageWrapper}>
          <img src="/hospital2.png" alt="환자 중심 진료" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
        </div>
      </section>
    </main>
  );
}
