"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
const images = [
  {
    src: "/hospital.png",
    alt: "병원 이미지 1",
    position: "40% 40%",
    title: "의료 AI 분석 서비스",
    subtitle: "AI를 활용하여 의료 영상을 분석하고, 손쉽게 진료 예약 관리",
    link: "/explain/page1",
  },
  {
    src: "/hospital2.png",
    alt: "병원 이미지 2",
    position: "40% 33%",
    title: "환자를 먼저 생각하는 진료",
    subtitle: "따뜻한 의료 서비스",
    link: "/explain/page2",
  },
  {
    src: "/hospital3.png",
    alt: "병원 이미지 3",
    position: "40% 35%",
    title: "신뢰할 수 있는 의료 서비스",
    subtitle: "편리한 예약과 빠른 진료",
    link: "/explain/page3",
  },
];
export default function HomePage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % images.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
       <div style={heroSection}>
    {images.map((img, i) => (
      <Link key={i} href={img.link}>
        <div
          style={{
            position: "absolute", // 이미지 겹치기
            inset: 0,             // top:0, right:0, bottom:0, left:0
            transition: "opacity 1s ease-in-out",
            opacity: index === i ? 1 : 0,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            layout="fill"
            style={{ objectFit: "cover", objectPosition: img.position }}
            priority={index === i}
            quality={100}
          />

          {/* 텍스트 오버레이 */}
          <div
            style={{
              position: "absolute", //포지션이 있어야 inset이랑 zindex가 먹힘
              inset: 0, 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // 세로 중앙
              alignItems: "center",     // 가로 중앙
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <div style={heroContent}>
              <h1 style={heroTitle}>{img.title}</h1>
              <p style={heroSubtitle}>{img.subtitle}</p>
              <p style={{ color: "#fc9905ff", fontSize: "20px" }}>자세히 보기</p>
            </div>
          </div>
        </div>
      </Link>
    ))}

    {/* 하단 도트 */}
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        width: "100%",
        textAlign: "center",
        zIndex: 3,
      }}
    >
      {images.map((_, i) => (
        <span
          key={i}
          onClick={() => setIndex(i)}
          style={{
            cursor: "pointer",
            margin: "0 5px",
            fontSize: index === i ? "1.5rem" : "1rem",
            color: index === i ? "green" : "white",
            transition: "all 0.3s ease",
          }}
        >
          ●
        </span>
      ))}
    </div>
  </div>
      {/* 기능 소개 섹션 */}
      <div style={featureSection}>
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
        <div style={container}>
          {/* 공지사항 */}
          <div style={box}>
            <div style={header}>
              <span style={title}>공지사항</span>
              <span style={moreBtn}>더보기</span>
            </div>
            <ul style={list}>
              {notices.map((n, i) => (
                <li key={i} style={listItem}>
                  <span>{n.title}</span>
                  <span style={dateStyle}>{n.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 학술행사 */}
          <div style={box}>
            <div style={header}>
              <span style={title}>학술행사</span>
              <span style={moreBtn}>더보기</span>
            </div>
            <ul style={list}>
              {events.map((e, i) => (
                <li key={i} style={listItem}>
                  <span>{e.title}</span>
                  <span style={dateStyle}>{e.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 스타일 정의 */
// const heroSection: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   color: "#fff",
//   padding: "auto",
//   position: "relative",
//   width: "100%",
//   // height: "clamp(200px, 30svh, 900px)",
//   height: "500px",
//   overflow: "hidden",
//   textAlign: "center",
// };

// const heroContent: React.CSSProperties = {
//   position: "relative",
//   zIndex: 2, // 오버레이 위로
//   display: "flex",
//   flexDirection: "column",
//   // alignItems : "center",
//   // justifyContent : "center",
//   gap: "5px", // 제목/문단 간격
// };

// const heroTitle: React.CSSProperties = {
//   fontSize: "clamp(24px, 6vw, 48px)",
//   marginBottom: "20px",
//   fontWeight: "bold",
// };

// const heroSubtitle: React.CSSProperties = {
//   fontSize: "clamp(14px, 2.8vw, 20px)",
//   lineHeight: "1.6",
// };

const heroSection: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "500px",
  overflow: "hidden",
  color: "#fff",
};

const heroContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
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

const container: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  maxWidth: "1000px",
  margin: "40px auto",
};

const box: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
  background: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "8px",
};

const title: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
};

const moreBtn: React.CSSProperties = {
  fontSize: "14px",
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline",
};

const list: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const listItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#374151",
};

const dateStyle: React.CSSProperties = {
  color: "#6b7280",
  marginLeft: "12px",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const notices = [
  {
    title: "비대면 계정공 및 외부주치의 본문 수수료 인하 안내",
    date: "2025.03.06",
  },
  { title: "계정 공통 수수료 인상 안내 (25.2.1 적용)", date: "2025.03.01" },
  { title: "모바일 건강검진 QR 운영 안내 (24.1.1 시행)", date: "2025.02.07" },
  { title: "삼성서울병원 마이크로칩 도입 변경 안내", date: "2025.03.13" },
  { title: "삼성서울병원 개인정보처리방침 개정 공지", date: "2025.07.01" },
];

const events = [
  {
    title: "[2025 SPC Webinar 09] 헬리코박터 최신지견 (Update 2025)",
    date: "2025.08.25",
  },
  {
    title: "[2025 SPC Webinar 08] 위식도역류질환 최신 진단",
    date: "2025.07.29",
  },
  {
    title: "2025년 제11회 삼성서울병원 아이엔공공포럼 심포지엄",
    date: "2025.07.17",
  },
  {
    title: "2025년 계기의 삼성서울병원 공학과 융합 심포지엄",
    date: "2025.07.11",
  },
  { title: "제8회 삼성서울병원 외과 심포지엄", date: "2025.07.01" },
];
