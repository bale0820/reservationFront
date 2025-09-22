import { useAutoSlider } from "@/hooks/useAutoSlider";
import { imgData } from "@/types/imgData";
import Image from "next/image";
import Link from "next/link";

export function MainHeader({ images }: { images: imgData[] }) {
  const { index, setIndex } = useAutoSlider(images.length, 5000);

  return (
    <div className="relative w-full h-[500px] overflow-hidden text-white">
      {images.map((img, i) => (
        <Link key={i} href={img.link}>
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={{ objectPosition: img.position }}
              priority={index === i}
              quality={100}
            />

            {/* 텍스트 오버레이 */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold mb-5 text-[clamp(24px,6vw,48px)]">
                  {img.title}
                </h1>
                <p className="leading-relaxed text-[clamp(14px,2.8vw,20px)]">
                  {img.subtitle}
                </p>
                <p className="text-[#fc9905] text-lg">자세히 보기</p>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* 하단 도트 */}
      <div className="absolute bottom-2 w-full text-center z-30">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer mx-1 transition-all ${
              index === i ? "text-green-500 text-2xl" : "text-white text-base"
            }`}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
}

// export function MainHeader({ images }: { images: imgData[] }) {
//   const { index, setIndex } = useAutoSlider(images.length, 5000);
//   return (
//     <div style={heroSection}>
//       {images.map((img, i) => (
//         <Link key={i} href={img.link}>
//           <div
//             className={`absolute inset-0  transition-opacity duration-1000 ease-in-out  ${index === i ? "opacity-100" : "opacity-0"} `}
//           >
//             <Image
//               src={img.src}
//               alt={img.alt}
//               layout="fill"
//               style={{ objectFit: "cover", objectPosition: img.position }}
//               priority={index === i}
//               quality={100}
//             />

//             {/* 텍스트 오버레이 */}
//             <div
//               style={{
//                 position: "absolute", //포지션이 있어야 inset이랑 zindex가 먹힘
//                 inset: 0,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center", // 세로 중앙
//                 alignItems: "center", // 가로 중앙
//                 zIndex: 2,
//                 textAlign: "center",
//               }}
//             >
//               <div style={heroContent}>
//                 <h1 style={heroTitle}>{img.title}</h1>
//                 <p style={heroSubtitle}>{img.subtitle}</p>
//                 <p style={{ color: "#fc9905ff", fontSize: "20px" }}>
//                   자세히 보기
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//       ))}

//       {/* 하단 도트 */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "10px",
//           width: "100%",
//           textAlign: "center",
//           zIndex: 3,
//         }}
//       >
//         {images.map((_, i) => (
//           <span
//             key={i}
//             onClick={() => setIndex(i)}
//             style={{
//               cursor: "pointer",
//               margin: "0 5px",
//               fontSize: index === i ? "1.5rem" : "1rem",
//               color: index === i ? "green" : "white",
//               transition: "all 0.3s ease",
//             }}
//           >
//             ●
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// const heroSection: React.CSSProperties = {
//   position: "relative",
//   width: "100%",
//   height: "500px",
//   overflow: "hidden",
//   color: "#fff",
// };

// const heroContent: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "5px",
// };

// const heroTitle: React.CSSProperties = {
//   fontSize: "clamp(24px, 6vw, 48px)",
//   marginBottom: "20px",
//   fontWeight: "bold",
// };

// const heroSubtitle: React.CSSProperties = {
//   fontSize: "clamp(14px, 2.8vw, 20px)",
//   lineHeight: "1.6",
// };
// const mainButton: React.CSSProperties = {
//   padding: "12px 24px",
//   margin: "0 10px",
//   backgroundColor: "#4caf50",
//   color: "#fff",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontSize: "1rem",
// };
