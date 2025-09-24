// import { notices } from "@/types/notices";
// import { events } from "@/types/events";

// export function Bottom({events ,notices} : {events : events[], notices : notices[]}) {

//     return(<div style={container}>
//           {/* 공지사항 */}
//           <div style={box}>
//             <div style={header}>
//               <span style={title}>공지사항</span>
//               <span style={moreBtn}>더보기</span>
//             </div>
//             <ul style={list}>
//               {notices &&
//                 notices.map((n, i) => (
//                   <li key={i} style={listItem}>
//                     <span>{n.title}</span>
//                     <span style={dateStyle}>{n.date}</span>
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           {/* 학술행사 */}
//           <div style={box}>
//             <div style={header}>
//               <span style={title}>학술행사</span>
//               <span style={moreBtn}>더보기</span>
//             </div>
//             <ul style={list}>
//               {events &&
//                 events.map((e, i) => (
//                   <li key={i} style={listItem}>
//                     <span>{e.title}</span>
//                     <span style={dateStyle}>{e.date}</span>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//     );
// }

// const container: React.CSSProperties = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "24px",
//   maxWidth: "1000px",
//   margin: "40px auto",
// };

// const box: React.CSSProperties = {
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   padding: "16px",
//   background: "white",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
// };

// const header: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "12px",
//   borderBottom: "1px solid #e5e7eb",
//   paddingBottom: "8px",
// };

// const title: React.CSSProperties = {
//   fontSize: "18px",
//   fontWeight: "bold",
//   color: "#111827",
// };

// const moreBtn: React.CSSProperties = {
//   fontSize: "14px",
//   color: "#2563eb",
//   cursor: "pointer",
//   textDecoration: "underline",
// };

// const list: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

// const listItem: React.CSSProperties = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginBottom: "8px",
//   fontSize: "14px",
//   color: "#374151",
// };

// const dateStyle: React.CSSProperties = {
//   color: "#6b7280",
//   marginLeft: "12px",
//   fontSize: "13px",
//   whiteSpace: "nowrap",
// };

import { notices } from "@/types/notices";
import { events } from "@/types/events";

export function Bottom({
  events,
  notices,
}: {
  events: events[];
  notices: notices[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto my-10 px-4">
      {/* 공지사항 */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
          <span className="text-lg font-bold text-gray-900">공지사항</span>
          <span className="text-sm text-blue-600 cursor-pointer underline">
            더보기
          </span>
        </div>
        <ul className="list-none m-0 p-0">
          {notices &&
            notices.map((n, i) => (
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
      </div>

      {/* 학술행사 */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
          <span className="text-lg font-bold text-gray-900">학술행사</span>
          <span className="text-sm text-blue-600 cursor-pointer underline">
            더보기
          </span>
        </div>
        <ul className="list-none m-0 p-0">
          {events &&
            events.map((e, i) => (
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
      </div>
    </div>
  );
}
