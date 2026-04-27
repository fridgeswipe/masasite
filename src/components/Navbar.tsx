import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { scrollToSection } from './SmoothScroll'
import './Navbar.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null!)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Päänavigaatio">
      <div className="nav-inner">
        <Link className="nav-brand" to="/" aria-label="masasite etusivu">masasite</Link>

        <ul className="nav-links" role="list">
          <li><button className="nav-link" onClick={() => scrollTo('portfolio')}>Esimerkit</button></li>
          <li><button className="nav-link" onClick={() => scrollTo('hinnat')}>Hinnat</button></li>
          <li>
            <button className="nav-cta" onClick={() => scrollTo('yhteystiedot')}>
              Ota yhteyttä
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
          aria-label="Avaa valikko"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? ' nav-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <button className="drawer-link" onClick={() => scrollTo('portfolio')}>Esimerkit</button>
        <button className="drawer-link" onClick={() => scrollTo('hinnat')}>Hinnat</button>
        <button className="drawer-link" onClick={() => scrollTo('yhteystiedot')}>Ota yhteyttä</button>
      </div>
    </nav>
  )
}
