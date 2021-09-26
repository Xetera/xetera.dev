import { useStaticQuery, graphql } from "gatsby"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export function useLanyard() {
  const { site } = useStaticQuery(staticQuery)
  const { discordId } = site.siteMetadata.social
  const heartBeatInterval = useRef()
  const [socket] = useState(
    () => new WebSocket("wss://api.lanyard.rest/socket")
  )
  const [data, setData] = useState({})
  const messageListener = useCallback(message => {
    const incoming = JSON.parse(message.data)
    if (incoming.op === 1) {
      const msg = {
        op: 2,
        d: { subscribe_to_id: discordId },
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
  return {
    ...data,
    discordId,
  }
}

const staticQuery = graphql`
  query UserQuery {
    site {
      siteMetadata {
        social {
          discordId
          twitter
        }
      }
    }
  }
`
