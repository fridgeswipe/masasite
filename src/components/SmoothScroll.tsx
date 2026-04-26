import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '../lib/gsap'
import { gsap } from '../lib/gsap'

interface Props {
  children: ReactNode
}

let _lenis: Lenis | null = null

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (_lenis) {
    _lenis.scrollTo(el, { offset: -72, duration: 1.1 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 2,
    })

    _lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      _lenis = null
      gsap.ticker.remove(onTick)
    }
  }, [])

  return <>{children}</>
}
