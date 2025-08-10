"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
}

export default function ReservePage() {
  const [reservation, setReservation] = useState<Reservation>({id : "",name: "", date:"",time: ""});
  const [message, setMessage] = useState("");

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value, //키에만 넣는 이유는 e.target.name를 넣으면 문자 그대로 인식
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post<ApiResponse<Reservation>>(
        "http://localhost:8080/api/reservations",
        reservation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, message, data } = res.data;
      alert(message);
      if (success && data) {
        setReservation(data);
      }
    } catch (err) {
      setMessage("예약 실패: 로그인 여부나 토큰 확인!");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: 40 }}>
        <h2>예약하기</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={reservation.id}
            onChange={handlechange}
            required
          />
          <br />
          <br />
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={reservation.name}
            onChange={handlechange}
            required
          />
          <br />
          <br />
          <input
            type="date"
            name="date"
            value={reservation.date}
            onChange={handlechange}
            required
          />
          <br />
          <br />
          <input
            type="time"
            name="time"
            value={reservation.time}
            onChange={handlechange}
            required
          />
          <br />
          <br />
          <button type="submit">예약하기</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </ProtectedRoute>
  );
}
