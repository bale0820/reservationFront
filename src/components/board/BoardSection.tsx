// components/BoardSection.tsx
import { ReactNode } from "react";

export function BoardSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
                <span className="text-lg font-bold text-gray-900">{title}</span>
                <span className="text-sm text-blue-600 cursor-pointer underline">
                    더보기
                </span>
            </div>
            {children}
        </div>
    );
}
