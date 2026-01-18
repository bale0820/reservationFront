"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { ConfirmationResult } from "firebase/auth";
import { useLayoutEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    grecaptcha?: unknown;
  }
}

export default function KakaoRegisterPage() {
  const router = useRouter();
  // 입력값 상태
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 각 필드 ref

  const phoneRef = useRef<HTMLInputElement>(null);


  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [code, setCode] = useState("");
  // ✅ 페이지 이동 감지
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isVerified) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handlePopState = () => {
      if (!isVerified) {
        const answer = confirm("휴대폰 미인증 시 불이익이 있을 수 있습니다. 이동하시겠습니까?");
        if (!answer) {
          history.pushState(null, "", location.href); // 현재 페이지 유지
        } else {
          router.push("/"); // 홈으로 이동
        }
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isVerified, router]);




  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      // 페이지 입장 시 기존 verifier 제거
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch { }
        delete window.recaptchaVerifier;
      }

      import("firebase/app").then(({ getApp }) => {
        console.log("Firebase options:", getApp().options);
      });

      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response: string) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        },
        auth
      );

      window.recaptchaVerifier.render();

    }

    // 페이지 떠날 때 클린업
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch { }
        delete window.recaptchaVerifier;
      }
    };
  }, []);




  // 📌 인증번호 확인
  const verifyCode = async () => {
    try {
      await confirmationResult?.confirm(code);
      alert("인증 성공!");
      setIsVerified(true);
      handleRegister();
    } catch (error) {
      console.error(error);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const sendCode = async () => {
    try {
      if (!window.recaptchaVerifier) {
        alert("reCAPTCHA 초기화 안됨");
        return;
      }

      const result = await signInWithPhoneNumber(
        auth,
        "+82" + phone.slice(1),
        // "+821012345678",
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      alert("인증번호가 전송되었습니다!");
    } catch (error) {
      console.error(error);
      alert("인증번호 전송 실패");
    }
  };

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    try {
      // 순차적으로 체크 → 누락된 곳으로 포커스
      if (!phone) {
        alert("휴대폰 번호를 입력하세요!");
        phoneRef.current?.focus();
        return;
      }

      const API_BASE =
        process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
      const res = await axios.post<ApiResponse<string>>(
        `${API_BASE}/api/registerNaver`,
        { phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success)
        setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
      else setMessage("회원가입 실패.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return (
    <div style={pageWrapper}>
      {/* 상단 헤더 */}
      <div style={headerStyle}>회원정보 입력</div>

      {/* 중앙 폼 */}
      <form style={containerStyle} onSubmit={handleRegister}>
        <h2 style={titleStyle}>회원유형: 네이버회원</h2>
        <div style={formGroup}>
          <label style={labelStyle}>휴대폰 *</label>
          <input
            style={inputStyle}
            name="phone"
            value={phone}
            placeholder="휴대폰 번호 입력"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            // maxLength={11}
            ref={phoneRef}
          />
          <button
            onClick={sendCode}
            type="button"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            인증번호 전송
          </button>
          <div id="recaptcha-container"></div>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              />
              <button
                onClick={verifyCode}
                type="button"
                style={{ width: "100%" }}
              >
                확인
              </button>
            </>
          )}
        </div>
      </form>









      {message && (
        <p style={{ color: message.includes("성공") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <footer style={footerStyle}>© MEDICAL AI CENTER</footer>
    </div>
  );
}

/* 🎨 스타일 정의 (변경 없음) */
const pageWrapper: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f9fafb",
};

const headerStyle: React.CSSProperties = {
  width: "100%",
  background: "#6cc20bff",
  color: "white",
  textAlign: "center",
  padding: "16px",
  fontSize: "18px",
  fontWeight: "bold",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "500px",
  margin: "60px auto",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "left",
};

const titleStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "24px",
};

const formGroup: React.CSSProperties = {
  marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  fontSize: "14px",
};

const buttonWrapper: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "24px",
};

const prevBtn: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  background: "#6cc20bff",
};

const nextBtn: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  border: "none",
  background: "#6cc20bff",
  color: "white",
};

const footerStyle: React.CSSProperties = {
  marginTop: "auto",
  padding: "16px",
  fontSize: "12px",
  color: "#9ca3af",
};
