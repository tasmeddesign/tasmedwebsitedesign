import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { end: 500, suffix: '+', label: 'Team Members' },
  { end: 30,  suffix: '+', label: 'Years of Excellence' },
  { end: 20,  suffix: '+', label: 'States in India' },
  { end: 8,   suffix: '',  label: 'Countries Served' },
]

const PEOPLE = [
  {
    name: 'Rajiv Sharma',
    role: 'Lead Chemist',
    dept: 'R&D',
    bio: 'Over 18 years shaping Tasmed\'s pharmaceutical formulation pipeline with precision chemistry.',
    initials: 'RS',
    color: '#1a4fa0',
    photo: null,
  },
  {
    name: 'Priya Mehta',
    role: 'Head of Quality Assurance',
    dept: 'Quality',
    bio: 'Ensures every product leaving our GMP facility meets the highest international standards.',
    initials: 'PM',
    color: '#16763a',
    photo: null,
  },
  {
    name: 'Anil Kumar',
    role: 'National Sales Manager',
    dept: 'Sales',
    bio: 'Drives market presence across 20+ states, building lasting relationships with healthcare professionals.',
    initials: 'AK',
    color: '#7b2d8b',
    photo: null,
  },
  {
    name: 'Sunita Rao',
    role: 'Senior R&D Scientist',
    dept: 'Research',
    bio: 'Pioneers novel drug delivery systems, translating clinical insights into patient-ready formulations.',
    initials: 'SR',
    color: '#c0392b',
    photo: null,
  },
]

export default function LifeAtTasmed() {
  const sectionRef = useRef(null)
  const statsRef   = useRef(null)
  const imagesRef  = useRef(null)
  const quoteRef   = useRef(null)
  const peopleRef  = useRef(null)

  const isInView    = useInView(sectionRef, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef,   { once: true, margin: '-60px' })
  const imagesInView= useInView(imagesRef,  { once: true, margin: '-60px' })
  const quoteInView = useInView(quoteRef,   { once: true, margin: '-60px' })
  const peopleInView= useInView(peopleRef,  { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} style={{ padding: '5rem 150px', background: '#FCFAF7' }}>

      {/* ── Header ── */}
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

      {/* ── Stats bar ── */}
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
          marginBottom: '4rem',
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

      {/* ── Office images ── */}
      <motion.div
        ref={imagesRef}
        initial={{ opacity: 0, y: 20 }}
        animate={imagesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', height: '340px' }}
      >
        <div style={{ flex: '0 0 50%', borderRadius: '20px', overflow: 'hidden', background: '#d0d8e4' }}>
          <img src="/office-env-1.jpeg" alt="Tasmed office" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', background: '#d0d8e4' }}>
          <img src="/office-env-2.jpeg" alt="Tasmed team" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ flex: '0 0 22%', borderRadius: '20px', overflow: 'hidden', background: '#d0d8e4' }}>
          <img src="/office-env-3.png" alt="Tasmed workspace" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </motion.div>

      {/* ── Quote ── */}
      <motion.div
        ref={quoteRef}
        initial={{ opacity: 0, y: 20 }}
        animate={quoteInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: '#F5F3EE',
          border: '1.5px solid #e2dfd9',
          borderRadius: '20px',
          padding: '3rem 4rem',
          marginBottom: '4rem',
          textAlign: 'center',
        }}
      >
        <div style={{
          fontSize: '2.8rem',
          color: '#1a2f7a',
          fontFamily: "'Outfit', sans-serif",
          lineHeight: 1,
          marginBottom: '1rem',
          opacity: 0.4,
        }}>
          "
        </div>
        <p style={{
          fontSize: '1.2rem',
          color: '#333',
          fontFamily: "'Outfit', sans-serif",
          lineHeight: 1.8,
          maxWidth: '700px',
          margin: '0 auto 1.25rem',
          fontWeight: 400,
        }}>
          The glory of medicine is that it is{' '}
          <strong style={{ color: '#1a2f7a' }}>constantly moving forward</strong>,
          that there is always more to learn. The ills of today do not cloud the{' '}
          <strong style={{ color: '#1a2f7a' }}>horizon of tomorrow</strong>,
          but act as a spur to greater effort.
        </p>
        <p style={{
          fontSize: '0.82rem',
          color: '#999',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontFamily: "'Outfit', sans-serif",
        }}>
          — William James Mayo
        </p>
      </motion.div>

      {/* ── Our People ── */}
      <div ref={peopleRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={peopleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.25rem',
            gap: '2rem',
          }}
        >
          <div>
            <p style={{
              fontSize: '0.7rem',
              color: '#aaa',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              fontFamily: "'Outfit', sans-serif",
            }}>
              Our People
            </p>
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
              The people who bring Tasmed's mission to life.
            </h3>
          </div>
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
            View on LinkedIn
          </a>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {PEOPLE.map((person, i) => (
            <PeopleCard key={person.name} person={person} index={i} isInView={peopleInView} />
          ))}
        </div>
      </div>

      {/* ── CTA strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        style={{
          background: '#FCFAF7',
          border: '1.5px solid #e2dfd9',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          marginTop: '3rem',
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
      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
        {label}
      </div>
    </div>
  )
}

/* ── People card ── */
function PeopleCard({ person, index, isInView }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 + index * 0.1 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#fff',
        border: `1.5px solid ${hov ? person.color + '55' : '#ece9e3'}`,
        boxShadow: hov ? `0 12px 32px ${person.color}18` : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'border-color 0.22s, box-shadow 0.22s',
        cursor: 'default',
      }}
    >
      {/* Avatar area */}
      <div style={{
        height: '200px',
        background: person.photo
          ? undefined
          : `linear-gradient(135deg, ${person.color}22 0%, ${person.color}44 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <>
            {/* Large watermark initials */}
            <span style={{
              fontSize: '6rem',
              fontWeight: 800,
              color: person.color,
              opacity: 0.12,
              fontFamily: "'Outfit', sans-serif",
              userSelect: 'none',
              lineHeight: 1,
              position: 'absolute',
            }}>
              {person.initials}
            </span>
            {/* Centered initials circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: person.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              boxShadow: `0 4px 16px ${person.color}44`,
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Outfit', sans-serif",
              }}>
                {person.initials}
              </span>
            </div>
          </>
        )}

        {/* Dept tag on avatar */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#fff',
          color: person.color,
          fontSize: '0.68rem',
          fontWeight: 700,
          padding: '0.2rem 0.7rem',
          borderRadius: '999px',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '0.02em',
        }}>
          {person.dept}
        </span>
      </div>

      {/* Info area */}
      <div style={{ padding: '1.2rem 1.25rem 1.4rem' }}>
        <div style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: '#1a1a1a',
          fontFamily: "'Outfit', sans-serif",
          marginBottom: '0.2rem',
          lineHeight: 1.2,
        }}>
          {person.name}
        </div>
        <div style={{
          fontSize: '0.78rem',
          color: person.color,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          marginBottom: '0.75rem',
        }}>
          {person.role}
        </div>
        <p style={{
          fontSize: '0.78rem',
          color: '#aaa',
          lineHeight: 1.6,
          fontFamily: "'Outfit', sans-serif",
          margin: 0,
        }}>
          {person.bio}
        </p>
      </div>
    </motion.div>
  )
}
