import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ACCENT = ['#1a4fa0','#c0392b','#16763a','#7b2d8b','#c67c00','#1a6b7a','#b5451b','#2d6a9f']

/* ── Icons for filter tabs ── */
const TabIcons = {
  'All Therapies': (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  default: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6" strokeLinecap="round"/>
    </svg>
  ),
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const DIVISION_DATA = {
  neurology: {
    title: 'Neurology',
    desc: 'Targeted neuro formulations addressing anxiety, depression, pain, spasm, and mood disorders.',
    heroImage: '/neurology-hero.png',
    stats: [
      { icon: 'cube', value: '7+',  label: 'Therapy Areas' },
      { icon: 'pill', value: '30+', label: 'Products' },
    ],
    themes: ['Anticonvulsant / Anxiolytic','Neuropathic Pain','Antidepressant & Anxiolytic','Anti-migraine','Antipsychotic','Cognitive Support','Sleep & Anxiety'],
    products: [
      { brand: 'Placeholder A', generic: 'Clobazam',          dosage: '5/10/20mg',     theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder B', generic: 'Amitriptyline',     dosage: '10/25/50mg',    theme: 'Antidepressant & Anxiolytic' },
      { brand: 'Placeholder C', generic: 'Levetiracetam',     dosage: '250/500/750mg', theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder D', generic: 'Methylcobalamin',   dosage: '1500mcg',       theme: 'Neuropathic Pain' },
      { brand: 'Placeholder E', generic: 'Flunarizine',       dosage: '5/10mg',        theme: 'Anti-migraine' },
      { brand: 'Placeholder F', generic: 'Sertraline',        dosage: '25/50/100mg',   theme: 'Antidepressant & Anxiolytic' },
      { brand: 'Placeholder G', generic: 'Gabapentin',        dosage: '100/300/400mg', theme: 'Neuropathic Pain' },
      { brand: 'Placeholder H', generic: 'Clonazepam',        dosage: '0.25/0.5/1mg', theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder I', generic: 'Pregabalin',        dosage: '75/150/300mg',  theme: 'Neuropathic Pain' },
      { brand: 'Placeholder J', generic: 'Divalproex Sodium', dosage: '250/500mg',     theme: 'Anticonvulsant / Anxiolytic' },
      { brand: 'Placeholder K', generic: 'Rizatriptan',       dosage: '5/10mg',        theme: 'Anti-migraine' },
      { brand: 'Placeholder L', generic: 'Quetiapine',        dosage: '25/50/100mg',   theme: 'Antipsychotic' },
    ],
    focusDesc: 'We develop high-quality, evidence-based neurology formulations that improve patient outcomes and enhance quality of life.',
  },
  gastroenterology: {
    title: 'Gastroenterology',
    desc: 'Sustained medicines for renal disorders, hyperacidity, and oesophagitis reflux.',
    heroImage: '/gastroenterology-hero.png',
    stats: [{ icon: 'cube', value: '4+', label: 'Therapy Areas' }, { icon: 'pill', value: '20+', label: 'Products' }],
    themes: ['Acid Reflux & GERD','Renal Disorders','Irritable Bowel','Liver Care'],
    products: [
      { brand: 'Placeholder A', generic: 'Pantoprazole', dosage: '20/40mg',   theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder B', generic: 'Rabeprazole',  dosage: '10/20mg',   theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder C', generic: 'Domperidone',  dosage: '10mg',      theme: 'Acid Reflux & GERD' },
      { brand: 'Placeholder D', generic: 'Cystone',      dosage: '500mg',     theme: 'Renal Disorders' },
      { brand: 'Placeholder E', generic: 'Mebeverine',   dosage: '135/200mg', theme: 'Irritable Bowel' },
      { brand: 'Placeholder F', generic: 'Silymarin',    dosage: '140mg',     theme: 'Liver Care' },
    ],
    focusDesc: 'Quality formulations for gastrointestinal care, developed with precision to address hyperacidity, reflux, and renal concerns.',
  },
  cardiology: {
    title: 'Cardiology',
    desc: 'Medicines to cure hypertension, manage heart rhythms, and control blood pressure.',
    heroImage: '/cardiology-hero.png',
    stats: [{ icon: 'cube', value: '5+', label: 'Therapy Areas' }, { icon: 'pill', value: '25+', label: 'Products' }],
    themes: ['Hypertension','Heart Rhythm','Blood Pressure Management','Lipid Management','Anti-platelet'],
    products: [
      { brand: 'Placeholder A', generic: 'Amlodipine',   dosage: '2.5/5/10mg', theme: 'Hypertension' },
      { brand: 'Placeholder B', generic: 'Telmisartan',  dosage: '20/40/80mg', theme: 'Hypertension' },
      { brand: 'Placeholder C', generic: 'Metoprolol',   dosage: '25/50/100mg',theme: 'Heart Rhythm' },
      { brand: 'Placeholder D', generic: 'Atorvastatin', dosage: '10/20/40mg', theme: 'Lipid Management' },
      { brand: 'Placeholder E', generic: 'Clopidogrel',  dosage: '75mg',       theme: 'Anti-platelet' },
      { brand: 'Placeholder F', generic: 'Ramipril',     dosage: '2.5/5/10mg', theme: 'Blood Pressure Management' },
    ],
    focusDesc: 'Cardiology formulations built to the highest GMP standards, helping patients manage hypertension, lipids, and cardiac rhythm.',
  },
  'anti-diabetic': {
    title: 'Anti Diabetic',
    desc: 'Medicines to stabilise and control blood glucose levels among people with diabetes.',
    heroImage: '/diabetic-hero.png',
    stats: [{ icon: 'cube', value: '3+', label: 'Therapy Areas' }, { icon: 'pill', value: '15+', label: 'Products' }],
    themes: ['Blood Glucose Control','Insulin Management','Diabetic Neuropathy'],
    products: [
      { brand: 'Placeholder A', generic: 'Metformin',        dosage: '500/850/1000mg', theme: 'Blood Glucose Control' },
      { brand: 'Placeholder B', generic: 'Glimepiride',      dosage: '1/2/4mg',        theme: 'Blood Glucose Control' },
      { brand: 'Placeholder C', generic: 'Sitagliptin',      dosage: '25/50/100mg',    theme: 'Blood Glucose Control' },
      { brand: 'Placeholder D', generic: 'Voglibose',        dosage: '0.2/0.3mg',      theme: 'Insulin Management' },
      { brand: 'Placeholder E', generic: 'Methylcobalamin',  dosage: '500/1500mcg',    theme: 'Diabetic Neuropathy' },
    ],
    focusDesc: 'Precision anti-diabetic formulations to stabilise and control blood glucose levels, supporting long-term patient health.',
  },
  gynaecology: {
    title: 'Gynaecology',
    desc: 'Medical care for women during pregnancy, childbirth, and postpartum days.',
    heroImage: '/gynaecology-hero.png',
    stats: [{ icon: 'cube', value: '4+', label: 'Therapy Areas' }, { icon: 'pill', value: '18+', label: 'Products' }],
    themes: ['Pregnancy Care','Postpartum Care','Hormonal Balance','Nutritional Support'],
    products: [
      { brand: 'Placeholder A', generic: 'Folic Acid',   dosage: '5mg',         theme: 'Pregnancy Care' },
      { brand: 'Placeholder B', generic: 'Iron + Folic', dosage: '100/1.5mg',   theme: 'Nutritional Support' },
      { brand: 'Placeholder C', generic: 'Progesterone', dosage: '100/200mg',   theme: 'Hormonal Balance' },
      { brand: 'Placeholder D', generic: 'Calcium + D3', dosage: '500mg/200IU', theme: 'Pregnancy Care' },
      { brand: 'Placeholder E', generic: 'Methyldopa',   dosage: '250/500mg',   theme: 'Postpartum Care' },
    ],
    focusDesc: "Comprehensive gynaecology formulations designed for women's health at every stage — pregnancy, childbirth, and beyond.",
  },
  urology: {
    title: 'Urology',
    desc: 'Formulations exceeding industry benchmarks for the growing demand in urology medicines.',
    heroImage: '/urology-hero.png',
    stats: [{ icon: 'cube', value: '3+', label: 'Therapy Areas' }, { icon: 'pill', value: '12+', label: 'Products' }],
    themes: ['Urinary Tract Health','Prostate Care','Kidney Stones'],
    products: [
      { brand: 'Placeholder A', generic: 'Tamsulosin',        dosage: '0.2/0.4mg', theme: 'Prostate Care' },
      { brand: 'Placeholder B', generic: 'Solifenacin',       dosage: '5/10mg',    theme: 'Urinary Tract Health' },
      { brand: 'Placeholder C', generic: 'Nitrofurantoin',    dosage: '50/100mg',  theme: 'Urinary Tract Health' },
      { brand: 'Placeholder D', generic: 'Potassium Citrate', dosage: '1080mg',    theme: 'Kidney Stones' },
    ],
    focusDesc: 'Urology formulations crafted to address urinary tract, prostate, and kidney conditions with precision and care.',
  },
  orthology: {
    title: 'Orthology',
    desc: 'A dedicated unit for bone care, joint health, and musculoskeletal wellbeing.',
    heroImage: '/orthology-hero.png',
    stats: [{ icon: 'cube', value: '3+', label: 'Therapy Areas' }, { icon: 'pill', value: '14+', label: 'Products' }],
    themes: ['Bone Health','Joint & Muscle Care','Osteoporosis'],
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
    stats: [{ icon: 'cube', value: '3+', label: 'Therapy Areas' }, { icon: 'pill', value: '10+', label: 'Products' }],
    themes: ['Immunity & Wellness','Vitamins & Supplements','General Care'],
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
  { title: 'Evidence Based',   desc: 'Formulations backed by clinical research and medical evidence.',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: 'Patient First',    desc: 'Improving quality of life through safe and effective treatments.',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8"><path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: 'Innovation Driven',desc: 'Continuous research to address unmet medical needs.',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { title: 'Quality Assured',  desc: 'Manufactured in WHO-GMP certified facilities with the highest standards.',
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/></svg> },
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
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>

      {/* Navbar */}
      <div style={{ borderBottom: '1px solid #f0f0f2' }}>
        <Navbar visible={true} />
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <div style={{ position: 'relative', minHeight: '380px', overflow: 'hidden', background: '#fff' }}>

        {/* Image — covers the right portion */}
        {data.heroImage && (
          <img
            src={data.heroImage}
            alt={data.title}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: '62%',
              objectFit: 'cover',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
        )}

        {/* White gradient — bleeds over the left edge of the image, creating the smooth blend */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #ffffff 0%, #ffffff 34%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.7) 52%, rgba(255,255,255,0.2) 62%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Content — sits above gradient */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: '2.5rem 3rem 3rem 150px',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '52%',
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.8rem', color: '#9ca3af' }}>
            <a href="/" style={{ color: '#9ca3af', textDecoration: 'none', lineHeight: 0 }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <svg width="6" height="10" fill="none" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <a href="/division" style={{ color: '#9ca3af', textDecoration: 'none' }}>Division</a>
            <svg width="6" height="10" fill="none" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ color: '#374151', fontWeight: 500 }}>{data.title}</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '62px',
            fontWeight: 800,
            color: '#1a2f7a',
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            marginBottom: '0.9rem',
          }}>
            {data.title}
          </h1>

          {/* Description */}
          <p style={{ fontSize: '0.92rem', color: '#6b7280', lineHeight: 1.75, maxWidth: '360px', marginBottom: '2rem' }}>
            {data.desc}
          </p>

          {/* Stat chips */}
          <div style={{
            display: 'inline-flex',
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            overflow: 'hidden',
            width: 'fit-content',
            background: '#fff',
          }}>
            {data.stats.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.4rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon === 'cube' ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="1.8">
                        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', lineHeight: 1.1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' }}>{s.label}</div>
                  </div>
                </div>
                {i < data.stats.length - 1 && (
                  <div style={{ width: '1px', height: '48px', background: '#e5e7eb', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ FILTER TABS ══════════════ */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
        padding: '1rem 150px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* All Therapies */}
          <FilterPill
            label="All Therapies"
            active={activeTheme === null}
            onClick={() => setActiveTheme(null)}
            icon={
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            }
          />
          {data.themes.slice(0, 5).map(t => (
            <FilterPill
              key={t}
              label={t}
              active={activeTheme === t}
              onClick={() => setActiveTheme(t)}
              icon={
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"/>
                </svg>
              }
            />
          ))}
          {data.themes.length > 5 && (
            <button
              onClick={() => {}}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.45rem 1rem', borderRadius: '999px',
                background: 'none', border: 'none',
                fontSize: '0.8rem', fontWeight: 600, color: '#1a2f7a',
                cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}
            >
              View All
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div style={{ display: 'flex', padding: '2.5rem 150px 5rem', gap: '2.5rem', alignItems: 'flex-start' }}>

        {/* ── Sidebar ── */}
        <div style={{ width: '190px', flexShrink: 0, position: 'sticky', top: '70px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Therapy Areas
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <SidebarItem label="All Therapies" active={activeTheme === null} onClick={() => setActiveTheme(null)} />
            {data.themes.map(t => (
              <SidebarItem key={t} label={t} active={activeTheme === t} onClick={() => setActiveTheme(t)} />
            ))}
          </div>

          {/* Help card */}
          <div style={{
            marginTop: '2rem', background: '#eff6ff',
            borderRadius: '14px', padding: '1.1rem',
            border: '1px solid #dbeafe',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1a2f7a" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e3a8a' }}>Need Help?</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: '#3b82f6', lineHeight: 1.55, marginBottom: '0.85rem' }}>
              Our team is here to help with product information.
            </p>
            <a href="/contact" style={{
              display: 'block', textAlign: 'center',
              fontSize: '0.76rem', fontWeight: 600, color: '#1a2f7a',
              background: '#fff', border: '1.5px solid #1a2f7a',
              borderRadius: '8px', padding: '0.45rem 0', textDecoration: 'none',
            }}>
              Contact Us
            </a>
          </div>
        </div>

        {/* ── Product grid ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
              Product Families
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#9ca3af', marginLeft: '0.4rem' }}>
                ({filtered.length})
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Sort by</span>
              <select
                value={sortAZ ? 'az' : 'za'}
                onChange={e => setSortAZ(e.target.value === 'az')}
                style={{
                  border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: '#374151',
                  fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
                  outline: 'none', background: '#fff', fontWeight: 500,
                }}
              >
                <option value="az">A – Z</option>
                <option value="za">Z – A</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {filtered.map((p, i) => (
              <ProductCard key={`${p.brand}-${i}`} product={p} colorIndex={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button style={{
              background: 'none', border: '1.5px solid #1a2f7a',
              borderRadius: '999px', padding: '0.65rem 2rem',
              fontSize: '0.875rem', color: '#1a2f7a',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}>
              View All Products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════ FOCUS SECTION ══════════════ */}
      <div style={{ background: '#f9fafb', borderTop: '1px solid #f3f4f6', padding: '3.5rem 150px' }}>
        <div style={{ display: 'flex', gap: '5rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 210px' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.6rem' }}>
              Our Focus In {data.title}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.7 }}>{data.focusDesc}</p>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {FOCUS_PILLARS.map(p => (
              <div key={p.title}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: '#fff', border: '1px solid #e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                  {p.icon}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827', marginBottom: '0.3rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function FilterPill({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.45rem 1rem', borderRadius: '999px',
        background: active ? '#1a2f7a' : '#fff',
        border: `1.5px solid ${active ? '#1a2f7a' : '#e5e7eb'}`,
        color: active ? '#fff' : '#6b7280',
        fontWeight: active ? 600 : 400,
        fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif",
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'all 0.15s ease',
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function SidebarItem({ label, active, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '0.45rem 0.7rem', borderRadius: '8px',
        background: active ? '#eff6ff' : hov ? '#f9fafb' : 'transparent',
        border: 'none', fontSize: '0.82rem',
        fontWeight: active ? 600 : 400,
        color: active ? '#1d4ed8' : '#6b7280',
        fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s',
      }}
    >
      {label}
    </button>
  )
}

function ProductCard({ product, colorIndex }) {
  const [hov, setHov] = useState(false)
  const accent = ACCENT[colorIndex % ACCENT.length]
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hov ? accent : '#e5e7eb'}`,
        borderRadius: '16px',
        padding: '1.4rem 1.25rem 1.1rem',
        cursor: 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hov ? `0 6px 24px ${accent}22` : '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: '140px',
      }}
    >
      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: accent, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {product.brand}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.4 }}>
        {product.generic} {product.dosage}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          display: 'inline-block', background: `${accent}12`, color: accent,
          fontSize: '0.68rem', fontWeight: 600, padding: '0.22rem 0.65rem',
          borderRadius: '999px', maxWidth: '130px', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {product.theme}
        </span>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          border: `1.5px solid ${hov ? accent : '#e5e7eb'}`,
          background: hov ? accent : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.18s',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke={hov ? '#fff' : accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
