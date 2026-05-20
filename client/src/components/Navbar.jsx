import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Our Presence', href: '/our-presence' },
  { label: 'Careers', href: '/careers' },
]

const DIVISION_AREAS = [
  { label: 'Neurology',        href: '/division/neurology' },
  { label: 'Gastroenterology', href: '/division/gastroenterology' },
  { label: 'Cardiology',       href: '/division/cardiology' },
  { label: 'Anti Diabetic',    href: '/division/anti-diabetic' },
  { label: 'Gynaecology',      href: '/division/gynaecology' },
  { label: 'Urology',          href: '/division/urology' },
  { label: 'Orthology',        href: '/division/orthology' },
  { label: 'General',          href: '/division/general' },
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
        position: 'relative',
        zIndex: 100,
      }}
    >
      <Link to="/">
        <img src="/tasmedlogo.png" alt="Tasmed" style={{ height: '52px', objectFit: 'contain' }} />
      </Link>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
        <li key="About Us">
          <NavLink href="/about">About Us</NavLink>
        </li>
        <li>
          <DivisionNavItem />
        </li>
        {NAV_LINKS.slice(1).map((link) => (
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

/* ── Division hover dropdown ── */
function DivisionNavItem() {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <a
        href="/division"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.28rem',
          color: '#1a1a1a',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        Division
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            marginTop: '1px',
          }}
        >
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <motion.span
          animate={{ scaleX: open ? 1 : 0 }}
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

      {/* Dropdown — padded top to bridge gap between trigger and panel */}
      <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '0.6rem', zIndex: 200 }}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              style={{
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 8px 36px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #ece9e3',
                padding: '0.6rem 0',
                minWidth: '190px',
              }}
            >
              {DIVISION_AREAS.map((area) => (
                <DropdownItem key={area.label} href={area.href}>
                  {area.label}
                </DropdownItem>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function DropdownItem({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '0.55rem 1.25rem',
        fontSize: '0.875rem',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: hovered ? 500 : 400,
        color: hovered ? '#1a2f7a' : '#444',
        background: hovered ? '#f5f3ff' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.12s ease, color 0.12s ease',
      }}
    >
      {children}
    </a>
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
