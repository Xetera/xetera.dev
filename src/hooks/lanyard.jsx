import { useCallback, useEffect, useRef, useState } from "react"

const MAX_FAILED_CONNECTIONS = 5

export function useLanyard(id) {
  const discordId = id
  const heartBeatInterval = useRef()
  const socket = useRef()
  const reconnectAttempts = useRef()
  const [data, setData] = useState({})

  const attemptConnect = () => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket")
    ws.addEventListener("close", attemptReconnect)
    ws.addEventListener("message", messageListener)
    ws.addEventListener("open", open)
    return ws
  }

  const open = () => {
    console.log("Connected to lanyard")
    reconnectAttempts.current = 0
  }

  const attemptReconnect = useCallback(() => {
    if (reconnectAttempts.current > MAX_FAILED_CONNECTIONS) {
      console.warn(
        `Could not establish connection after ${MAX_FAILED_CONNECTIONS} attempts`
      )
      return
    }
    console.log("Attempting to reconnect to lanyard")
    reconnectAttempts.current++
    setTimeout(() => {
      socket.current = attemptConnect()
    }, 200)
  }, [])

  const cleanup = socket => {
    if (heartBeatInterval.current) {
      clearInterval(heartBeatInterval.current)
    }
    socket.removeEventListener("message", messageListener)
    socket.removeEventListener("close", attemptReconnect)
    socket.removeEventListener("open", open)
  }

  const messageListener = useCallback(message => {
    const incoming = JSON.parse(message.data)
    if (incoming.op === 1) {
      const msg = {
        op: 2,
        d: { subscribe_to_id: discordId },
      }
      socket.current.send(JSON.stringify(msg))
      heartBeatInterval.current = setInterval(() => {
        socket.current.send(JSON.stringify({ op: 3 }))
      }, incoming.d.heartbeat_interval)
      return
    }
    setData(incoming.d)
  }, [])

  useEffect(() => {
    socket.current = attemptConnect()
    return () => cleanup(socket.current)
  }, [])
  return {
    ...data,
    discordId,
  }
}
