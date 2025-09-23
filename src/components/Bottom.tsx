import { notices } from "@/types/notices";
import { events } from "@/types/events";

export function Bottom({events ,notices} : {events : events[], notices : notices[]}) {



    return(<div style={container}>
          {/* 공지사항 */}
          <div style={box}>
            <div style={header}>
              <span style={title}>공지사항</span>
              <span style={moreBtn}>더보기</span>
            </div>
            <ul style={list}>
              {notices &&
                notices.map((n, i) => (
                  <li key={i} style={listItem}>
                    <span>{n.title}</span>
                    <span style={dateStyle}>{n.date}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* 학술행사 */}
          <div style={box}>
            <div style={header}>
              <span style={title}>학술행사</span>
              <span style={moreBtn}>더보기</span>
            </div>
            <ul style={list}>
              {events &&
                events.map((e, i) => (
                  <li key={i} style={listItem}>
                    <span>{e.title}</span>
                    <span style={dateStyle}>{e.date}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
    );
}


const container: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  maxWidth: "1000px",
  margin: "40px auto",
};

const box: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "16px",
  background: "white",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "8px",
};

const title: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
};

const moreBtn: React.CSSProperties = {
  fontSize: "14px",
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline",
};

const list: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const listItem: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#374151",
};

const dateStyle: React.CSSProperties = {
  color: "#6b7280",
  marginLeft: "12px",
  fontSize: "13px",
  whiteSpace: "nowrap",
};