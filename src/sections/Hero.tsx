import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { gsap, useGSAP } from '../lib/gsap'
import { scrollToSection } from '../components/SmoothScroll'
import './Hero.css'

// ─── Particle wave ────────────────────────────────────────────────────────────

// Reduce grid on mobile for performance
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
const COLS = isMobile() ? 42 : 72
const ROWS = isMobile() ? 42 : 72
const COUNT = COLS * ROWS

function ParticleWave() {
  const ptsRef = useRef<THREE.Points>(null!)

  const { geo, base } = useMemo(() => {
    const base = new Float32Array(COUNT * 2) // original x, z per particle
    const pos  = new Float32Array(COUNT * 3)

    let i = 0
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const x = (c / (COLS - 1) - 0.5) * 20
        const z = (r / (ROWS - 1) - 0.5) * 20
        pos[i * 3]     = x
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = z
        base[i * 2]     = x
        base[i * 2 + 1] = z
        i++
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo, base }
  }, [])

  useFrame(({ clock, pointer }) => {
    const t  = clock.elapsedTime
    // Map normalised pointer (-1..1) to world units
    const mx = pointer.x * 9
    const mz = -pointer.y * 9
    const pa = geo.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < COUNT; i++) {
      const x = base[i * 2]
      const z = base[i * 2 + 1]

      // Layered sine wave surface
      const wave =
        Math.sin(x * 0.42 + t * 0.68) * 0.55 +
        Math.cos(z * 0.36 + t * 0.48) * 0.42 +
        Math.sin((x + z) * 0.22 + t * 0.35) * 0.28

      // Mouse-driven ripple that decays with distance
      const dx = x - mx
      const dz = z - mz
      const dist = Math.sqrt(dx * dx + dz * dz)
      const ripple = Math.sin(dist * 0.85 - t * 3.0) * Math.exp(-dist * 0.21) * 1.15

      pa.setY(i, wave + ripple)
    }
    pa.needsUpdate = true

    // Slow global rotation
    ptsRef.current.rotation.y = t * 0.044
  })

  return (
    <points ref={ptsRef} geometry={geo} position={[0, -1, 0]}>
      <pointsMaterial
        color="#00ff88"
        size={0.068}
        transparent
        opacity={0.68}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function Chevron() {
  return (
    <svg
      className="scroll-chevron"
      width="20"
      height="11"
      viewBox="0 0 20 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 1l9 9 9-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const WORDS = ['Moderni', 'nettisivu', 'yrityksellesi']

export function Hero() {
  const secRef   = useRef<HTMLElement>(null!)
  const priceRef = useRef<HTMLSpanElement>(null!)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.25 })

      // Words slide up from clip, staggered
      tl.from('.anim-word', {
        y: '108%',
        autoAlpha: 0,
        stagger: 0.09,
        duration: 1.05,
        ease: 'power4.out',
      })
        // Price row fades + lifts in
        .from('.anim-price', {
          y: 34,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.55')
        // Subtitle
        .from('.anim-sub', {
          y: 22,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power2.out',
        }, '-=0.45')
        // Buttons stagger
        .from('.anim-btn', {
          y: 22,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power2.out',
        }, '-=0.4')
        // Scroll indicator
        .from('.anim-scroll', {
          autoAlpha: 0,
          duration: 0.5,
        }, '-=0.15')

      // Count-up: 0 → 149
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 149,
        duration: 2.4,
        ease: 'power2.out',
        delay: 0.95,
        onUpdate() {
          if (priceRef.current) {
            priceRef.current.textContent = String(Math.round(counter.val))
          }
        },
      })
    },
    { scope: secRef },
  )

  return (
    <section ref={secRef} className="hero">

      {/* ── 3-D particle field ── */}
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 5, 10], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <AdaptiveDpr pixelated />
        <ParticleWave />
      </Canvas>

      {/* ── Floating geometric shapes ── */}
      <div className="hero-shapes" aria-hidden>
        <div className="shape shape-tri shape--1" />
        <div className="shape shape-sq  shape--2" />
        <div className="shape shape-tri shape--3" />
        <div className="shape shape-sq  shape--4" />
        <div className="shape shape-ring shape--5" />
      </div>

      {/* ── Readability gradient ── */}
      <div className="hero-veil" aria-hidden />

      {/* ── Text content ── */}
      <div className="hero-content">

        {/* Headline — word-by-word clip reveal */}
        <h1 className="hero-headline">
          {WORDS.map((word, i) => (
            <span key={i} className="word-wrap">
              <span className="anim-word">{word}</span>
            </span>
          ))}
        </h1>

        {/* Price counter */}
        <div className="anim-price hero-price-row">
          <span className="price-num">
            <span ref={priceRef}>0</span>
          </span>
          <span className="price-eur">€</span>
        </div>

        {/* Subtitle */}
        <p className="anim-sub hero-subtitle">
          Valmis viikossa.&ensp;Ei piilokustannuksia.
        </p>

        {/* CTA buttons */}
        <div className="hero-btns">
          <button
            className="anim-btn btn btn-secondary"
            onClick={() => scrollToSection('portfolio')}
          >
            Katso esimerkkejä ↓
          </button>
          <button
            className="anim-btn btn btn-primary"
            onClick={() => scrollToSection('yhteystiedot')}
          >
            Ota yhteyttä
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="anim-scroll hero-scroll" aria-hidden>
        <Chevron />
        <Chevron />
      </div>

    </section>
  )
}
