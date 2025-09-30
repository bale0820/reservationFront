// components/NoticeList.tsx
import { Notice } from "@/types";

export function NoticeList({ notices }: { notices: Notice[] }) {
    return (
        <ul className="list-none m-0 p-0">
            {notices.map((n, i) => (
                <li
                    key={i}
                    className="flex justify-between mb-2 text-sm text-gray-700"
                >
                    <span>{n.title}</span>
                    <span className="text-gray-500 ml-3 text-xs whitespace-nowrap">
                        {n.date}
                    </span>
                </li>
            ))}
        </ul>
    );
}
