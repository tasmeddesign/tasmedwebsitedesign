import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const AREAS = [
  {
    title: 'Neurology',
    desc: 'Treating ailments related to anxiety, depression and OCD with targeted neuro formulations.',
  },
  {
    title: 'Gastroenterology',
    desc: 'Sustained medicines for treatment of renal disorders, hyperacidity and oesophagitis reflux.',
  },
  {
    title: 'Cardiology',
    desc: 'Medicines to cure hypertension, manage heart rhythms, and blood pressure.',
  },
  {
    title: 'Anti Diabetic',
    desc: 'Medicines to stabilize, and control blood glucose levels among people with diabetes.',
  },
  {
    title: 'Gynaecology',
    desc: 'Medical care for women during pregnancy, childbirth and postpartum days.',
  },
  {
    title: 'Urology',
    desc: 'Formulations exceeding industry benchmarks to cater to growing demand of urology medicines.',
  },
  {
    title: 'Orthology',
    desc: 'A dedicated unit for bone care.',
  },
  {
    title: 'General',
    desc: 'A dedicated unit for overall health.',
  },
]

export default function TherapeuticAreas() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const row1 = AREAS.slice(0, 4)
  const row2 = AREAS.slice(4, 8)

  return (
    <section ref={sectionRef} style={{ padding: '5rem 150px 5rem' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
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
          Our Portfolio
        </span>

        <h2 style={{
          fontSize: '50px',
          fontWeight: 500,
          color: '#1a2f7a',
          marginBottom: '0.9rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.01em',
        }}>
          Therapeutic Areas
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#777',
          maxWidth: '420px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          A comprehensive range of medicines across specialities
        </p>
      </motion.div>

      {/* Row 1 — 4 cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
        marginBottom: '1rem',
      }}>
        {row1.map((area, i) => (
          <Card key={area.title} area={area} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Row 2 — 4 cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
      }}>
        {row2.map((area, i) => (
          <Card key={area.title} area={area} index={i + 4} isInView={isInView} />
        ))}
      </div>

    </section>
  )
}

function Card({ area, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 + index * 0.06 }}
      whileHover={{ scale: 1.025, transition: { duration: 0.15, ease: 'easeOut' } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #18458F 1%, #315F9C 24%, #2F4784 70%, #091C5C 100%)'
          : '#ffffff',
        border: hovered ? '1.5px solid transparent' : '1.5px solid #e2dfd9',
        borderRadius: '20px',
        padding: '2.25rem 2rem',
        cursor: 'default',
        transition: 'background 0.2s ease, border-color 0.2s ease',
        minHeight: '190px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 500,
        color: hovered ? '#ffffff' : '#1a1a1a',
        marginBottom: '0.75rem',
        fontFamily: "'Outfit', sans-serif",
        transition: 'color 0.2s ease',
      }}>
        {area.title}
      </h3>

      <p style={{
        fontSize: '0.95rem',
        fontWeight: 400,
        color: hovered ? 'rgba(255,255,255,0.72)' : '#aaa',
        lineHeight: 1.7,
        transition: 'color 0.2s ease',
      }}>
        {area.desc}
      </p>
    </motion.div>
  )
}
