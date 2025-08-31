"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuth2SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // ✅ 토큰을 localStorage 에 저장
      localStorage.setItem("token", token);

      // ✅ 이후 원하는 페이지로 이동 (예: 홈)
      window.location.href = "/";
    }
  }, [token]);

  return <p>로그인 처리 중입니다...</p>;
}
