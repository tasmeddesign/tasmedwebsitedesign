import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const OFFICE_IMAGES = [
  { src: '/office-env-1.jpeg', alt: 'Tasmed office environment' },
  { src: '/office-env-2.jpeg', alt: 'Tasmed team gathering' },
  { src: '/office-env-3.png', alt: 'Tasmed workspace' },
]

const STATS = [
  { end: 500, suffix: '+', label: 'Team Members' },
  { end: 30,  suffix: '+', label: 'Years of Excellence' },
  { end: 20,  suffix: '+', label: 'States in India' },
  { end: 8,   suffix: '',  label: 'Countries Served' },
]

const EMPLOYEES = [
  { name: 'Rajiv Sharma',  role: 'Lead Chemist',          initials: 'RS', photo: null },
  { name: 'Priya Mehta',   role: 'Quality Assurance',      initials: 'PM', photo: null },
  { name: 'Anil Kumar',    role: 'Sales Manager',           initials: 'AK', photo: null },
  { name: 'Sunita Rao',    role: 'R&D Scientist',           initials: 'SR', photo: null },
]

export default function LifeAtTasmed() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} style={{ padding: '5rem 150px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
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
          Our People
        </span>
        <h2 style={{
          fontSize: '50px',
          fontWeight: 500,
          color: '#1a2f7a',
          marginBottom: '0.9rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.01em',
        }}>
          Life at Tasmed
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#777',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          A workplace built on purpose, trust, and the shared mission of making quality healthcare accessible everywhere.
        </p>
      </motion.div>

      {/* Animated stats bar */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        style={{
          display: 'flex',
          background: 'linear-gradient(135deg, #18458F 1%, #315F9C 24%, #2F4784 70%, #091C5C 100%)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          marginBottom: '3rem',
        }}
      >
        {STATS.map((s, i) => (
          <StatCounter
            key={s.label}
            end={s.end}
            suffix={s.suffix}
            label={s.label}
            isInView={statsInView}
            delay={i * 120}
            showDivider={i < STATS.length - 1}
          />
        ))}
      </motion.div>

      {/* Office image carousel — full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        style={{ marginBottom: '3rem' }}
      >
        <p style={{
          fontSize: '0.7rem',
          color: '#aaa',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          Inside Tasmed
        </p>
        <OfficeCarousel />
      </motion.div>

      {/* Team section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        style={{ marginBottom: '3rem' }}
      >
        {/* Heading row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          gap: '2rem',
        }}>
          <h3 style={{
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#1a1a1a',
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            maxWidth: '460px',
            margin: 0,
          }}>
            Our team is a powerhouse of talent, dedication, and care.
          </h3>
          <a
            href="https://www.linkedin.com/company/tasmed"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#1a2f7a',
              color: '#fff',
              padding: '0.75rem 1.8rem',
              borderRadius: '999px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            View More
          </a>
        </div>

        {/* 4-column photo grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}>
          {EMPLOYEES.map((emp, i) => (
            <TeamCard key={emp.name} employee={emp} index={i} isInView={isInView} />
          ))}
        </div>
      </motion.div>

      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        style={{
          background: '#FCFAF7',
          border: '1.5px solid #e2dfd9',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <div>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 500,
            color: '#1a2f7a',
            fontFamily: "'Outfit', sans-serif",
            marginBottom: '0.4rem',
          }}>
            Ready to Join the Tasmed Family?
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: 1.6, maxWidth: '480px' }}>
            We are always looking for driven individuals who share our commitment to quality healthcare.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/company/tasmed"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #18458F 1%, #315F9C 24%, #2F4784 70%, #091C5C 100%)',
            color: '#fff',
            padding: '0.9rem 2.2rem',
            borderRadius: '999px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Explore Open Positions →
        </a>
      </motion.div>

    </section>
  )
}

/* ── Animated counter ── */
function StatCounter({ end, suffix, label, isInView, delay, showDivider }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let raf
    const timer = setTimeout(() => {
      let startTime = null
      const duration = 1800
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * end))
        if (progress < 1) raf = requestAnimationFrame(step)
        else setCount(end)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [isInView, end, delay])

  return (
    <div style={{
      flex: 1,
      textAlign: 'center',
      borderRight: showDivider ? '1px solid rgba(255,255,255,0.15)' : 'none',
      padding: '0 2rem',
    }}>
      <div style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: '#fff',
        fontFamily: "'Outfit', sans-serif",
        lineHeight: 1,
        marginBottom: '0.4rem',
        letterSpacing: '-0.02em',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '0.04em',
      }}>
        {label}
      </div>
    </div>
  )
}

/* ── Office carousel ── */
function OfficeCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % OFFICE_IMAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        borderRadius: '20px',
        overflow: 'hidden',
        height: '400px',
        background: '#111',
        position: 'relative',
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={OFFICE_IMAGES[current].src}
            alt={OFFICE_IMAGES[current].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </AnimatePresence>

        {/* Slide counter overlay */}
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.25rem',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          borderRadius: '999px',
          padding: '0.3rem 0.9rem',
          color: '#fff',
          fontSize: '0.75rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '0.04em',
        }}>
          {current + 1} / {OFFICE_IMAGES.length}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        {OFFICE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
          >
            <div style={{
              height: '4px',
              width: i === current ? '36px' : '10px',
              borderRadius: '999px',
              background: i === current ? '#1a2f7a' : '#ccc',
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Team photo card ── */
function TeamCard({ employee, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.35 + index * 0.08 }}
    >
      {/* Photo / placeholder */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        height: '300px',
        marginBottom: '1rem',
        background: employee.photo
          ? undefined
          : `linear-gradient(135deg, #dce8f5 0%, #c8d9ee 100%)`,
        position: 'relative',
      }}>
        {employee.photo ? (
          <img
            src={employee.photo}
            alt={employee.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            <span style={{
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#1a2f7a',
              opacity: 0.18,
              fontFamily: "'Outfit', sans-serif",
            }}>
              {employee.initials}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <div style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: '#1a1a1a',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '0.2rem',
      }}>
        {employee.name}
      </div>

      {/* Role */}
      <div style={{ fontSize: '0.82rem', color: '#999' }}>
        {employee.role}
      </div>
    </motion.div>
  )
}
