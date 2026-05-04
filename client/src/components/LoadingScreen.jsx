import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_TEXT = 'Committed Towards Healthier Life.'
const TYPE_SPEED = 60
const PAUSE_AFTER = 1200

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
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          {/* Animated navy gradient background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #050d1a, #0a1f4e, #1a3a6b, #0d2444, #07163a)',
            backgroundSize: '400% 400%',
            animation: 'navyGradient 6s ease infinite',
          }} />

          <p style={{
            position: 'relative',
            color: '#fff',
            fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            {displayed}
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#fff',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'blink 0.7s step-end infinite',
            }} />
          </p>

          <style>{`
            @keyframes navyGradient {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
