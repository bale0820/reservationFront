'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인 후 이용 가능합니다.')
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <p>로그인 상태를 확인 중...</p>
  }

  return <>{children}</>
}
