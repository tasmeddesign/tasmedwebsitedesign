import { useState } from 'react'
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
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        background: 'transparent',
      }}
    >
      <Link to="/">
        <img src="/tasmedlogo.png" alt="Tasmed" style={{ height: '36px', objectFit: 'contain' }} />
      </Link>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <button aria-label="Search" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.04, background: '#1a1a1a', color: '#fff' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '0.45rem 1.3rem',
            border: '1.5px solid #1a1a1a',
            borderRadius: '999px',
            color: '#1a1a1a',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Contact
        </motion.a>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        color: '#1a1a1a',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
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
          background: '#1a1a1a',
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </a>
  )
}
