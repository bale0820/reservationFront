
// import { useRouter } from "next/navigation";

// export function Main() {
//   const router = useRouter();

//   return (
//     <div className="py-16 px-5 bg-[#f9f9f9]">
//       <h2 className="text-center mb-10 font-bold text-2xl">서비스 주요 기능</h2>
//       <div className="grid gap-5 max-w-[1000px] mx-auto grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center ">
//           <h3 className="font-semibold text-lg mb-2">1. 의료 영상 업로드</h3>
//           <p className="text-gray-700">간단한 업로드만으로 AI 분석 시작</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/upload")}
//           >
//             업로드
//           </button>
//         </div>

//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center ">
//           <h3 className="font-semibold text-lg mb-2">2. 분석 결과 확인</h3>
//           <p className="text-gray-700">정확도와 결과를 실시간으로 확인 가능</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/results")}
//           >
//             결과 확인
//           </button>
//         </div>

//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center">
//           <h3 className="font-semibold text-lg mb-2">3. 예약 관리</h3>
//           <p className="text-gray-700">진료 예약 및 나의 예약 이력 관리</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/my-reservations")}
//           >
//             내 예약
//           </button>
//         </div>

//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center">
//           <h3 className="font-semibold text-lg mb-2">3. 예약</h3>
//           <p className="text-gray-700">진료 예약</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/reserve")}
//           >
//             예약하기
//           </button>
//         </div>

//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center">
//           <h3 className="font-semibold text-lg mb-2">4. 의료 상담</h3>
//           <p className="text-gray-700">의료 관련 상담</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/chat")}
//           >
//             상담 받아보기
//           </button>
//         </div>

//         <div className="featureCard bg-white p-8 rounded-lg shadow text-center">
//           <h3 className="font-semibold text-lg mb-2">5. 건강검진 서비스</h3>
//           <p className="text-gray-700">건강검진</p>
//           <button
//             className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={() => router.push("/chat")}
//           >
//             알아보기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// components/Main.tsx
import { features } from "@/components/features/feature";
import { FeatureCard } from "./FeatureCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {  axiosGet1 } from "@/utils/axiosGet";

export function Main() {
  const [features, setFeatures] = useState([]);


  },[]);

  return (
    <div className="py-16 px-5 bg-[#f9f9f9]">
      <h2 className="text-center mb-10 font-bold text-2xl">서비스 주요 기능</h2>
      <div className="grid gap-5 max-w-[1000px] mx-auto grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {features.map((f) => (
          <FeatureCard key={f.id} feature={f} />
        ))}
      </div>
    </div>
  );
}
