'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
      const res = await axios.post(`${API_BASE}/api/register`, { email, password })
      if(res)
        setMessage('회원가입 성공! 로그인 페이지로 이동합니다.')
      else
        setMessage('회원가입 실패.')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: unknown) {
        if (err instanceof Error) {
       console.log(err.message);
    }
    }

  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>회원가입</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
           style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>회원가입</button>
      </form>
      {message && <p style={{ color: message.includes('성공') ? 'green' : 'red' }}>{message}</p>}
    </div>
  )
}

// 스타일 변수
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