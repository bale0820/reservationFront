
export function SlideDots({ activeIndex, count, setIndex, shape: Icon }: { activeIndex: number, count: number, setIndex: (i: number) => void, shape: React.ElementType }) {

    return (
        <div className="absolute bottom-2 w-full text-center z-30">
            {Array.from({ length: count }).map((_, i) => (
                <span
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`cursor-pointer mx-1 transition-all ${activeIndex === i ? "text-green-500 text-2xl" : "text-white text-base"
                        }`}
                >
                    {Icon ? <Icon /> : "●"}
                </span>
            ))}
        </div>

    );
}