// data/features.ts
import { Feature } from "@/types/feature";

export const features: Feature[] = [
  {
    id: 1,
    title: "1. 의료 영상 업로드",
    description: "간단한 업로드만으로 AI 분석 시작",
    buttonText: "업로드",
    path: "/upload",
  },
  {
    id: 2,
    title: "2. 분석 결과 확인",
    description: "정확도와 결과를 실시간으로 확인 가능",
    buttonText: "결과 확인",
    path: "/results",
  },
  {
    id: 3,
    title: "3. 예약 관리",
    description: "진료 예약 및 나의 예약 이력 관리",
    buttonText: "내 예약",
    path: "/my-reservations",
  },
  {
    id: 4,
    title: "3. 예약",
    description: "진료 예약",
    buttonText: "예약하기",
    path: "/reserve",
  },
  {
    id: 5,
    title: "4. 의료 상담",
    description: "의료 관련 상담",
    buttonText: "상담 받아보기",
    path: "/chat",
  },
  {
    id: 6,
    title: "5. 건강검진 서비스",
    description: "건강검진",
    buttonText: "알아보기",
    path: "/chat",
  },
];
