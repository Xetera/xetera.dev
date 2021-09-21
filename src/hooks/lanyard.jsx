import { useEffect, useRef, useState } from "react"

export function useLanyard(id) {
  const socket = useRef(new WebSocket("wss://api.lanyard.rest/socket"))
  const [data, setData] = useState()
  useEffect(() => {
    socket.current.addEventListener("message", message => {
      console.log(message.data)
      const incoming = JSON.parse(message.data)
      setData(incoming)
    })
  }, [])
  return { data }
}
