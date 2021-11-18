import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export function useLanyard(id) {
  const discordId = id
  const heartBeatInterval = useRef()
  const socket = useRef()
  const [data, setData] = useState({})
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
      }, 30000)
      return
    }
    const vscodeStatus = incoming.d.activities.find(
      activities => activities.name === "Visual Studio Code"
    )
    const data = { ...incoming.d, vscodeStatus };
    console.log(data);
    setData(data)
  }, [])
  useEffect(() => {
    socket.current = new WebSocket("wss://api.lanyard.rest/socket")
    socket.current.addEventListener("message", messageListener)
    return () => {
      if (heartBeatInterval.current) {
        clearInterval(heartBeatInterval.current)
      }
      socket.current.removeEventListener("message", messageListener)
    }
  }, [])
  return {
    ...data,
    discordId,
  }
}
