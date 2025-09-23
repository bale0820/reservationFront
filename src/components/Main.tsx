import { useRouter } from "next/navigation";

export function Main() {
     const router = useRouter();



    return(<div style={featureSection}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          서비스 주요 기능
        </h2>
        <div style={featureGrid}>
          <div className="featureCard">
            <h3>1. 의료 영상 업로드</h3>
            <p>간단한 업로드만으로 AI 분석 시작</p>
            <button style={subButton} onClick={() => router.push("/upload")}>
              업로드
            </button>
          </div>
          <div className="featureCard">
            <h3>2. 분석 결과 확인</h3>
            <p>정확도와 결과를 실시간으로 확인 가능</p>
            <button style={subButton} onClick={() => router.push("/results")}>
              결과 확인
            </button>
          </div>
          <div className="featureCard">
            <h3>3. 예약 관리</h3>
            <p>진료 예약 및 나의 예약 이력 관리</p>
            <button
              style={subButton}
              onClick={() => router.push("/my-reservations")}
            >
              내 예약
            </button>
          </div>
          <div className="featureCard">
            <h3>3. 예약</h3>
            <p>진료 예약</p>
            <button style={subButton} onClick={() => router.push("/reserve")}>
              예약하기
            </button>
          </div>
          <div className="featureCard">
            <h3>4. 의료 상담</h3>
            <p>의료 관련 상담</p>
            <button style={subButton} onClick={() => router.push("/chat")}>
              상담 받아보기
            </button>
          </div>
          <div className="featureCard">
            <h3>5. 건강검진 서비스</h3>
            <p>건강검진</p>
            <button style={subButton} onClick={() => router.push("/chat")}>
              알아보기
            </button>
          </div>
        </div>
      </div>
    )
}




const featureSection: React.CSSProperties = {
  padding: "60px 20px",
  backgroundColor: "#f9f9f9",
};

const featureGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "1000px",
  margin: "0 auto",
};
const subButton: React.CSSProperties = {
  marginTop: "15px",
  padding: "8px 16px",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};