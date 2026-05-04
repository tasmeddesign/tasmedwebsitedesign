import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

export default function Hero({ visible }) {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>
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
          opacity: 0.75,
        }}
        src="/0_Science_Scientist_3840x2160.mp4"
      />

      {/* Left dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 4rem',
          maxWidth: '700px',
        }}
      >
        {/* Badge */}
        <motion.div
          {...fadeUp(0.1)}
          animate={visible ? fadeUp(0.1).animate : fadeUp(0.1).initial}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '999px',
            padding: '0.3rem 1rem',
            marginBottom: '1.5rem',
            width: 'fit-content',
          }}
        >
          <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Established in 1994
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.25)}
          animate={visible ? fadeUp(0.25).animate : fadeUp(0.25).initial}
          style={{
            color: '#fff',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Committed Towards<br />Healthier Life.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.45)}
          animate={visible ? fadeUp(0.45).animate : fadeUp(0.45).initial}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '2.5rem',
          }}
        >
          For over three decades, our journey has been about the smiles, the recovery, and the generations we serve.
        </motion.p>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.6)}
          animate={visible ? fadeUp(0.6).animate : fadeUp(0.6).initial}
        >
          <motion.a
            href="/about"
            whileHover={{ scale: 1.05, background: '#fff', color: '#000' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              padding: '0.8rem 2rem',
              background: '#fff',
              color: '#000',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            About Us
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.5)' }}
        />
      </motion.div>
    </section>
  )
}
