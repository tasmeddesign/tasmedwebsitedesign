import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

export default function Hero({ visible }) {
  return (
    <div style={{ padding: '0 1.5rem 1.5rem' }}>
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        height: 'calc(100vh - 80px - 1.5rem)',
        background: '#000',
      }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
          }}
        >
          <source src="/hero-bg.mp4.mp4" type="video/mp4" />
        </video>

        {/* Left dark gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.0) 75%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 3.5rem',
          maxWidth: '720px',
        }}>
          {/* Badge */}
          <motion.div
            initial={fadeUp(0.1).initial}
            animate={visible ? fadeUp(0.1).animate : fadeUp(0.1).initial}
            transition={fadeUp(0.1).transition}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: '999px',
              padding: '0.35rem 1.1rem',
              marginBottom: '2rem',
              width: 'fit-content',
            }}
          >
            <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Established in 1994
            </span>
          </motion.div>

          {/* Headline — 2 lines */}
          <motion.h1
            initial={fadeUp(0.25).initial}
            animate={visible ? fadeUp(0.25).animate : fadeUp(0.25).initial}
            transition={fadeUp(0.25).transition}
            style={{
              color: '#fff',
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <span style={{ display: 'block' }}>Committed Towards</span>
            <span style={{ display: 'block' }}>Healthier Life.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={fadeUp(0.4).initial}
            animate={visible ? fadeUp(0.4).animate : fadeUp(0.4).initial}
            transition={fadeUp(0.4).transition}
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              maxWidth: '380px',
              marginBottom: '2.5rem',
            }}
          >
            For over three decades, our journey has been about the smiles, the recovery, and the generations we serve.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={fadeUp(0.55).initial}
            animate={visible ? fadeUp(0.55).animate : fadeUp(0.55).initial}
            transition={fadeUp(0.55).transition}
          >
            <a
              href="/about"
              className="about-btn"
            >
              About Us
            </a>
          </motion.div>
        </div>

        {/* Scroll to explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 2,
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.45)' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
