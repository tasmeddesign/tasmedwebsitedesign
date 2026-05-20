import { useParams, Navigate } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'

const DIVISION_DATA = {
  neurology: {
    title: 'Neurology',
    desc: 'Targeted neuro formulations addressing anxiety, depression, pain, spasm, and mood disorders.',
    themes: [
      {
        name: 'Pain and Spasm',
        desc: 'A comprehensive range of formulations to manage acute and chronic pain, muscle spasms, and related neuro-muscular conditions.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Anxiety & Depression',
        desc: 'Evidence-based formulations to help manage anxiety disorders and depressive conditions with precision.',
        products: [
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product E', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'OCD & Mood Disorders',
        desc: 'Targeted treatments for OCD, bipolar conditions, and mood regulation support.',
        products: [
          { name: 'Placeholder Product F', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product G', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  gastroenterology: {
    title: 'Gastroenterology',
    desc: 'Sustained medicines for renal disorders, hyperacidity, and oesophagitis reflux.',
    themes: [
      {
        name: 'Acid Reflux & GERD',
        desc: 'Formulations for managing gastroesophageal reflux disease and related digestive discomfort.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Renal Disorders',
        desc: 'Medicines supporting kidney function and managing renal conditions effectively.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  cardiology: {
    title: 'Cardiology',
    desc: 'Medicines to cure hypertension, manage heart rhythms, and control blood pressure.',
    themes: [
      {
        name: 'Hypertension',
        desc: 'Precision formulations for managing high blood pressure safely and effectively over the long term.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Heart Rhythm',
        desc: 'Antiarrhythmic formulations designed for managing irregular heart rhythms and related conditions.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Blood Pressure Management',
        desc: 'Long-acting formulations for sustained and consistent blood pressure control.',
        products: [
          { name: 'Placeholder Product E', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product F', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  'anti-diabetic': {
    title: 'Anti Diabetic',
    desc: 'Medicines to stabilise and control blood glucose levels among people with diabetes.',
    themes: [
      {
        name: 'Blood Glucose Control',
        desc: 'Oral formulations designed to stabilise and reduce blood glucose levels throughout the day.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Insulin Management',
        desc: 'Supportive therapies that complement and enhance insulin treatment plans.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  gynaecology: {
    title: 'Gynaecology',
    desc: 'Medical care for women during pregnancy, childbirth, and postpartum days.',
    themes: [
      {
        name: 'Pregnancy Care',
        desc: 'Nutritional and therapeutic support throughout all trimesters of pregnancy for mother and child.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Postpartum Care',
        desc: 'Recovery and wellness formulations designed for the critical postpartum period.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  urology: {
    title: 'Urology',
    desc: 'Formulations exceeding industry benchmarks for the growing demand in urology medicines.',
    themes: [
      {
        name: 'Urinary Tract Health',
        desc: 'Targeted treatments for urinary tract infections and chronic bladder conditions.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Prostate Care',
        desc: 'Medicines supporting prostate health, urinary flow, and related quality of life.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  orthology: {
    title: 'Orthology',
    desc: 'A dedicated unit for bone care, joint health, and musculoskeletal wellbeing.',
    themes: [
      {
        name: 'Bone Health',
        desc: 'Calcium and vitamin-D enriched formulations to maintain strong, healthy bones throughout life.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Joint & Muscle Care',
        desc: 'Anti-inflammatory and analgesic formulations for joint pain relief and muscle recovery.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
  general: {
    title: 'General',
    desc: 'A dedicated unit for overall health, immunity, and everyday wellness.',
    themes: [
      {
        name: 'Immunity & Wellness',
        desc: 'Broad-spectrum immunity boosters and general health supplements for all age groups.',
        products: [
          { name: 'Placeholder Product A', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product B', desc: 'Brief product description placeholder.' },
        ],
      },
      {
        name: 'Vitamins & Supplements',
        desc: 'Essential vitamin and mineral formulations covering daily nutritional requirements.',
        products: [
          { name: 'Placeholder Product C', desc: 'Brief product description placeholder.' },
          { name: 'Placeholder Product D', desc: 'Brief product description placeholder.' },
        ],
      },
    ],
  },
}

export default function DivisionPage() {
  const { area } = useParams()
  const data = DIVISION_DATA[area]

  if (!data) return <Navigate to="/" replace />

  return (
    <div style={{ background: '#FCFAF7', minHeight: '100vh' }}>
      <Navbar visible={true} />

      {/* Page hero */}
      <section style={{ padding: '3rem 150px 2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <a
            href="/division"
            style={{
              fontSize: '0.8rem',
              color: '#999',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.5rem',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Division
          </a>

          <span style={{
            display: 'inline-block',
            border: '1px solid #bbb',
            borderRadius: '999px',
            padding: '0.3rem 1.2rem',
            fontSize: '0.8rem',
            color: '#888',
            marginBottom: '1.25rem',
            letterSpacing: '0.03em',
            fontFamily: "'Outfit', sans-serif",
          }}>
            Our Division
          </span>

          <h1 style={{
            fontSize: '56px',
            fontWeight: 500,
            color: '#1a2f7a',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            {data.title}
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: '#777',
            maxWidth: '560px',
            lineHeight: 1.75,
            fontFamily: "'Outfit', sans-serif",
          }}>
            {data.desc}
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div style={{ margin: '0 150px', height: '1px', background: '#e8e5e0' }} />

      {/* Themes */}
      <section style={{ padding: '3.5rem 150px 6rem' }}>
        {data.themes.map((theme, i) => (
          <ThemeSection key={theme.name} theme={theme} index={i} />
        ))}
      </section>
    </div>
  )
}

function ThemeSection({ theme, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      style={{ marginBottom: '4rem' }}
    >
      {/* Theme header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: '#1a1a1a',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.01em',
          marginBottom: '0.5rem',
        }}>
          {theme.name}
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: '#888',
          maxWidth: '600px',
          lineHeight: 1.7,
          fontFamily: "'Outfit', sans-serif",
        }}>
          {theme.desc}
        </p>
      </div>

      {/* Product cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
      }}>
        {theme.products.map((product, pi) => (
          <ProductCard key={product.name} product={product} index={pi} />
        ))}
      </div>
    </motion.div>
  )
}

function ProductCard({ product }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #e8e5e0',
      borderRadius: '16px',
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
    }}>
      <div style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1a1a1a',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {product.name}
      </div>
      <div style={{
        fontSize: '0.875rem',
        color: '#aaa',
        lineHeight: 1.65,
        fontFamily: "'Outfit', sans-serif",
        flex: 1,
      }}>
        {product.desc}
      </div>
      <a
        href="#"
        style={{
          display: 'inline-block',
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: '#1a2f7a',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Learn More →
      </a>
    </div>
  )
}
