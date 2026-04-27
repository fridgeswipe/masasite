import { useRef } from 'react'
import './LoadingScreen.css'

interface Props { onDone: () => void }

export function LoadingScreen({ onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null!)

  return (
    <div
      ref={ref}
      className="ls-overlay"
      aria-hidden
      onAnimationEnd={(e) => {
        // Only react to the overlay's own slide-up animation, not bubbled logo events
        if (e.animationName === 'ls-slide-up' && ref.current) {
          ref.current.style.display = 'none'
          onDone()
        }
      }}
    >
      <span className="ls-logo">Masa<em>sites</em></span>
    </div>
  )
}
