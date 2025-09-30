// components/EventList.tsx
import { Event } from "@/types";

export function EventList({ events }: { events: Event[] }) {
  return (
    <ul className="list-none m-0 p-0">
      {events.map((e, i) => (
        <li
          key={i}
          className="flex justify-between mb-2 text-sm text-gray-700"
        >
          <span>{e.title}</span>
          <span className="text-gray-500 ml-3 text-xs whitespace-nowrap">
            {e.date}
          </span>
        </li>
      ))}
    </ul>
  );
}
