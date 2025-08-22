import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [mounted, setMounted] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    // 클라이언트에서만 실행
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      return () => mql.removeEventListener("change", onChange)
    }
  }, [])

  // 서버사이드 렌더링 시에는 false 반환
  if (!mounted) return false
  
  return isMobile
}
