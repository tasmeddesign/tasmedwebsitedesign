import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import createGlobe from 'cobe'

const HQ = [
  { name: 'Chandigarh, India', lat: 30.7333, lng: 76.7794, country: 'India' },
  { name: 'Ahmedabad, India', lat: 23.0225, lng: 72.5714, country: 'India' },
]

const INTERNATIONAL = [
  { name: 'Cambodia', lat: 11.5564, lng: 104.9282, country: 'Cambodia' },
  { name: 'Kenya', lat: -1.2921, lng: 36.8219, country: 'Kenya' },
  { name: 'Mauritius', lat: -20.1609, lng: 57.4989, country: 'Mauritius' },
  { name: 'Nepal', lat: 27.7172, lng: 85.3240, country: 'Nepal' },
  { name: 'Philippines', lat: 14.5995, lng: 120.9842, country: 'Philippines' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore' },
  { name: 'Tanzania', lat: -6.7924, lng: 39.2083, country: 'United Republic of Tanzania' },
  { name: 'Uganda', lat: 0.3476, lng: 32.5825, country: 'Uganda' },
]

const INDIA_STATES = [
  { name: 'Andhra Pradesh', lat: 15.9129, lng: 79.7400 },
  { name: 'Assam', lat: 26.2006, lng: 92.9376 },
  { name: 'Bihar', lat: 25.0961, lng: 85.3131 },
  { name: 'Chhattisgarh', lat: 21.2787, lng: 81.8661 },
  { name: 'Gujarat', lat: 22.2587, lng: 71.1924 },
  { name: 'Haryana', lat: 29.0588, lng: 76.0856 },
  { name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { name: 'Jammu & Kashmir', lat: 33.7782, lng: 76.5762 },
  { name: 'Jharkhand', lat: 23.6102, lng: 85.2799 },
  { name: 'Karnataka', lat: 15.3173, lng: 75.7139 },
  { name: 'Madhya Pradesh', lat: 22.9734, lng: 78.6569 },
  { name: 'Maharashtra', lat: 19.7515, lng: 75.7139 },
  { name: 'Odisha', lat: 20.9517, lng: 85.0985 },
  { name: 'Punjab', lat: 31.1471, lng: 75.3412 },
  { name: 'Rajasthan', lat: 27.0238, lng: 74.2179 },
  { name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569 },
  { name: 'Telangana', lat: 18.1124, lng: 79.0193 },
  { name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Uttarakhand', lat: 30.0668, lng: 79.0193 },
  { name: 'West Bengal', lat: 22.9868, lng: 87.8550 },
]

const COBE_MARKERS = [
  ...HQ.map(p => ({ location: [p.lat, p.lng], size: 0.08 })),
  ...INTERNATIONAL.map(p => ({ location: [p.lat, p.lng], size: 0.05 })),
  ...INDIA_STATES.map(p => ({ location: [p.lat, p.lng], size: 0.03 })),
]

export default function GlobalPresence() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const globeRef = useRef(null)
  const phiRef = useRef(1.4) // start centered on India
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!canvasRef.current) return
    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 700 * 2,
      height: 700 * 2,
      phi: phiRef.current,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.176, 0.322, 0.722],
      glowColor: [0.92, 0.94, 1],
      markers: COBE_MARKERS,
      onRender: (state) => {
        phiRef.current += 0.003
        state.phi = phiRef.current
      },
    })
    canvasRef.current.style.opacity = '1'
    return () => globeRef.current?.destroy()
  }, [])

  const focusOn = useCallback((name) => {
    setActive(name)
  }, [])

  const resetHighlight = useCallback(() => {
    setActive(null)
  }, [])

  return (
    <section ref={sectionRef} onClick={resetHighlight} style={{ padding: '5rem 100px 5rem 150px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{
          display: 'inline-block',
          border: '1px solid #bbb',
          borderRadius: '999px',
          padding: '0.3rem 1.2rem',
          fontSize: '0.8rem',
          color: '#888',
          marginBottom: '1.25rem',
          letterSpacing: '0.03em',
        }}>
          Where We Are
        </span>
        <h2 style={{
          fontSize: '50px',
          fontWeight: 500,
          color: '#1a2f7a',
          marginBottom: '0.9rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.01em',
        }}>
          Our Presence
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#777',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          From The Indian Subcontinent To East Africa And Southeast Asia —
          Partnering With Healthcare Systems Where It Matters Most.
        </p>
      </motion.div>

      {/* 2-col layout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8rem' }}>

        {/* Left sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{ flex: '0 0 454px' }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: 500,
              color: '#1a2f7a',
              fontFamily: "'Outfit', sans-serif",
              marginBottom: '0.4rem',
              lineHeight: 1.25,
            }}>
              Presence In Over 20 States In India
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.6 }}>
              We Are Honoured To Serve Across 20+ States.
            </p>
          </div>

          <p style={{
            fontSize: '0.7rem',
            color: '#aaa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}>
            Our Headquarters
          </p>

          {HQ.map(loc => (
            <LocationRow
              key={loc.name}
              loc={loc}
              active={active === loc.name}
              onClick={() => focusOn(loc.name)}
            />
          ))}

          <p style={{
            fontSize: '0.7rem',
            color: '#aaa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
            marginTop: '2rem',
          }}>
            International Presence
          </p>

          <div style={{
            maxHeight: '228px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ccc transparent',
          }}>
            {INTERNATIONAL.map(loc => (
              <LocationRow
                key={loc.name}
                loc={loc}
                active={active === loc.name}
                onClick={() => focusOn(loc.name)}
              />
            ))}
          </div>
        </motion.div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          style={{ flexShrink: 0 }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: 700,
              height: 700,
              opacity: 0,
              transition: 'opacity 1s ease',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}

function LocationRow({ loc, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        background: 'none',
        border: 'none',
        borderBottom: '1px solid #e5e2dc',
        padding: '0.8rem 0',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span style={{
        fontSize: '1.3rem',
        fontWeight: 400,
        fontFamily: "'Outfit', sans-serif",
        color: active ? '#1a2f7a' : hovered ? '#1a2f7a' : '#1a1a1a',
        transition: 'color 0.2s ease',
      }}>
        {loc.name}
      </span>
    </button>
  )
}
