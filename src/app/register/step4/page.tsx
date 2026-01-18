"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { ConfirmationResult } from "firebase/auth";
import { useLayoutEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { API_BASE_URL } from "@/shared/constants/clientEnv";
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

export default function Step2RegisterPage() {
  const router = useRouter();
  // 입력값 상태
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    emailDomain: "",
    userId: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [userIdMessage, setUserIdMessage] = useState("");

  // 각 필드 ref
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [code, setCode] = useState("");

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


  const countSpecialChars = (str: string) => {
    const match = str.match(/[^a-zA-Z0-9]/g);
    return match ? match.length : 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("form은", form);

  };

  const handleChangeUserId = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
      const res = await axios.post<ApiResponse<string>>(
        `${API_BASE}/api/register/checkUserId`,
        form
      );
      if (res.data.success) {
        setUserIdMessage("사용 가능합니다.");
      } else {
        setUserIdMessage("사용 불가능합니다");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };



  // 📌 인증번호 확인
  const verifyCode = async () => {
    try {
      await confirmationResult?.confirm(code);
      alert("인증 성공!");
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
        "+82" + form.phone.slice(1),
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


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 순차적으로 체크 → 누락된 곳으로 포커스
      if (!form.name) {
        alert("이름을 입력하세요!");
        nameRef.current?.focus();
        return;
      }
      if (!form.phone) {
        alert("휴대폰 번호를 입력하세요!");
        phoneRef.current?.focus();
        return;
      }
      if (!form.email) {
        alert("이메일을 입력하세요!");
        emailRef.current?.focus();
        return;
      }
      if (!form.emailDomain) {
        alert("주소를 입력하세요!");
        selectRef.current?.focus();
        return;
      }
      if (!form.userId) {
        alert("아이디를 입력하세요!");
        userIdRef.current?.focus();
        return;
      }
      if (!form.password) {
        alert("비밀번호를 입력하세요!");
        passwordRef.current?.focus();
        return;
      }
      if (!form.confirmPassword) {
        alert("비밀번호를 입력하세요!");
        passwordRef2.current?.focus();
        return;
      }
      if (!(form.confirmPassword === form.password)) {
        alert("비밀번호가 같지않습니다!");
        passwordRef2.current?.focus();
        return;
      }

      // ✅ 이메일 합치기
      const fullEmail = `${form.email}@${form.emailDomain}`;

      // ✅ 서버 전송용 데이터 만들기
      const sendData = {
        ...form,
        email: fullEmail, // 기존 email 필드를 덮어쓰기
      };

      const API_BASE =
        API_BASE_URL;
      const res = await axios.post<ApiResponse<string>>(
        `${API_BASE}/api/register`,
        sendData
      );

      if (res.data.success) {
        setMessage("회원가입 성공! 로그인 페이지로 이동합니다.");
        console.log("form은 ", form)
      }
      else setMessage("회원가입 실패.");;
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
        <h2 style={titleStyle}>회원유형: 일반</h2>

        <div style={formGroup}>
          <label style={labelStyle}>이름 *</label>
          <input
            style={inputStyle}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="본인인증 시 자동입력"
            ref={nameRef}
          />
          {form.name.length > 0 && form.name.length < 2 && (
            <p style={{ color: "red" }}>이름은 최소 2자 이상이어야 합니다.</p>
          )}
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>휴대폰 *</label>
          <input
            style={inputStyle}
            name="phone"
            value={form.phone}
            placeholder="휴대폰 번호 입력"
            onChange={(e) => {
              // 숫자만 허용
              // const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              // setForm({ ...form, phone: onlyNums });

              const { name, value } = e.target;
              setForm({ ...form, [name]: value });
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

        <div style={formGroup}>
          <label style={labelStyle}>이메일 *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일 입력"
              ref={emailRef}
            />
            <span>@</span>
            <select
              style={{ ...inputStyle, flex: 1 }}
              name="emailDomain"
              value={form.emailDomain}
              onChange={handleChange}
              ref={selectRef}
            >
              <option value="">직접입력</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </div>
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>아이디 *</label>
          <input
            style={inputStyle}
            name="userId"
            value={form.userId}
            onChange={handleChangeUserId}
            placeholder="5~20자 영문+숫자"
            ref={userIdRef}
          />
          {!(userIdMessage === "") && (
            <p style={{ color: message.includes("불") ? "red" : "greem" }}>
              {userIdMessage}
            </p>
          )}
          {form.userId.length > 0 && form.userId.length < 5 && (
            <p style={{ color: "red" }}>아이디는 최소 5자 이상이어야 합니다.</p>
          )}
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>비밀번호 *</label>
          <input
            type="password"
            style={inputStyle}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="8~20자 영문/숫자/특수문자"
            ref={passwordRef}
          />
          {form.password.length > 0 &&
            form.password.length < 10 &&
            (countSpecialChars(form.password) < 2 ? (
              <p style={{ color: "red" }}>
                비밀번호는 특수문자가 최소 2개 포함되어야 합니다.
              </p>
            ) : (
              <p style={{ color: "red" }}>
                비밀번호는 최소 10자 이상이어야 합니다.
              </p>
            ))}
        </div>

        <div style={formGroup}>
          <label style={labelStyle}>비밀번호 확인 *</label>
          <input
            type="password"
            style={inputStyle}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 다시 입력"
            ref={passwordRef2}
          />
        </div>

        {/* 버튼 그룹 */}
        <div style={buttonWrapper}>
          <button
            type="button"
            style={prevBtn}
            onClick={() => router.push("/register/step1")}
          >
            이전
          </button>
          <button type="submit" style={nextBtn}>
            완료
          </button>
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
  background: "#000000",
};

const headerStyle: React.CSSProperties = {
  width: "100%",

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
  background: "#000000",
};

const nextBtn: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: "4px",
  fontSize: "14px",
  cursor: "pointer",
  border: "none",
  background: "#000000",
  color: "white",
};

const footerStyle: React.CSSProperties = {
  marginTop: "auto",
  padding: "16px",
  fontSize: "12px",
  color: "#9ca3af",
};
