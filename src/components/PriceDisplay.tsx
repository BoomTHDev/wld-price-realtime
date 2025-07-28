'use client'

import { useEffect, useState, useRef } from "react"

const PriceDisplay = () => {
  const [price, setPrice] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ws = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = 3000 // 3 seconds

  const connectWebSocket = () => {
    if (ws.current) {
      ws.current.close()
    }

    const url = process.env.NEXT_PUBLIC_BACKEND_WS_URL
    ws.current = new WebSocket(`${url}/ws/price`)

    ws.current.onopen = () => {
      console.log('WebSocket connected')
      reconnectAttempts.current = 0 // Reset reconnect attempts on successful connection
    }

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (typeof data.price === 'number') {
          setPrice(data.price)
          setError(null)
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err)
      }
    }

    ws.current.onerror = (event: Event) => {
      console.error('WebSocket error:', event)
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์')
    }

    ws.current.onclose = () => {
      console.log('WebSocket disconnected')
      // Attempt to reconnect with exponential backoff
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(reconnectDelay * Math.pow(2, reconnectAttempts.current), 60000) // Max 60 seconds
        reconnectAttempts.current += 1
        console.log(`Reconnecting in ${delay / 1000} seconds... (Attempt ${reconnectAttempts.current})`)
        
        setTimeout(() => {
          connectWebSocket()
        }, delay)
      } else {
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณารีเฟรชหน้าเว็บ')
      }
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">ราคา Worldcoin (WLD)</h2>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : price !== null ? (
        <div className="text-center">
          <p className="text-4xl font-bold text-green-400">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">อัพเดทล่าสุด: {new Date().toLocaleTimeString('th-TH')}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400">กำลังโหลดราคา...</p>
      )}
    </div>
  )
}

export default PriceDisplay