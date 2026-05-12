import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AREAS = [
  {
    title: 'Neurology',
    desc: 'Treating ailments related to anxiety, depression and OCD',
    icon: '🧠',
  },
  {
    title: 'Gastroenterology',
    desc: 'Sustained medicines for treatment of renal disorders, hyperacidity and oesophagitis reflux',
    icon: '🫀',
  },
  {
    title: 'Cardiology',
    desc: 'Medicines to cure hypertension, manage heart rhythms, and blood pressure',
    icon: '❤️',
  },
  {
    title: 'Anti Diabetic',
    desc: 'Medicines to stabilize, and control blood glucose levels among people with diabetes',
    icon: '💊',
  },
  {
    title: 'Gynaecology',
    desc: 'Medical care for women during pregnancy, childbirth and postpartum days',
    icon: '🌸',
  },
  {
    title: 'Urology',
    desc: 'Formulations exceeding industry benchmarks to cater to growing demand of urology medicines',
    icon: '🔬',
  },
  {
    title: 'Orthology',
    desc: 'A dedicated unit for bone care',
    icon: '🦴',
  },
  {
    title: 'General',
    desc: 'A dedicated unit for overall health',
    highlight: true,
  },
]

export default function TherapeuticAreas() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const row1 = AREAS.slice(0, 4)
  const row2 = AREAS.slice(4, 8)

  return (
    <section ref={sectionRef} style={{ padding: '0 150px 5rem' }}>
      {/* Outer rounded card */}
      <div style={{
        background: '#fff',
        borderRadius: '28px',
        padding: '5rem 4rem',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            display: 'inline-block',
            border: '1px solid #aaa',
            borderRadius: '999px',
            padding: '0.3rem 1.1rem',
            fontSize: '0.8rem',
            color: '#666',
            marginBottom: '1.5rem',
          }}>
            Our Portfolio
          </span>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 400,
            color: '#1a2f7a',
            marginBottom: '1rem',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '-0.01em',
          }}>
            Therapeutic Areas
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#777',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Spanning critical healthcare segments, our formulations address the most
            prevalent chronic conditions across diverse patient populations.
          </p>
        </motion.div>

        {/* Row 1 — 4 cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
          marginBottom: '1.25rem',
        }}>
          {row1.map((area, i) => (
            <Card key={area.title} area={area} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Row 2 — 4 cards (last one highlighted) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}>
          {row2.map((area, i) => (
            <Card key={area.title} area={area} index={i + 4} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  )
}

function Card({ area, index, isInView }) {
  const highlighted = area.highlight

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 + index * 0.07 }}
      style={{
        background: highlighted ? '#1a2f7a' : '#f7f6f3',
        borderRadius: '18px',
        padding: '2rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '200px',
      }}
    >
      <div>
        {/* Icon placeholder — subtle pill */}
        {!highlighted && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: '#ede9e2',
            marginBottom: '1.5rem',
          }} />
        )}

        {highlighted && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.15)',
            marginBottom: '1.5rem',
          }} />
        )}

        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: 500,
          color: highlighted ? '#fff' : '#1a1a1a',
          marginBottom: '0.75rem',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {area.title}
        </h3>

        <p style={{
          fontSize: '0.875rem',
          color: highlighted ? 'rgba(255,255,255,0.72)' : '#888',
          lineHeight: 1.65,
        }}>
          {area.desc}
        </p>
      </div>

      {/* Arrow link */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: highlighted ? '1px solid rgba(255,255,255,0.35)' : '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={highlighted ? '#fff' : '#999'}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
