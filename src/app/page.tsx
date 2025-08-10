"use client";

import { useRouter } from "next/navigation";
import "./globals.css";
import Image from "next/image";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".featureCard");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // 한 번만 실행
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={heroSection}>
        <Image
          src="/hospital.png"
          alt="병원 이미지"
          layout="fill" // ✅ 전체 채우기
          objectFit="cover"
          objectPosition="40% 40%"
          quality={100}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 검정 + 50% 투명도
            zIndex: 1,
          }}
        />
        <div style={heroContent}>
          <h1 style={heroTitle}>의료 AI 분석 서비스</h1>
          <p style={heroSubtitle}>
            AI를 활용하여 의료 영상을 분석하고, 손쉽게 진료 예약을 관리할 수
            있는 플랫폼입니다.
          </p>
        </div>
      </div>

      {/* 기능 소개 섹션 */}
      <div style={featureSection}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }} >
          서비스 주요 기능
        </h2>
        <div style={featureGrid} >
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
              내 예약
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 스타일 정의 */
const heroSection: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent : "center",
  color: "#fff",
  padding: "auto",
  position: "relative",
  width: "100%",
  height: "clamp(200px, 30svh, 900px)",
  overflow: "hidden",
  textAlign: "center",
};

const heroContent: React.CSSProperties = {
  position: "relative",
  zIndex: 2, // 오버레이 위로
  display: "flex",
  flexDirection: "column",
  gap: "5px", // 제목/문단 간격
};

const heroTitle: React.CSSProperties = {
  fontSize: "clamp(24px, 6vw, 48px)",
  marginBottom: "20px",
  fontWeight: "bold",
};

const heroSubtitle: React.CSSProperties = {
  fontSize: "clamp(14px, 2.8vw, 20px)",
  lineHeight: "1.6",
};

const mainButton: React.CSSProperties = {
  padding: "12px 24px",
  margin: "0 10px",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
};

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

// const featureCard: React.CSSProperties = {
//   backgroundColor: "#fff",
//   padding: "30px 20px",
//   borderRadius: "8px",
//   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   textAlign: "center",
// };

const subButton: React.CSSProperties = {
  marginTop: "15px",
  padding: "8px 16px",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
