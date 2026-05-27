import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

/* ─────────────────────────────────────────────
   DATA  — swap products array with Excel data later
───────────────────────────────────────────── */
const DIVISION_DATA = {
  neurology: {
    title: 'Neurology',
    desc: 'Targeted neuro formulations addressing anxiety, depression, pain, spasm, and mood disorders.',
    heroImage: '/neurology-hero.png',
    stats: [{ value: '7+', label: 'Therapy Areas' }, { value: '30+', label: 'Products' }],
    themes: [
      'Anticonvulsant / Anxiolytic',
      'Neuropathic Pain',
      'Antidepressant & Anxiolytic',
      'Anti-migraine',
      'Antipsychotic',
      'Cognitive Support',
      'Sleep & Anxiety',
    ],
    products: [
      { brand: 'Placeholder A', generic: 'Clobazam',         dosage: '5/10/20mg',       theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder B', generic: 'Amitriptyline',    dosage: '10/25/50mg',       theme: 'Antidepressant & Anxiolytic' },
      { brand: 'Placeholder C', generic: 'Levetiracetam',    dosage: '250/500/750mg',    theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder D', generic: 'Methylcobalamin',  dosage: '1500mcg',          theme: 'Neuropathic Pain' },
      { brand: 'Placeholder E', generic: 'Flunarizine',      dosage: '5/10mg',           theme: 'Anti-migraine' },
      { brand: 'Placeholder F', generic: 'Sertraline',       dosage: '25/50/100mg',      theme: 'Antidepressant & Anxiolytic' },
      { brand: 'Placeholder G', generic: 'Gabapentin',       dosage: '100/300/400mg',    theme: 'Neuropathic Pain' },
      { brand: 'Placeholder H', generic: 'Clonazepam',       dosage: '0.25/0.5/1mg',    theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder I', generic: 'Pregabalin',       dosage: '75/150/300mg',     theme: 'Neuropathic Pain' },
      { brand: 'Placeholder J', generic: 'Divalproex Sodium', dosage: '250/500mg',       theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder K', generic: 'Rizatriptan',      dosage: '5/10mg',           theme: 'Anti-migraine' },
      { brand: 'Placeholder L', generic: 'Quetiapine',       dosage: '25/50/100mg',      theme: 'Antipsychotic' },
    ],
    focusDesc: 'We develop high-quality, evidence-based neurology formulations that improve patient outcomes and enhance quality of life.',
  },
  gastroenterology: {
    title: 'Gastroenterology',
    desc: 'Sustained medicines for renal disorders, hyperacidity, and oesophagitis reflux.',
    heroImage: '/gastroenterology-hero.png',
    stats: [{ value: '4+', label: 'Therapy Areas' }, { value: '20+', label: 'Products' }],
    themes: ['Acid Reflux & GERD', 'Renal Disorders', 'Irritable Bowel', 'Liver Care'],
    products: [
      { brand: 'Placeholder A', generic: 'Pantoprazole',    dosage: '20/40mg',     theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder B', generic: 'Rabeprazole',     dosage: '10/20mg',     theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder C', generic: 'Domperidone',     dosage: '10mg',        theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder D', generic: 'Cystone',         dosage: '500mg',       theme: 'Renal Disorders' },
      { brand: 'Placeholder E', generic: 'Mebeverine',      dosage: '135/200mg',   theme: 'Irritable Bowel' },
      { brand: 'Placeholder F', generic: 'Silymarin',       dosage: '140mg',       theme: 'Liver Care' },
    ],
    focusDesc: 'Quality formulations for gastrointestinal care, developed with precision to address hyperacidity, reflux, and renal concerns.',
  },
  cardiology: {
    title: 'Cardiology',
    desc: 'Medicines to cure hypertension, manage heart rhythms, and control blood pressure.',
    heroImage: '/cardiology-hero.png',
    stats: [{ value: '5+', label: 'Therapy Areas' }, { value: '25+', label: 'Products' }],
    themes: ['Hypertension', 'Heart Rhythm', 'Blood Pressure Management', 'Lipid Management', 'Anti-platelet'],
    products: [
      { brand: 'Placeholder A', generic: 'Amlodipine',    dosage: '2.5/5/10mg',   theme: 'Hypertension' },
      { brand: 'Placeholder B', generic: 'Telmisartan',   dosage: '20/40/80mg',   theme: 'Hypertension' },
      { brand: 'Placeholder C', generic: 'Metoprolol',    dosage: '25/50/100mg',  theme: 'Heart Rhythm' },
      { brand: 'Placeholder D', generic: 'Atorvastatin',  dosage: '10/20/40mg',   theme: 'Lipid Management' },
      { brand: 'Placeholder E', generic: 'Clopidogrel',   dosage: '75mg',         theme: 'Anti-platelet' },
      { brand: 'Placeholder F', generic: 'Ramipril',      dosage: '2.5/5/10mg',   theme: 'Blood Pressure Management' },
    ],
    focusDesc: 'Cardiology formulations built to the highest GMP standards, helping patients manage hypertension, lipids, and cardiac rhythm.',
  },
  'anti-diabetic': {
    title: 'Anti Diabetic',
    desc: 'Medicines to stabilise and control blood glucose levels among people with diabetes.',
    heroImage: '/diabetic-hero.png',
    stats: [{ value: '3+', label: 'Therapy Areas' }, { value: '15+', label: 'Products' }],
    themes: ['Blood Glucose Control', 'Insulin Management', 'Diabetic Neuropathy'],
    products: [
      { brand: 'Placeholder A', generic: 'Metformin',      dosage: '500/850/1000mg', theme: 'Blood Glucose Control' },
      { brand: 'Placeholder B', generic: 'Glimepiride',    dosage: '1/2/4mg',        theme: 'Blood Glucose Control' },
      { brand: 'Placeholder C', generic: 'Sitagliptin',    dosage: '25/50/100mg',    theme: 'Blood Glucose Control' },
      { brand: 'Placeholder D', generic: 'Voglibose',      dosage: '0.2/0.3mg',      theme: 'Insulin Management' },
      { brand: 'Placeholder E', generic: 'Methylcobalamin',dosage: '500/1500mcg',    theme: 'Diabetic Neuropathy' },
    ],
    focusDesc: 'Precision anti-diabetic formulations to stabilise and control blood glucose levels, supporting long-term patient health.',
  },
  gynaecology: {
    title: 'Gynaecology',
    desc: 'Medical care for women during pregnancy, childbirth, and postpartum days.',
    heroImage: '/gynaecology-hero.png',
    stats: [{ value: '4+', label: 'Therapy Areas' }, { value: '18+', label: 'Products' }],
    themes: ['Pregnancy Care', 'Postpartum Care', 'Hormonal Balance', 'Nutritional Support'],
    products: [
      { brand: 'Placeholder A', generic: 'Folic Acid',     dosage: '5mg',      theme: 'Pregnancy Care' },
      { brand: 'Placeholder B', generic: 'Iron + Folic',   dosage: '100/1.5mg', theme: 'Nutritional Support' },
      { brand: 'Placeholder C', generic: 'Progesterone',   dosage: '100/200mg', theme: 'Hormonal Balance' },
      { brand: 'Placeholder D', generic: 'Calcium + D3',   dosage: '500mg/200IU', theme: 'Pregnancy Care' },
      { brand: 'Placeholder E', generic: 'Methyldopa',     dosage: '250/500mg', theme: 'Postpartum Care' },
    ],
    focusDesc: 'Comprehensive gynaecology formulations designed for women\'s health at every stage — pregnancy, childbirth, and beyond.',
  },
  urology: {
    title: 'Urology',
    desc: 'Formulations exceeding industry benchmarks for the growing demand in urology medicines.',
    heroImage: '/urology-hero.png',
    stats: [{ value: '3+', label: 'Therapy Areas' }, { value: '12+', label: 'Products' }],
    themes: ['Urinary Tract Health', 'Prostate Care', 'Kidney Stones'],
    products: [
      { brand: 'Placeholder A', generic: 'Tamsulosin',     dosage: '0.2/0.4mg', theme: 'Prostate Care' },
      { brand: 'Placeholder B', generic: 'Solifenacin',    dosage: '5/10mg',    theme: 'Urinary Tract Health' },
      { brand: 'Placeholder C', generic: 'Nitrofurantoin', dosage: '50/100mg',  theme: 'Urinary Tract Health' },
      { brand: 'Placeholder D', generic: 'Potassium Citrate', dosage: '1080mg', theme: 'Kidney Stones' },
    ],
    focusDesc: 'Urology formulations crafted to address urinary tract, prostate, and kidney conditions with precision and care.',
  },
  orthology: {
    title: 'Orthology',
    desc: 'A dedicated unit for bone care, joint health, and musculoskeletal wellbeing.',
    heroImage: '/orthology-hero.png',
    stats: [{ value: '3+', label: 'Therapy Areas' }, { value: '14+', label: 'Products' }],
    themes: ['Bone Health', 'Joint & Muscle Care', 'Osteoporosis'],
    products: [
      { brand: 'Placeholder A', generic: 'Calcium + D3',    dosage: '500mg/400IU', theme: 'Bone Health' },
      { brand: 'Placeholder B', generic: 'Diclofenac',      dosage: '50/75/100mg', theme: 'Joint & Muscle Care' },
      { brand: 'Placeholder C', generic: 'Alendronate',     dosage: '35/70mg',     theme: 'Osteoporosis' },
      { brand: 'Placeholder D', generic: 'Etoricoxib',      dosage: '60/90/120mg', theme: 'Joint & Muscle Care' },
      { brand: 'Placeholder E', generic: 'Cholecalciferol', dosage: '60000IU',     theme: 'Bone Health' },
    ],
    focusDesc: 'Bone and joint formulations developed with precision to support musculoskeletal health and long-term mobility.',
  },
  general: {
    title: 'General',
    desc: 'A dedicated unit for overall health, immunity, and everyday wellness.',
    heroImage: '/general-hero.png',
    stats: [{ value: '3+', label: 'Therapy Areas' }, { value: '10+', label: 'Products' }],
    themes: ['Immunity & Wellness', 'Vitamins & Supplements', 'General Care'],
    products: [
      { brand: 'Placeholder A', generic: 'Vitamin C',        dosage: '500/1000mg', theme: 'Immunity & Wellness' },
      { brand: 'Placeholder B', generic: 'Zinc + Vitamin C', dosage: '50mg/500mg', theme: 'Immunity & Wellness' },
      { brand: 'Placeholder C', generic: 'Multivitamin',     dosage: 'Once daily',  theme: 'Vitamins & Supplements' },
      { brand: 'Placeholder D', generic: 'Omega-3',          dosage: '1000mg',      theme: 'Vitamins & Supplements' },
    ],
    focusDesc: 'General wellness formulations supporting immunity, nutrition, and everyday health for all age groups.',
  },
}

const FOCUS_PILLARS = [
  {
    title: 'Evidence Based',
    desc: 'Formulations backed by clinical research and medical evidence.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" stroke="#1a2f7a" strokeWidth="1.6">
        <circle cx="14" cy="14" r="11" />
        <path d="M10 14l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Patient First',
    desc: 'Improving quality of life through safe and effective treatments.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" stroke="#1a2f7a" strokeWidth="1.6">
        <path d="M14 24S4 18 4 11a5 5 0 0110 0 5 5 0 0110 0c0 7-10 13-10 13z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Innovation Driven',
    desc: 'Continuous research to address unmet medical needs.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" stroke="#1a2f7a" strokeWidth="1.6">
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="5" />
      </svg>
    ),
  },
  {
    title: 'Quality Assured',
    desc: 'Manufactured in WHO-GMP certified facilities with the highest quality standards.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" stroke="#1a2f7a" strokeWidth="1.6">
        <path d="M14 3l2.5 5.5L22 9.5l-4 4 .9 5.5L14 16.5l-4.9 2.5.9-5.5-4-4 5.5-1z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function DivisionPage() {
  const { area } = useParams()
  const data = DIVISION_DATA[area]
  const [activeTheme, setActiveTheme] = useState(null)
  const [sortAZ, setSortAZ] = useState(true)

  if (!data) return <Navigate to="/" replace />

  let filtered = activeTheme
    ? data.products.filter(p => p.theme === activeTheme)
    : [...data.products]

  if (sortAZ) filtered = [...filtered].sort((a, b) => a.brand.localeCompare(b.brand))

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar visible={true} />

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f4fa 0%, #e8eef8 100%)',
        padding: '2.5rem 150px 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.82rem', color: '#888', fontFamily: "'Outfit', sans-serif" }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3 12L12 4l9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <span>›</span>
          <a href="/division" style={{ color: '#888', textDecoration: 'none' }}>Division</a>
          <span>›</span>
          <span style={{ color: '#1a2f7a', fontWeight: 500 }}>{data.title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
          {/* Left text */}
          <div style={{ flex: '0 0 46%', paddingBottom: '3rem' }}>
            <h1 style={{
              fontSize: '62px',
              fontWeight: 700,
              color: '#1a2f7a',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}>
              {data.title}
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              lineHeight: 1.7,
              maxWidth: '400px',
              marginBottom: '2rem',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {data.desc}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {data.stats.map(s => (
                <div key={s.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: '#fff',
                  border: '1px solid #dde4f0',
                  borderRadius: '12px',
                  padding: '0.7rem 1.2rem',
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2f7a', fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: '#888', fontFamily: "'Outfit', sans-serif" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          {data.heroImage && (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <img
                src={data.heroImage}
                alt={data.title}
                style={{
                  maxHeight: '320px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  display: 'block',
                  filter: 'drop-shadow(0 8px 32px rgba(26,47,122,0.12))',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div style={{
        borderBottom: '1px solid #eee',
        background: '#fff',
        padding: '0 150px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <FilterTab label="All Therapies" active={activeTheme === null} onClick={() => setActiveTheme(null)} />
        {data.themes.map(t => (
          <FilterTab key={t} label={t} active={activeTheme === t} onClick={() => setActiveTheme(t)} />
        ))}
      </div>

      {/* ── Main content ── */}
      <div style={{ display: 'flex', padding: '2.5rem 150px 4rem', gap: '2.5rem', alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif", marginBottom: '1rem' }}>
            Therapy Areas
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <SidebarItem label="All Therapies" active={activeTheme === null} onClick={() => setActiveTheme(null)} />
            {data.themes.map(t => (
              <SidebarItem key={t} label={t} active={activeTheme === t} onClick={() => setActiveTheme(t)} />
            ))}
          </div>

          {/* Need Help box */}
          <div style={{
            marginTop: '2rem',
            background: '#f5f7fc',
            border: '1px solid #dde4f0',
            borderRadius: '12px',
            padding: '1.1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif" }}>Need Help?</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.5, marginBottom: '0.75rem', fontFamily: "'Outfit', sans-serif" }}>
              Our team is here to help with product information.
            </p>
            <a href="/contact" style={{
              display: 'block',
              textAlign: 'center',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#1a2f7a',
              border: '1.5px solid #1a2f7a',
              borderRadius: '8px',
              padding: '0.4rem 0',
              textDecoration: 'none',
              fontFamily: "'Outfit', sans-serif",
            }}>
              Contact Us
            </a>
          </div>
        </div>

        {/* Product grid */}
        <div style={{ flex: 1 }}>
          {/* Grid header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif" }}>
              Product Families ({filtered.length})
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#999', fontFamily: "'Outfit', sans-serif" }}>Sort by</span>
              <select
                value={sortAZ ? 'az' : 'za'}
                onChange={e => setSortAZ(e.target.value === 'az')}
                style={{
                  border: '1px solid #dde',
                  borderRadius: '8px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  color: '#333',
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  outline: 'none',
                  background: '#fff',
                }}
              >
                <option value="az">A – Z</option>
                <option value="za">Z – A</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}>
            {filtered.map((p, i) => (
              <ProductCard key={`${p.brand}-${i}`} product={p} />
            ))}
          </div>

          {/* View all */}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button style={{
                background: 'none',
                border: '1.5px solid #1a2f7a',
                borderRadius: '999px',
                padding: '0.65rem 2rem',
                fontSize: '0.875rem',
                color: '#1a2f7a',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                View All Products
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Focus section ── */}
      <div style={{
        borderTop: '1px solid #eee',
        padding: '3rem 150px',
        display: 'flex',
        gap: '4rem',
        alignItems: 'flex-start',
        background: '#fafbfd',
      }}>
        <div style={{ flex: '0 0 220px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>
            Our Focus In {data.title}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif" }}>
            {data.focusDesc}
          </p>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {FOCUS_PILLARS.map(p => (
            <div key={p.title}>
              <div style={{ marginBottom: '0.6rem' }}>{p.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif", marginBottom: '0.3rem' }}>{p.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#999', lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.85rem 1.1rem',
        background: 'none',
        border: 'none',
        borderBottom: active ? '2.5px solid #1a2f7a' : '2.5px solid transparent',
        color: active ? '#1a2f7a' : '#888',
        fontWeight: active ? 600 : 400,
        fontSize: '0.82rem',
        fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {label}
    </button>
  )
}

function SidebarItem({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '0.45rem 0.75rem',
        borderRadius: '8px',
        background: active ? '#eef1fb' : hovered ? '#f5f7fc' : 'none',
        border: 'none',
        fontSize: '0.82rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#1a2f7a' : '#555',
        fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer',
        transition: 'background 0.12s ease, color 0.12s ease',
      }}
    >
      {label}
    </button>
  )
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: hovered ? '1.5px solid #1a2f7a' : '1.5px solid #e8eaf0',
        borderRadius: '14px',
        padding: '1.25rem',
        cursor: 'default',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered ? '0 4px 20px rgba(26,47,122,0.08)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      {/* Brand name */}
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#1a2f7a',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-0.01em',
      }}>
        {product.brand}
      </div>

      {/* Generic + dosage */}
      <div style={{ fontSize: '0.78rem', color: '#888', fontFamily: "'Outfit', sans-serif", lineHeight: 1.4 }}>
        {product.generic} {product.dosage}
      </div>

      {/* Bottom row: tag + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{
          display: 'inline-block',
          background: '#eef1fb',
          color: '#1a2f7a',
          fontSize: '0.7rem',
          fontWeight: 500,
          fontFamily: "'Outfit', sans-serif",
          padding: '0.2rem 0.7rem',
          borderRadius: '999px',
        }}>
          {product.theme}
        </span>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid #dde4f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s ease, border-color 0.15s ease',
          background: hovered ? '#1a2f7a' : '#fff',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={hovered ? '#fff' : '#1a2f7a'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
