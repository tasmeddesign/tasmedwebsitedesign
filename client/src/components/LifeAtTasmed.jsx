import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const VALUES = [
  {
    title: 'Innovation & Ethics',
    desc: 'Continuous R&D with unwavering ethical standards guiding every formulation we develop.',
  },
  {
    title: 'Trust & Quality',
    desc: 'GMP-certified manufacturing ensuring every batch meets global patient safety benchmarks.',
  },
  {
    title: 'Patient First',
    desc: 'Every decision begins with one question — will this improve patient outcomes?',
  },
  {
    title: 'Growth & Recognition',
    desc: 'A culture where talent is nurtured, ambition is rewarded, and hard work is seen.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'This is my first and best career move. The work environment is genuinely supportive and growth opportunities are real.',
    name: 'Rajiv Sharma',
    role: 'Lead Chemist · Delhi NCR',
    initials: 'RS',
  },
  {
    quote: 'Every day knowing the medicines you help make are reaching patients in need — that sense of purpose drives everything.',
    name: 'Priya Mehta',
    role: 'Quality Assurance · Chandigarh',
    initials: 'PM',
  },
  {
    quote: 'Leadership genuinely invests in people here. Hard work is recognized and you are always given room to grow.',
    name: 'Anil Kumar',
    role: 'Sales Manager · Ahmedabad',
    initials: 'AK',
  },
]

const STATS = [
  { value: '500+', label: 'Team Members' },
  { value: '30+', label: 'Years of Excellence' },
  { value: '20+', label: 'States in India' },
  { value: '8', label: 'Countries Served' },
]

export default function LifeAtTasmed() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

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

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        style={{
          display: 'flex',
          background: 'linear-gradient(135deg, #18458F 1%, #315F9C 24%, #2F4784 70%, #091C5C 100%)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          marginBottom: '4rem',
        }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            flex: 1,
            textAlign: 'center',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
            padding: '0 2rem',
          }}>
            <div style={{
              fontSize: '2.8rem',
              fontWeight: 600,
              color: '#fff',
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1.1,
              marginBottom: '0.3rem',
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.04em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Two columns: Values + Testimonials */}
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', marginBottom: '4rem' }}>

        {/* Left: 2x2 value cards */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          style={{ flex: 1 }}
        >
          <p style={{
            fontSize: '0.7rem',
            color: '#aaa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            What We Stand For
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} value={v} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Right: stacked testimonials */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          style={{ flex: 1 }}
        >
          <p style={{
            fontSize: '0.7rem',
            color: '#aaa',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            From Our Team
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
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
          <p style={{
            fontSize: '0.95rem',
            color: '#888',
            lineHeight: 1.6,
            maxWidth: '480px',
          }}>
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

function ValueCard({ value, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + index * 0.07 }}
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2dfd9',
        borderLeft: '3px solid #1a2f7a',
        borderRadius: '16px',
        padding: '1.5rem',
      }}
    >
      <h4 style={{
        fontSize: '1rem',
        fontWeight: 500,
        color: '#1a2f7a',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '0.5rem',
      }}>
        {value.title}
      </h4>
      <p style={{
        fontSize: '0.875rem',
        color: '#888',
        lineHeight: 1.65,
      }}>
        {value.desc}
      </p>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 + index * 0.08 }}
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2dfd9',
        borderRadius: '16px',
        padding: '1.5rem',
      }}
    >
      <p style={{
        fontSize: '0.9rem',
        color: '#555',
        lineHeight: 1.7,
        marginBottom: '1rem',
        fontStyle: 'italic',
      }}>
        "{testimonial.quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #18458F, #091C5C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          flexShrink: 0,
        }}>
          {testimonial.initials}
        </div>
        <div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#1a1a1a',
            fontFamily: "'Outfit', sans-serif",
          }}>
            {testimonial.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#aaa' }}>
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
