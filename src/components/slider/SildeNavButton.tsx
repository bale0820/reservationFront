import { ReactNode } from "react";

export function SlideNavButton({
    position,
    onClick,
    icon
}: {
    position: "left" | "right";
    onClick: () => void;
    icon: ReactNode
}) {
    return (
        <span
            className={`absolute top-1/2 ${position === "right" ? "right-0" : "left-0"
                } text-3xl z-30 text-green-600 cursor-pointer`}
            onClick={onClick}
        >
            {icon}
        </span>
    );
}