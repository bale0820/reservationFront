"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  interface ApiResponse<T> {
    success : boolean
    message: string
    data : T
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<ApiResponse<string>>("http://localhost:8080/api/login", {
        email,
        password})

        const {success, message, data} = res.data

        if(success) {
          const token = data
          localStorage.setItem("token", token)
          window.dispatchEvent(new Event('storage')); // 같은 탭에서도 NavBar 갱신
          alert("로그인 성공!");
          alert(message)
          router.push("/");
        }else {
          alert(message)
        }

        // const token = (res.data as string).replace('로그인 성공! JWT: ', '');
        // localStorage.setItem("token", token);

    } catch (err) {
      setError("이메일 또는 비밀번호가 틀렸습니다.");
    }
}


  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>로그인</h2>
      <form onSubmit={handleLogin} style={formStyle}>
      <input
        type ="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <br />
      <br />
      <button type="submit" style={buttonStyle}>로그인</button>        
      </form>
      {error && <p style ={{color : 'red'}}>{error}</p>}
    </div>
      
      
      
  )

}

// 스타일 변수 (회원가입과 동일)
const containerStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '30px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const inputStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem'
}

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
}