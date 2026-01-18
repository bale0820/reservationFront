"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuthHandler() {
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
