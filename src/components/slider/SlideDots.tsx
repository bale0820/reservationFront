import { ReactNode } from "react";

export function SlideDots({ activeIndex, count, setIndex, icon }: { activeIndex: number, count: number, setIndex: (i: number) => void, icon: ReactNode }) {

    return (
        <div className="absolute bottom-2 w-full text-center z-30 flex justify-center items-center">
            {Array.from({ length: count }).map((_, i) => (
                <span
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`cursor-pointer mx-1 transition-all ${activeIndex === i ? "text-green-500 text-2xl" : "text-white text-base"
                        }`}
                >
                    {icon ?? "●"}
                </span>
            ))}
        </div>
    );
}