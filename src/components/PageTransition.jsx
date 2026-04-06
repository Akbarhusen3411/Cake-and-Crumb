import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(true))
    })
    return () => cancelAnimationFrame(timer)
  }, [location.pathname])

  return (
    <div
      className={`transition-all duration-600 ${
        show
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-3 blur-[2px]'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  )
}
