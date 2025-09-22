"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Reservation {
  id: number;
  name: string;
  date: string;
  time: string;
  userEmail : string;
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState("");
  // const [editingId, setEditingId] = useState<number | null>(null);
  // const [editData, setEditData] = useState({ name: "", date: "", time: "" });

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("로그인 후 이용해주세요.");
      return
    }

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
      const res = await axios.get<Reservation[]>(`${API_BASE}/api/reservations/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API 요청 시작:", `${API_BASE}/api/reservations/my`) 
      console.log("응답 데이터:", res.data)
      setReservations(res.data);
    } catch (error) {
      setMessage("예약 목록 불러오기 실패!");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("정말 이 예약을 취소하시겠습니까?")) return;

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
      const res = await axios.delete<ApiResponse<void>>(`${API_BASE}/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {success, message, data} = res.data

      setMessage(message);
      alert("예약이 취소되었습니다");
      fetchReservations();
    } catch (error) {
      alert("삭제 실패");
    }
  };

  // const handleEditClick = (r: Reservation) => {
  //   setEditingId(r.id);
  //   setEditData({ name: r.name, date: r.date, time: r.time });
  // };

  // const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditData({ ...editData, [e.target.name]: e.target.value });
  // };

  // const handleUpdate = async (id: number) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   try {
  //     await axios.put(
  //       `http://localhost:8080/api/reservations/${id}`,
  //       editData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     alert("예약이 수정되었습니다.");
  //     setEditingId(null); // 수정 모드 종료
  //     fetchReservations(); // 목록 갱신
  //   } catch (error) {
  //     alert("예약 수정 실패!");
  //   }
  // };

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 1200, margin: '40px auto', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>내 예약 목록</h2>
        {message && <p style={{ color: 'red', textAlign: 'center'  }}>{message}</p>}
        {reservations.length == 0 ? (
          <p style={{ textAlign: 'center' }}>예약 내역이 없습니다.</p>
        ) : (
         <div style={cardGrid}>
            {reservations.map((r) => (
              <div key={r.id} style={cardStyle}>
                <h3>{r.name}님의 예약</h3>
                <p>{r.date} {r.time}</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{r.userEmail}</p>
                <button
                  style={deleteButton}
                  onClick={() => handleDelete(r.id)}
                >
                  예약 취소
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

const cardGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const deleteButton: React.CSSProperties = {
  marginTop: '10px',
  padding: '8px 16px',
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}