import { useState } from 'react'
import { motion } from 'framer-motion'

const INK = '#2b2b2b'
const navLinks = ["How it works?", "Pricing", "Products", "Blog"]

export default function Navbar() {
  const [active, setActive] = useState('How it works?')

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px' }}
    >
      {/* Logo — white cloud */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <svg width="27" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.35))' }}>
          <path d="M7 19 C3.7 19 1 16.3 1 13 C1 10.1 3.1 7.7 5.9 7.1 C6.7 4.2 9.4 2 12.6 2 C16 2 18.9 4.5 19.6 7.8 C22.6 8 25 10.6 25 13.6 C25 16.6 22.6 19 19.6 19 Z" fill="#fff" />
        </svg>
        <span style={{ fontSize: '18px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em', textShadow: '0 1px 10px rgba(0,0,0,0.35)' }}>Meadow</span>
      </div>

      {/* Centered frosted link pill */}
      <div
        style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '2px', padding: '6px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.28)',
          border: '1px solid rgba(255,255,255,0.4)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        }}
      >
        {navLinks.map((link) => {
          const isActive = active === link
          return (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/[^a-z]/g, '')}`}
              onClick={() => setActive(link)}
              style={{
                position: 'relative', padding: '8px 16px', borderRadius: '999px',
                fontSize: '13px', fontWeight: 500,
                color: isActive ? INK : 'rgba(43,43,43,0.62)',
                textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s ease', cursor: 'pointer',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="meadow-nav"
                  style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: 'rgba(255,255,255,0.55)', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{link}</span>
            </a>
          )
        })}
      </div>

      {/* Get Started */}
      <motion.a
        href="#start"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '10px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
          color: INK, textDecoration: 'none',
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)', whiteSpace: 'nowrap',
        }}
      >
        Get Started
      </motion.a>
    </motion.div>
  )
}
