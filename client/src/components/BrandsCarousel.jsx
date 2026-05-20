import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Replace each { name } entry with { name, logo: '/logo-filename.png' } when logos are ready
const BRANDS = [
  { name: 'Brand 1' },
  { name: 'Brand 2' },
  { name: 'Brand 3' },
  { name: 'Brand 4' },
  { name: 'Brand 5' },
  { name: 'Brand 6' },
  { name: 'Brand 7' },
  { name: 'Brand 8' },
]

export default function BrandsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '3.5rem 0', overflow: 'hidden' }}>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          fontSize: '0.82rem',
          color: '#aaa',
          letterSpacing: '0.04em',
          marginBottom: '2rem',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Our Top Brands
      </motion.p>

      {/* Marquee track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        style={{
          position: 'relative',
          // Gradient fade on left and right edges
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'brandsMarquee 28s linear infinite',
        }}>
          {/* Two copies for seamless loop */}
          {[0, 1].map(copy => (
            <div key={copy} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {BRANDS.map((brand, i) => (
                <BrandItem key={`${copy}-${i}`} brand={brand} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes brandsMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

function BrandItem({ brand }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 3.5rem',
      borderRight: '1px solid #e8e4de',
      height: '56px',
      flexShrink: 0,
    }}>
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          style={{ height: '32px', width: 'auto', objectFit: 'contain', opacity: 0.75 }}
        />
      ) : (
        /* Placeholder — remove once real logos are added */
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1rem',
          fontWeight: 500,
          color: '#bbb',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
        }}>
          {brand.name}
        </span>
      )}
    </div>
  )
}
