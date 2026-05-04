import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_TEXT = 'Committed Towards Healthier Life.'
const TYPE_SPEED = 60
const PAUSE_AFTER = 1200
const FADE_DURATION = 0.8

export default function LoadingScreen({ onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i === FULL_TEXT.length) {
        clearInterval(interval)
        setTimeout(() => setVisible(false), PAUSE_AFTER)
      }
    }, TYPE_SPEED)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '0 2rem',
          }}
        >
          <p
            style={{
              color: '#fff',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 600,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
              maxWidth: '700px',
              lineHeight: 1.2,
            }}
          >
            {displayed}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: '#fff',
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink 0.7s step-end infinite',
              }}
            />
          </p>
          <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
