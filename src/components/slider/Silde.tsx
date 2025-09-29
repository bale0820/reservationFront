import Image from "next/image";
import Link from "next/link";
import { imgData } from "@/types/imgData";

export function Slide({ img, isActive }: { img: imgData; isActive: boolean }) {
    return (
        <Link href={img.link}>
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100" : "opacity-0"
                    }`}
            >
                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: img.position }}
                    priority={isActive}
                    quality={100}
                />
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
    );
}
