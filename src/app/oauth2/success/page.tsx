"use client";


import { useSearchParams } from "next/navigation";
import { useEffect } from "react";



export default function OAuth2SuccessPage() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");
  const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const hasPhone = params.get("hasPhone") === "true";

  // useEffect(() => {
  //   if (token) {
  //     // ✅ 토큰을 localStorage 에 저장
  //     localStorage.setItem("token", token);

  //     // ✅ 이후 원하는 페이지로 이동 (예: 홈)
  //     window.location.href = "/";
  //   }
  // }, [token]);

  useEffect(() => {
    

    if (token) {
      localStorage.setItem("token", token);

      if (hasPhone) {
        // 휴대폰 번호 있음 → 홈으로
        window.location.href = "/";
      } else {
        // 휴대폰 번호 없음 → 추가 입력 페이지
        window.location.href = "/";
      }
    }
  }, [token]);

  return <p>로그인 처리 중입니다...</p>;
}
