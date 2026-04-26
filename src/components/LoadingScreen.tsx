import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import './LoadingScreen.css'

interface Props { onDone: () => void }

export function LoadingScreen({ onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (ref.current) ref.current.style.display = 'none'
        onDone()
      },
    })

    tl.from('.ls-logo', {
      autoAlpha: 0,
      y: 18,
      duration: 0.55,
      ease: 'power3.out',
    })
    .to('.ls-logo', {
      autoAlpha: 0,
      y: -12,
      duration: 0.4,
      ease: 'power2.in',
      delay: 0.35,
    })
    .to('.ls-overlay', {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
    }, '-=0.15')
  }, [onDone])

  return (
    <div ref={ref} className="ls-overlay" aria-hidden>
      <span className="ls-logo">masasite</span>
    </div>
  )
}
