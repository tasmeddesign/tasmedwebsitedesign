import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Division', href: '/division' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Our Presence', href: '/our-presence' },
  { label: 'Careers', href: '/careers' },
]

export default function Navbar({ visible }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2.5rem',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="/tasmedlogo.png"
          alt="Tasmed"
          style={{ height: '36px', objectFit: 'contain' }}
        />
      </Link>

      {/* Nav links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <NavLink href={link.href} scrolled={scrolled}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <button
          aria-label="Search"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <SearchIcon scrolled={scrolled} />
        </button>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '0.45rem 1.3rem',
            border: `1.5px solid ${scrolled ? '#1a1a1a' : '#fff'}`,
            borderRadius: '999px',
            color: scrolled ? '#1a1a1a' : '#fff',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'color 0.3s, border-color 0.3s',
          }}
        >
          Contact
        </motion.a>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children, scrolled }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        color: scrolled ? '#1a1a1a' : '#fff',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        transition: 'color 0.3s',
      }}
    >
      {children}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '-3px',
          left: 0,
          right: 0,
          height: '1.5px',
          background: scrolled ? '#1a1a1a' : '#fff',
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </a>
  )
}

function SearchIcon({ scrolled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#1a1a1a' : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
