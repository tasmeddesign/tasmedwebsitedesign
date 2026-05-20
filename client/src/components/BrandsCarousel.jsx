import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Replace each entry with { name, logo: '/logo-filename.png' } when logos are ready
const BRANDS = [
  { name: 'Brand 1' },
  { name: 'Brand 2' },
  { name: 'Brand 3' },
  { name: 'Brand 4' },
  { name: 'Brand 5' },
]

export default function BrandsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: '3.5rem 150px' }}>

      {/* Badge label — styled like "Established in 1994" in Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
      >
        <span style={{
          display: 'inline-block',
          border: '1px solid #1a1a1a',
          borderRadius: '999px',
          padding: '0.35rem 1.1rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#1a1a1a',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: "'Outfit', sans-serif",
        }}>
          Our Top Brands
        </span>
      </motion.div>

      {/* Brands row — centered, static */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {BRANDS.map((brand, i) => (
          <BrandItem key={brand.name} brand={brand} last={i === BRANDS.length - 1} />
        ))}
      </motion.div>

    </section>
  )
}

function BrandItem({ brand, last }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 3rem',
      borderRight: last ? 'none' : '1px solid #e2dfd9',
      height: '52px',
      flexShrink: 0,
    }}>
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          style={{ height: '34px', width: 'auto', objectFit: 'contain', opacity: 0.8 }}
        />
      ) : (
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
