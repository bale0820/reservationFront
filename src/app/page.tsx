"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { axiosGet } from "@/utils/axiosGet";
import { createObserver } from "@/hooks/createObserver";
import { useAutoSlider } from "@/hooks/useAutoSlider";
import { imgData } from "@/types/imgData";
import { notices } from "@/types/notices";
import { events } from "@/types/events";
import { MainHeader } from "@/components/MainHeader";

export default function HomePage() {
  const router = useRouter();
  // const [index, setIndex] = useState(0);
  const [images, setImages] = useState<imgData[]>([]);
  // const { index, setIndex } = useAutoSlider(images.length, 5000);
  const [notices, setNotices] = useState<notices[]>([]);
  const [events, setEvents] = useState<events[]>([]);

  //메인 이미지 불러오기
  useEffect(() => {
    const axiosData = async () => {
      const res = await axiosGet<imgData[]>(`/datas/mainImgData.json`);
      setImages(res);
    };
    const axiosData2 = async () => {
      const res = await axiosGet<notices[]>(`/datas/notices.json`);
      setNotices(res);
    };
    const axiosData3 = async () => {
      const res = await axiosGet<events[]>(`/datas/events.json`);
      setEvents(res);
    };
    axiosData();
    axiosData2();
    axiosData3();
  }, []);

  //첫화면 등장시 애니메이션 동작 구현
  useEffect(() => {
    const observer = createObserver(".featureCard", "show", {
      threshold: 0.1,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <MainHeader images={images} />
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
              {notices &&
                notices.map((n, i) => (
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
              {events &&
                events.map((e, i) => (
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
