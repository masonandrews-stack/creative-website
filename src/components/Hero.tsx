import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={`${import.meta.env.BASE_URL}hero.mp4`} autoPlay muted loop playsInline />
      {/* Overlays — opacity reduced by 70% */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(55,48,163,0.05) 0%, transparent 68%)', pointerEvents: 'none' }} />

      {/* Centered content — shifted up via bottom padding on the flex container */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px 12vh' }}>
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', fontSize: '10px', fontWeight: 500, color: 'rgba(43,43,43,0.85)', marginBottom: '17px' }}
        >
          8,000+ teams already onboard
        </motion.span>

        {/* Headline — dark to gray gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.22, ease: 'easeOut' }}
          style={{
            margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: 'clamp(1.9rem, 4.9vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.025em',
            maxWidth: '660px',
            background: 'linear-gradient(105deg, #2b2b2b 32%, #8f8f8f 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent', color: 'transparent',
            filter: 'drop-shadow(0 2px 18px rgba(0,0,0,0.14))',
          }}
        >
          Quiet the Noise.<br />Do Work That Matters.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{ margin: '16px 0 0', maxWidth: '410px', fontSize: '12px', lineHeight: 1.6, color: 'rgba(38,38,38,0.72)', fontWeight: 500 }}
        >
          Escape the endless pings and busywork. Meadow gives your team the room to focus and build things worth being proud of.
        </motion.p>

        {/* Clear-glass email bar */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', width: 'min(375px, 92vw)', marginTop: '26px', padding: '5px 5px 5px 17px', borderRadius: '999px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', boxShadow: '0 16px 44px rgba(0,0,0,0.14)' }}
        >
          <input
            className="meadow-input"
            type="email"
            placeholder="Enter your email"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: '12px', fontFamily: "'Inter', sans-serif", color: '#fff' }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ flexShrink: 0, padding: '9px 18px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#2b2b2b', background: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
          >
            Join Waitlist
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
