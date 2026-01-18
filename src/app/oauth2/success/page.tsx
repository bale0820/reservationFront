// "use client";


// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";



// export default function OAuth2SuccessPage() {
//   const params = new URLSearchParams(window.location.search);
//   const token = params.get("token");
//   const hasPhone = params.get("hasPhone") === "true";
//   const router = useRouter();
//   console.log("hasPhone", hasPhone);
//   useEffect(() => {


//     if (token) {
//       localStorage.setItem("token", token);

//       if (hasPhone) {
//         // 휴대폰 번호 있음 → 홈으로
//         // window.location.href = "/";
//         router.push("/");
//       } else {
//         // 휴대폰 번호 없음 → 추가 입력 페이지
//         // window.location.href = "/register/naverLogin";
//         router.push("/register/kakaoLogin");
//       }
//     }
//   }, [token]);

//   return <p>로그인 처리 중입니다...</p>;
// }
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuth2SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const hasPhone = searchParams.get("hasPhone") === "true";

  useEffect(() => {
    if (!token) return;

    localStorage.setItem("token", token);

    if (hasPhone) {
      router.push("/");
    } else {
      router.push("/register/kakaoLogin");
    }
  }, [token, hasPhone, router]);

  return <p>로그인 처리 중입니다...</p>;
}
