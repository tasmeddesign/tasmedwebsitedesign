import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { end: 500, suffix: '+', label: 'Team Members' },
  { end: 30,  suffix: '+', label: 'Years of Excellence' },
  { end: 20,  suffix: '+', label: 'States in India' },
  { end: 8,   suffix: '',  label: 'Countries Served' },
]

const VALUES = [
  {
    num: '01',
    title: 'Innovation & Ethics',
    desc: 'Ideate, improvise, disrupt, and implement new ideas — always within the bounds of integrity.',
  },
  {
    num: '02',
    title: 'Patient First',
    desc: 'Every decision we make is rooted in delivering high-quality care today and tomorrow.',
  },
  {
    num: '03',
    title: 'Trust & Quality',
    desc: 'Delivering quality at its core. Our GMP-certified processes are built on accountability.',
  },
  {
    num: '04',
    title: 'Transparency & Consistency',
    desc: 'Openness and accountability are not policies — they are our culture.',
  },
]

const EMPLOYEES = [
  { name: 'Rajiv Sharma',  role: 'Lead Chemist',      initials: 'RS', photo: null },
  { name: 'Priya Mehta',   role: 'Quality Assurance',  initials: 'PM', photo: null },
  { name: 'Anil Kumar',    role: 'Sales Manager',       initials: 'AK', photo: null },
  { name: 'Sunita Rao',    role: 'R&D Scientist',       initials: 'SR', photo: null },
]

export default function LifeAtTasmed() {
  const sectionRef = useRef(null)
  const statsRef   = useRef(null)
  const valuesRef  = useRef(null)
  const quoteRef   = useRef(null)
  const teamRef    = useRef(null)

  const isInView    = useInView(sectionRef, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef,   { once: true, margin: '-60px' })
  const valuesInView= useInView(valuesRef,  { once: true, margin: '-60px' })
  const quoteInView = useInView(quoteRef,   { once: true, margin: '-60px' })
  const teamInView  = useInView(teamRef,    { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} style={{ padding: '5rem 150px' }}>

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

      {/* ── Story: Values + Images ── */}
      <div ref={valuesRef} style={{ display: 'flex', gap: '3.5rem', marginBottom: '4rem', alignItems: 'stretch' }}>

        {/* Left — values */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={valuesInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ flex: '0 0 52%', display: 'flex', flexDirection: 'column' }}
        >
          <p style={{
            fontSize: '0.7rem',
            color: '#aaa',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            What we stand for
          </p>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 500,
            color: '#1a1a1a',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '2rem',
          }}>
            Four principles that have guided every decision since 1993.
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            flex: 1,
          }}>
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} value={v} index={i} isInView={valuesInView} />
            ))}
          </div>
        </motion.div>

        {/* Right — images (portrait, not wide-short) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={valuesInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          style={{ flex: 1, display: 'flex', gap: '1rem' }}
        >
          {/* Tall left image */}
          <div style={{
            flex: '0 0 55%',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#d0d8e4',
            minHeight: '480px',
          }}>
            <img
              src="/office-env-1.jpeg"
              alt="Tasmed office"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Two stacked images */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              flex: 1,
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#d0d8e4',
            }}>
              <img
                src="/office-env-2.jpeg"
                alt="Tasmed team"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              flex: 1,
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#d0d8e4',
            }}>
              <img
                src="/office-env-3.png"
                alt="Tasmed workspace"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

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

      {/* ── Team section ── */}
      <motion.div
        ref={teamRef}
        initial={{ opacity: 0, y: 20 }}
        animate={teamInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ marginBottom: '3rem' }}
      >
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}>
          {EMPLOYEES.map((emp, i) => (
            <TeamCard key={emp.name} employee={emp} index={i} isInView={teamInView} />
          ))}
        </div>
      </motion.div>

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

/* ── Value card ── */
function ValueCard({ value, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #18458F 1%, #315F9C 24%, #2F4784 70%, #091C5C 100%)'
          : '#fff',
        border: hovered ? '1.5px solid transparent' : '1.5px solid #e8e5e0',
        borderRadius: '16px',
        padding: '1.5rem',
        cursor: 'default',
        transition: 'background 0.25s ease, border-color 0.25s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        fontSize: '3.5rem',
        fontWeight: 800,
        color: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(26,47,122,0.06)',
        fontFamily: "'Outfit', sans-serif",
        lineHeight: 1,
        position: 'absolute',
        top: '0.5rem',
        right: '1rem',
        letterSpacing: '-0.04em',
        userSelect: 'none',
        transition: 'color 0.25s ease',
      }}>
        {value.num}
      </div>
      <h4 style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        color: hovered ? '#fff' : '#1a1a1a',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '0.5rem',
        position: 'relative',
        transition: 'color 0.25s ease',
      }}>
        {value.title}
      </h4>
      <p style={{
        fontSize: '0.82rem',
        color: hovered ? 'rgba(255,255,255,0.7)' : '#aaa',
        lineHeight: 1.65,
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        transition: 'color 0.25s ease',
      }}>
        {value.desc}
      </p>
    </motion.div>
  )
}

/* ── Team photo card ── */
function TeamCard({ employee, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 + index * 0.08 }}
    >
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        height: '300px',
        marginBottom: '1rem',
        background: employee.photo ? undefined : 'linear-gradient(135deg, #dce8f5 0%, #c8d9ee 100%)',
        position: 'relative',
      }}>
        {employee.photo ? (
          <img
            src={employee.photo}
            alt={employee.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
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
      <div style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        color: '#1a1a1a',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '0.2rem',
      }}>
        {employee.name}
      </div>
      <div style={{ fontSize: '0.82rem', color: '#999' }}>
        {employee.role}
      </div>
    </motion.div>
  )
}
