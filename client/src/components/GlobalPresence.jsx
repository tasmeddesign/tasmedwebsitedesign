import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'

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

const ALL_MARKERS = [
  ...HQ.map(p => ({ ...p, type: 'hq' })),
  ...INTERNATIONAL.map(p => ({ ...p, type: 'intl' })),
]

const LOCATION_COUNTRY = Object.fromEntries([
  ...HQ.map(p => [p.name, 'India']),
  ...INTERNATIONAL.map(p => [p.name, p.country]),
])

export default function GlobalPresence() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState(null)

  const highlightedCountry = LOCATION_COUNTRY[active] || null

  const focusOn = useCallback((name) => setActive(name), [])
  const resetHighlight = useCallback(() => setActive(null), [])

  return (
    <section ref={sectionRef} onClick={resetHighlight} style={{ padding: '5rem 150px' }}>

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
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5rem' }}>

        {/* Left sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{ flex: '0 0 320px' }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: '1.4rem',
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

        {/* Dotted World Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
          style={{ flex: 1 }}
          onClick={e => e.stopPropagation()}
        >
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 153, center: [0, 10] }}
            style={{ width: '100%', height: 'auto' }}
          >
            <defs>
              <pattern id="dots-neutral" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.1" fill="#c8c4bc" />
              </pattern>
              <pattern id="dots-active" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.1" fill="#1a2f7a" />
              </pattern>
            </defs>

            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const isActive = geo.properties.ADMIN === highlightedCountry
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isActive ? 'url(#dots-active)' : 'url(#dots-neutral)'}
                      stroke="none"
                      style={{ outline: 'none', pointerEvents: 'none' }}
                    />
                  )
                })
              }
            </Geographies>

            {/* Location markers */}
            {ALL_MARKERS.map(loc => (
              <Marker key={loc.name} coordinates={[loc.lng, loc.lat]}>
                <circle
                  r={loc.type === 'hq' ? 4 : 3}
                  fill={active === loc.name ? '#1a2f7a' : '#2d52b8'}
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer', pointerEvents: 'all' }}
                  onClick={e => { e.stopPropagation(); focusOn(loc.name) }}
                />
              </Marker>
            ))}
          </ComposableMap>
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
        fontSize: '1.2rem',
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
