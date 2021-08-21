import React from "react"

export function useIsSafari() {
  const [isSafari, setSafari] = React.useState(false)
  React.useEffect(() => {
    var ua = navigator.userAgent.toLowerCase()
    setSafari(ua.includes("safari") && !ua.includes("chrome"))
  }, [])

  return { isSafari }
}
