import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const SLIDES = [
  {
    image: '/innovation.jpg',
    title: 'INNOVATION',
    desc: 'Continuous R&D investment to develop formulations that meet evolving therapeutic needs.',
  },
  {
    image: '/quality.jpg',
    title: 'QUALITY',
    desc: 'Manufacturing with rigorous quality systems ensuring every batch meets global standards.',
  },
  {
    image: '/global.jpg',
    title: 'GLOBAL REACH',
    desc: 'Present across Africa, Southeast Asia, and South Asia — trusted by healthcare systems worldwide.',
  },
  {
    image: '/trust.jpg',
    title: 'TRUST',
    desc: 'Built on 25+ years of patient-first values, professional ethics, and reliable supply partnerships.',
  },
]

const INTERVAL = 4000

export default function AboutSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#f0eeea', padding: '3rem 150px 5rem' }}
    >
      {/* Top centered heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: '1rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.01em',
        }}>
          Built On Precision. Driven By Care.
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#777',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Tasmed Is A Trusted Pharmaceutical Company Committed To Making Quality Medicines
          Accessible Across India And Emerging Global Markets.
        </p>
      </motion.div>

      {/* 2-col layout */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

        {/* Left — fixed content, parallel to card height */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{
            flex: 1,
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{
              display: 'inline-block',
              border: '1px solid #aaa',
              borderRadius: '999px',
              padding: '0.3rem 1.1rem',
              fontSize: '0.8rem',
              color: '#666',
              marginBottom: '2rem',
            }}>
              Who We Are
            </span>

            <h3 style={{
              fontSize: '50px',
              fontWeight: 700,
              color: '#1a2f7a',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              fontFamily: "'Outfit', sans-serif",
            }}>
              Innovation & Ethics<br />At The Core
            </h3>

            <p style={{
              fontSize: '20px',
              color: '#666',
              lineHeight: 1.7,
              maxWidth: '380px',
            }}>
              We Apply Research, Technology And Science To Innovate And Develop High Quality
              Medicines To Treat Chronic Ailments In Our 2 GMP Certified & Schedule-M
              Complied Manufacturing Units.
            </p>
          </div>

          {/* Progress dots at bottom */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
              >
                <div style={{
                  height: '4px',
                  width: i === current ? '40px' : '10px',
                  borderRadius: '999px',
                  background: i === current ? 'rgba(26,47,122,0.15)' : '#ccc',
                  transition: 'width 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {i === current && (
                    <motion.div
                      key={`progress-${current}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        height: '100%',
                        background: '#1a2f7a',
                        borderRadius: '999px',
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right — carousel card: W=950, H=500 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          style={{
            flex: '0 0 950px',
            height: '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            background: '#111',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={SLIDES[current].image}
                alt={SLIDES[current].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Bottom gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)',
              }} />

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}
              >
                <h4 style={{
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: 300,
                  letterSpacing: '0.12em',
                  marginBottom: '0.5rem',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {SLIDES[current].title}
                </h4>
                <p style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  maxWidth: '420px',
                }}>
                  {SLIDES[current].desc}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
