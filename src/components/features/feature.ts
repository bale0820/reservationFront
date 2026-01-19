// data/features.ts
import { Feature } from "@/types/feature";

export const features: Feature[] = [
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
    id: 6,
    title: "5. 환자 상태 관리",
    description: "환자 정보",
    buttonText: "알아보기",
    path: "/manage",
  }
];
