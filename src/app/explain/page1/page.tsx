import Link from "next/link";

export default function Page1() {
  const heroSection: React.CSSProperties = {
    position: "relative",
    background: "linear-gradient(to right, #bbf7d0, #16a34a)", // from-green-200 to-green-600
    color: "white",
    padding: "96px 24px", // py-24 px-6
    textAlign: "center",
    marginBottom: "64px", // mb-16
  };

  const heroTitle: React.CSSProperties = {
    fontSize: "48px", // text-5xl
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const heroSubtitle: React.CSSProperties = {
    fontSize: "18px", // text-lg
    maxWidth: "768px",
    margin: "0 auto",
    opacity: 0.9,
  };

  const contentSection: React.CSSProperties = {
    maxWidth: "1200px", // max-w-6xl
    margin: "0 auto",
    padding: "64px 24px", // py-16 px-6
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // md:grid-cols-2
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
    color: "#16a34a", // text-blue-700
    marginBottom: "16px",
  };

  const paragraph: React.CSSProperties = {
    color: "#374151", // text-gray-700
    fontSize: "18px",
    lineHeight: 1.7,
    marginBottom: "16px",
  };

  const grid3: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "24px",
    paddingTop: "24px",
  };

  const card: React.CSSProperties = {
    background: "#eff6ff", // bg-blue-50
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
    color: "#4b5563", // text-gray-600
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
        <h1 style={heroTitle}>의료 AI 분석 서비스</h1>
        <p style={heroSubtitle}>
          첨단 인공지능 기술로 의료 영상을 신속하고 정확하게 분석하여,
          환자와 의료진 모두가 안심할 수 있는 의료 환경을 제공합니다.
        </p>
      </section>

      {/* Content Section */}
      <section style={contentSection}>
        {/* 이미지 */}
        <div style={imageWrapper}>
          <img src="/hospital.png" alt="AI 분석" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
        </div>

        {/* 설명 */}
        <div>
          <h2 style={sectionTitle}>빠르고 정확한 AI 진단</h2>
          <p style={paragraph}>
            의료 AI 분석 서비스는 MRI, CT, X-ray, 초음파 등 방대한 의료 영상을 단 몇 초 만에 분석합니다.
            수많은 데이터를 학습한 AI 모델은 사람이 놓치기 쉬운 작은 징후까지 탐지하여,
            <span style={{ fontWeight: "600", color: "#16a34a" }}> 조기 진단</span>과{" "}
            <span style={{ fontWeight: "600", color: "#16a34a" }}>예방 치료</span>를 가능하게 합니다.
          </p>
          <p style={paragraph}>
            분석된 결과는 반드시 의료 전문가의 검토를 거쳐 최종 판단으로 이어집니다.
            AI는 의사를 대체하는 것이 아니라, 의료진의 눈과 손을 보조하는
            <em style={{ color: "#16a34a" }}> 든든한 파트너</em>입니다.
          </p>

          {/* 3 포인트 강조 */}
          <div style={grid3}>
            <div style={card}>
              <h3 style={cardTitle}>⏱️ 신속성</h3>
              <p style={cardText}>환자의 대기 시간을 줄이고 빠른 결과 제공</p>
            </div>
            <div style={card}>
              <h3 style={cardTitle}>🎯 정확성</h3>
              <p style={cardText}>사람의 눈으로 구분하기 어려운 미세한 패턴 탐지</p>
            </div>
            <div style={card}>
              <h3 style={cardTitle}>🤝 보조 역할</h3>
              <p style={cardText}>의료진의 최종 판단을 보조하는 AI 조력자</p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div style={ctaWrapper}>
            <Link href="/" style={ctaButton}>
              서비스 자세히 알아보기 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
