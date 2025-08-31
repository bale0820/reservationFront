import Link from "next/link";

export default function Page3() {
  const heroSection: React.CSSProperties = {
    position: "relative",
    background: "linear-gradient(to right, #bbf7d0, #16a34a)", // 연빨강 → 진빨강
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
    color: "#16a34a",
    marginBottom: "16px",
  };

  const paragraph: React.CSSProperties = {
    color: "#374151",
    fontSize: "18px",
    lineHeight: 1.7,
    marginBottom: "16px",
  };

  const card: React.CSSProperties = {
    background: "#fef2f2",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const cardTitle: React.CSSProperties = {
    fontWeight: "600",
    color: "#16a34a",
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
    backgroundColor: "#16a34a",
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
        <h1 style={heroTitle}>신뢰할 수 있는 의료 서비스</h1>
        <p style={heroSubtitle}>
          환자가 안심하고 맡길 수 있는, 기술과 인간적 신뢰가 결합된 의료.
        </p>
      </section>

      {/* Content Section */}
      <section style={contentSection}>
        {/* 왼쪽 이미지 */}
        <div style={imageWrapper}>
          <img src="/hospital3.png" alt="신뢰 의료" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
        </div>

        {/* 오른쪽 텍스트 */}
        <div>
          <h2 style={sectionTitle}>신뢰는 의료의 기본</h2>
          <p style={paragraph}>
            의료 서비스의 핵심 가치는 <strong>신뢰</strong>입니다. 환자는 자신의 건강과 생명을 의료에 맡기기 때문에
            모든 과정이 철저히 안전하고 투명해야 합니다.
          </p>
          <p style={paragraph}>
            저희는 국제 표준 보안 프로토콜을 준수하여 환자의 데이터를 철저히 보호합니다.
            또한 AI 분석 결과는 반드시 전문 의료진이 검증하여 환자에게 전달됩니다.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", paddingTop: "24px" }}>
            <div style={card}>
              <h3 style={cardTitle}>🔒 데이터 보안</h3>
              <p style={cardText}>국제 표준 프로토콜 기반 의료 데이터 보호</p>
            </div>
            <div style={card}>
              <h3 style={cardTitle}>✅ 전문가 검증</h3>
              <p style={cardText}>AI 분석 결과는 반드시 의료진이 재확인</p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div style={ctaWrapper}>
            <Link href="/" style={ctaButton}>
              신뢰 기반 서비스 알아보기 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
