// "use client";

// import { useEffect, useRef } from "react";
// import { cornerstone } from "@/lib/cornerstone";

// type Props = {
//     dicomUrl: string;
// };

// export default function DicomViewer({ dicomUrl }: Props) {
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!ref.current) return;

//         cornerstone.enable(ref.current);

//         const imageId = `wadouri:${dicomUrl}`;

//         cornerstone.loadImage(imageId).then((image: any) => {
//             cornerstone.displayImage(ref.current!, image);
//         });

//         return () => {
//             cornerstone.disable(ref.current!);
//         };
//     }, [dicomUrl]);

//     return (
//         <div
//             ref={ref}
//             style={{ width: 600, height: 600, backgroundColor: "black" }}
//         />
//     );
// }


"use client";

import { useEffect, useRef } from "react";

type Props = {
    dicomUrl: string;
};

export default function DicomViewer({ dicomUrl }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cornerstone: any;

        const init = async () => {
            if (!ref.current) return;

            try {
                const cs = await import("cornerstone-core");
                const wado = await import("cornerstone-wado-image-loader");
                const dicomParser = await import("dicom-parser");

                cornerstone = cs.default ?? cs;
                const cornerstoneWADOImageLoader = wado.default ?? wado;

                // 🔑 필수 연결
                cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
                cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

                // 🔑 WebWorker 비활성화 (Next.js 필수)
                cornerstoneWADOImageLoader.configure({
                    useWebWorkers: false,
                });

                // 🔑 wadouri 스킴 등록 (이거 없으면 무조건 에러)
                cornerstone.registerImageLoader(
                    "wadouri",
                    cornerstoneWADOImageLoader.wadouri.loadImage
                );

                cornerstone.enable(ref.current);

                const imageId = `wadouri:${dicomUrl}`;
                const image = await cornerstone.loadImage(imageId);

                cornerstone.displayImage(ref.current, image);
            } catch (err) {
                console.error("❌ DICOM 로딩 실패", err);
            }
        };

        init();

        return () => {
            if (cornerstone && ref.current) {
                cornerstone.disable(ref.current);
            }
        };
    }, [dicomUrl]);

    return (
        <div
            ref={ref}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
            }}
        />
    );
}
