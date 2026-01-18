// data/features.ts
import { Feature } from "@/types/feature";

export const features: Feature[] = [
  {
    id: 1,
    title: "1. 의료 영상 분석",
    description: "간단한 업로드만으로 AI 분석 시작",
    buttonText: "사진 분석 요청",
    path: "/upload",
  },
  {
    id: 2,
    title: "2. 전체 환자 CT 조회",
    description: "정확도와 결과를 실시간으로 확인 가능",
    buttonText: "결과 확인",
    path: "/results",
  },
  {
    id: 3,
    title: "3. 전체 근무자 조회",
    description: "근무자 전체  관리",
    buttonText: "조회하기",
    path: "/staffs",
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
    title: "5. 환자 상태 관리",
    description: "환자 정보",
    buttonText: "알아보기",
    path: "/manage",
  }
];
