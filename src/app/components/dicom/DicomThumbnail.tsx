// "use client";
// import { useEffect, useRef } from "react";
// import { cornerstone } from "@/lib/cornerstone";

// export default function DicomThumbnail({
//     dicomUrl,
//     onSelect,
// }: {
//     dicomUrl: string;
//     onSelect: () => void;
// }) {
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!ref.current) return;

//         cornerstone.enable(ref.current);
//         cornerstone
//             .loadImage(`wadouri:${dicomUrl}`)
//             .then((img: unknown) => cornerstone.displayImage(ref.current!, img));

//         return () => cornerstone.disable(ref.current!);
//     }, [dicomUrl]);

//     return (
//         <div
//             ref={ref}
//             onClick={onSelect}
//             style={{
//                 width: 140,
//                 height: 140,
//                 background: "black",
//                 cursor: "pointer",
//             }}
//         />
//     );
// }
