import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import './Stats.css'

// ── Data ──────────────────────────────────────────────────────────────────────

interface Stat {
  to: number
  decimals?: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { to: 50,  suffix: '+',  label: 'sivua rakennettu' },
  { to: 4.9, decimals: 1, suffix: '/5', label: 'asiakastyytyväisyys' },
  { to: 7,   suffix: '',  label: 'päivää toimitusaika (ka.)' },
  { to: 100, suffix: '%', label: 'tyytyväisyystakuu' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function Stats() {
  const secRef  = useRef<HTMLElement>(null!)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    (_ctx, contextSafe) => {
      // Slide items up — ScrollTrigger on the top-level tween
      gsap.to('.stat-item', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      // Count-ups fire once on enter.
      // Wrapped in contextSafe so tweens created inside the callback
      // are safely no-op'd if the component unmounts mid-scroll.
      const runCounts = contextSafe!(() => {
        STATS.forEach((stat, i) => {
          const el = numRefs.current[i]
          if (!el) return

          const counter = { val: 0 }

          gsap.to(counter, {
            val: stat.to,
            duration: 2.2,
            ease: 'power3.out',
            delay: i * 0.09,
            onUpdate() {
              const formatted =
                stat.decimals !== undefined
                  ? counter.val.toFixed(stat.decimals)
                  : String(Math.round(counter.val))
              el.textContent = formatted + stat.suffix
            },
            onComplete() {
              el.classList.add('stat-num--done')
            },
          })
        })
      })

      ScrollTrigger.create({
        trigger: secRef.current,
        start: 'top 80%',
        once: true,
        onEnter: runCounts,
      })
    },
    { scope: secRef },
  )

  return (
    <section ref={secRef} className="stats-section">
      <div className="stats-inner">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item">
              <span
                className="stat-num"
                ref={(el) => { numRefs.current[i] = el }}
                aria-label={`${stat.to}${stat.suffix}`}
              >
                {'0' + stat.suffix}
              </span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
