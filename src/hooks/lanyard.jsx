import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export function useLanyard(id) {
  const heartBeatInterval = useRef()
  const [socket] = useState(
    () => new WebSocket("wss://api.lanyard.rest/socket"),
    []
  )
  const [data, setData] = useState()
  const messageListener = useCallback(message => {
    const incoming = JSON.parse(message.data)
    console.log(incoming)
    if (incoming.op === 1) {
      const msg = {
        op: 2,
        d: {
          // subscribe_to_ids should be an array of user IDs you want to subscribe to presences from
          // if Lanyard doesn't monitor an ID specified, it won't be included in INIT_STATE
          subscribe_to_id: id,
        },
      }
      socket.send(JSON.stringify(msg))
      heartBeatInterval.current = setInterval(() => {
        socket.send(JSON.stringify({ op: 3 }))
      }, 30000)
      return
    }
    setData(incoming.d)
  }, [])
  useEffect(() => {
    socket.addEventListener("message", messageListener)
    return () => {
      if (heartBeatInterval.current) {
        clearInterval(heartBeatInterval.current)
      }
      socket.removeEventListener("message", messageListener)
    }
  }, [])
  return { data }
}
