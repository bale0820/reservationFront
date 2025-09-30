// components/Bottom.tsx
import { Event } from "@/types/events";
import { Notice } from "@/types/notices";
import { NoticeList } from "./NoticeList";
import { EventList } from "./EventList";
import { BoardSection } from "./BoardSection";

export function Bottom({ events, notices }: { events: Event[]; notices: Notice[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto my-10 px-4">
      <BoardSection title="공지사항">
        <NoticeList notices={notices} />
      </BoardSection>

      <BoardSection title="학술행사">
        <EventList events={events} />
      </BoardSection>
    </div>
  );
}
