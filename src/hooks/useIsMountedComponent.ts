import { useEffect, useState } from "react"

export const useIsMountedComponent = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) {
      setMounted(false)
    } else {
      setMounted(true)
    }
  }, [])

  return mounted

}