import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Division', href: '/division' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Our Presence', href: '/our-presence' },
  { label: 'Careers', href: '/careers' },
]

const PRODUCT_HIERARCHY = [
  {
    area: 'Neurology',
    themes: [
      {
        name: 'Pain and Spasm',
        products: [
          { name: 'Placeholder Product 1', href: '#' },
          { name: 'Placeholder Product 2', href: '#' },
          { name: 'Placeholder Product 3', href: '#' },
        ],
      },
      {
        name: 'Anxiety & Depression',
        products: [
          { name: 'Placeholder Product 4', href: '#' },
          { name: 'Placeholder Product 5', href: '#' },
        ],
      },
      {
        name: 'OCD & Mood Disorders',
        products: [
          { name: 'Placeholder Product 6', href: '#' },
          { name: 'Placeholder Product 7', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Gastroenterology',
    themes: [
      {
        name: 'Acid Reflux & GERD',
        products: [
          { name: 'Placeholder Product 8', href: '#' },
          { name: 'Placeholder Product 9', href: '#' },
        ],
      },
      {
        name: 'Renal Disorders',
        products: [
          { name: 'Placeholder Product 10', href: '#' },
          { name: 'Placeholder Product 11', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Cardiology',
    themes: [
      {
        name: 'Hypertension',
        products: [
          { name: 'Placeholder Product 12', href: '#' },
          { name: 'Placeholder Product 13', href: '#' },
        ],
      },
      {
        name: 'Heart Rhythm',
        products: [
          { name: 'Placeholder Product 14', href: '#' },
          { name: 'Placeholder Product 15', href: '#' },
        ],
      },
      {
        name: 'Blood Pressure Management',
        products: [
          { name: 'Placeholder Product 16', href: '#' },
          { name: 'Placeholder Product 17', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Anti Diabetic',
    themes: [
      {
        name: 'Blood Glucose Control',
        products: [
          { name: 'Placeholder Product 18', href: '#' },
          { name: 'Placeholder Product 19', href: '#' },
        ],
      },
      {
        name: 'Insulin Management',
        products: [
          { name: 'Placeholder Product 20', href: '#' },
          { name: 'Placeholder Product 21', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Gynaecology',
    themes: [
      {
        name: 'Pregnancy Care',
        products: [
          { name: 'Placeholder Product 22', href: '#' },
          { name: 'Placeholder Product 23', href: '#' },
        ],
      },
      {
        name: 'Postpartum Care',
        products: [
          { name: 'Placeholder Product 24', href: '#' },
          { name: 'Placeholder Product 25', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Urology',
    themes: [
      {
        name: 'Urinary Tract Health',
        products: [
          { name: 'Placeholder Product 26', href: '#' },
          { name: 'Placeholder Product 27', href: '#' },
        ],
      },
      {
        name: 'Prostate Care',
        products: [
          { name: 'Placeholder Product 28', href: '#' },
          { name: 'Placeholder Product 29', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'Orthology',
    themes: [
      {
        name: 'Bone Health',
        products: [
          { name: 'Placeholder Product 30', href: '#' },
          { name: 'Placeholder Product 31', href: '#' },
        ],
      },
      {
        name: 'Joint & Muscle Care',
        products: [
          { name: 'Placeholder Product 32', href: '#' },
          { name: 'Placeholder Product 33', href: '#' },
        ],
      },
    ],
  },
  {
    area: 'General',
    themes: [
      {
        name: 'Immunity & Wellness',
        products: [
          { name: 'Placeholder Product 34', href: '#' },
          { name: 'Placeholder Product 35', href: '#' },
        ],
      },
      {
        name: 'Vitamins & Supplements',
        products: [
          { name: 'Placeholder Product 36', href: '#' },
          { name: 'Placeholder Product 37', href: '#' },
        ],
      },
    ],
  },
]

export default function Navbar({ visible }) {
  const [productsOpen, setProductsOpen] = useState(false)
  const [activeArea, setActiveArea] = useState(PRODUCT_HIERARCHY[0].area)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeThemes = PRODUCT_HIERARCHY.find(h => h.area === activeArea)?.themes ?? []

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
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
          <img src="/tasmedlogo.png" alt="Tasmed" style={{ height: '52px', objectFit: 'contain' }} />
        </Link>

        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
          <li>
            <ProductsButton
              open={productsOpen}
              onToggle={() => setProductsOpen(o => !o)}
            />
          </li>
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

      {/* Products mega dropdown */}
      <AnimatePresence>
        {productsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% - 0.5rem)',
              left: '2.5rem',
              right: '2.5rem',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 12px 48px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid #ece9e3',
              display: 'flex',
              zIndex: 1000,
              overflow: 'hidden',
              minHeight: '320px',
            }}
          >
            {/* Left panel — Therapeutic Areas */}
            <div style={{
              width: '210px',
              flexShrink: 0,
              borderRight: '1px solid #f0ede8',
              padding: '1.25rem 0',
              background: '#fafaf8',
            }}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#bbb',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0 1.25rem',
                marginBottom: '0.75rem',
              }}>
                Therapeutic Areas
              </div>
              {PRODUCT_HIERARCHY.map(({ area }) => (
                <button
                  key={area}
                  onMouseEnter={() => setActiveArea(area)}
                  onClick={() => setActiveArea(area)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.6rem 1.25rem',
                    background: activeArea === area ? '#fff' : 'none',
                    border: 'none',
                    borderLeft: activeArea === area ? '2.5px solid #1a2f7a' : '2.5px solid transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: activeArea === area ? 600 : 400,
                    color: activeArea === area ? '#1a2f7a' : '#555',
                    transition: 'all 0.12s ease',
                  }}
                >
                  {area}
                  {activeArea === area && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 2l4 4-4 4" stroke="#1a2f7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Right panel — Themes + Products */}
            <div style={{
              flex: 1,
              padding: '1.5rem 2rem',
            }}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#bbb',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}>
                {activeArea}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem 2rem',
                alignContent: 'start',
              }}>
                {activeThemes.map(theme => (
                  <div key={theme.name}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#1a2f7a',
                      marginBottom: '0.5rem',
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {theme.name}
                    </div>
                    <div style={{
                      height: '1px',
                      background: '#eee',
                      marginBottom: '0.5rem',
                    }} />
                    {theme.products.map(product => (
                      <ProductLink key={product.name} href={product.href}>
                        {product.name}
                      </ProductLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProductsButton({ open, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: '#1a1a1a',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'inherit',
      }}
    >
      Products
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
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
    </button>
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

function ProductLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        fontSize: '0.82rem',
        color: hovered ? '#1a2f7a' : '#888',
        padding: '0.22rem 0',
        textDecoration: 'none',
        fontFamily: "'Outfit', sans-serif",
        transition: 'color 0.15s ease',
      }}
    >
      {children}
    </a>
  )
}
