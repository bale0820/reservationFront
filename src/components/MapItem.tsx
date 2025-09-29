import React from "react";

type GptItemProps<T extends React.ElementType = "li", P extends React.ElementType = "p"> = {
    outer?: T; // 기본 태그를 정할 수 있는 prop
    inner?: P;
    gpt: {
        id: number | string;
        question: string;
        answer: string;
        createdAt: string | Date;
    };
} & React.ComponentProps<T>;

export default function GptItem<T extends React.ElementType = "li">({
    as,
    gpt,
    ...rest
}: GptItemProps<T>) {
    const Tag = as || "li"; // 기본값은 li

    return (
        <Tag
            className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
            {...rest}
        >
            <p>
                <strong>Q:</strong> {gpt.question}
            </p>
            <p>
                <strong>A:</strong> {gpt.answer}
            </p>
            <p className="text-xs text-gray-400 mt-1">
                {new Date(h.createdAt).toLocaleString()}
            </p>
        </Tag>
    );
}



