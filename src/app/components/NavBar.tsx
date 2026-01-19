"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!userEmail;

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.sub || null);
      } catch {
        setUserEmail(null);
      }
    } else setUserEmail(null);
  };

  useEffect(() => {
    checkToken();
    const onStorage = () => checkToken();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 드로어 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    alert("로그아웃 되었습니다.");
    setOpen(false);
    router.push("/login");
  };

  // 공통 네비게이션 핸들러
  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* 상단 바 */}
      <nav style={navStyle} aria-label="Top navigation">
        {/* 햄버거 버튼 (모바일/데스크탑 공통 표시해도 됨) */}
        <button
          aria-label="메뉴 열기"
          onClick={() => setOpen(true)}
          style={hamburgerBtn}
        >
          {/* 간단한 햄버거 아이콘 */}
          <span style={bar} />
          <span style={bar} />
          <span style={bar} />
        </button>

        {/* 로고 (모바일에서도 보여주고 싶으면 hide-on-mobile 제거) */}
        <span style={logoStyle} onClick={() => go("/")}>
          🏥 Medical AI
        </span>

        {/* 상단의 오른쪽 버튼들은 데스크탑에서만 표시 */}
        <div className="hide-on-mobile" style={navRight}>
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: 12, fontSize: "0.9rem", color: "#fff" }}>
                {userEmail}
              </span>
              <button style={logoutButton} onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* <button style={navButton} onClick={() => go("/login")}>로그인</button>
              <button style={navButton} onClick={() => go("/register/step1")}>회원가입</button> */}
            </>
          )}
        </div>
      </nav>

      {/* 오버레이 */}
      <div
        className={`drawer-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* 왼쪽 드로어 */}

      <aside
        className={`drawer ${open ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="사이드 메뉴"
      >
        <div className="drawer-header">
          <span>메뉴</span>
          <button aria-label="메뉴 닫기" onClick={() => setOpen(false)} style={closeBtn}>
            ✕
          </button>
        </div>

        {/* 로그인 상태 표시 */}
        <div style={{ padding: "10px 12px", fontSize: 14, color: "#666" }}>
          {isLoggedIn ? <>로그인: <b>{userEmail}</b></> : "로그인되지 않음"}
        </div>

        <nav className="drawer-list">
          <button className="drawer-item" onClick={() => go("/")}>홈</button>
          <button className="drawer-item" onClick={() => go("/upload")}>업로드</button>
          <button className="drawer-item" onClick={() => go("/results")}>결과</button>
          <button className="drawer-item" onClick={() => go("/my-reservations")}>환자 예약</button>
          <button className="drawer-item" onClick={() => go("/chat")}>ai 조언</button>
          <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "8px 0" }} />
          {isLoggedIn ? (
            <button className="drawer-item" onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <button className="drawer-item" onClick={() => go("/login")}>로그인</button>
              <button className="drawer-item" onClick={() => go("/register")}>회원가입</button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

/* 상단 네비 스타일 */
const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 16px",
  background: "black",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 1200,
};

const navRight: React.CSSProperties = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const logoStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: "1.1rem",
  cursor: "pointer",
};

const navButton: React.CSSProperties = {
  background: "transparent",
  color: "#fff",
  border: "1px solid #fff",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: "0.9rem",
};

const logoutButton: React.CSSProperties = {
  ...navButton,
  background: "#fff",
  color: "#4caf50",
  border: "1px solid #fff",
};

/* 햄버거 버튼/아이콘 */
const hamburgerBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  padding: 6,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  alignItems: "flex-start",
};
const bar: React.CSSProperties = {
  width: 20,
  height: 2,
  background: "#fff",
  display: "block",
  borderRadius: 2,
};

/* 닫기 버튼 */
const closeBtn: React.CSSProperties = {
  // background: "transparent",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
};
