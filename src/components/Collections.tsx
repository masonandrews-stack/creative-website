import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ARTWORKS, asset, displayDesign } from '../data/designs'
import ShirtViewer, { BananaMark } from './ShirtViewer'
import './Collections.css'

const dropSerials = ['18429', '29018', '12604', '34009', '17326', '21882']
const archiveDrops = [
  { name: 'DEEP SEA INTERNET', number: '06', artwork: 3, color: '#cbdce2', description: 'Signals from somewhere below.' },
  { name: 'FALSE MEMORIES', number: '05', artwork: 4, color: '#e6d7e2', description: 'You have never been here before.' },
  { name: 'POST-HUMAN GARDEN', number: '04', artwork: 2, color: '#d9dec6', description: 'Life finds another way.' },
  { name: 'CORPORATE HEAVEN', number: '03', artwork: 0, color: '#e6d6c4', description: 'Your dreams have been approved.' },
]
const communityPosts = [
  { handle: '@soft.error', caption: 'bro WHAT 😭', artwork: 4, serial: '10923', color: '#e2d9e0' },
  { handle: '@mira.wav', caption: 'I rolled once and refused to reroll.', artwork: 1, serial: '14280', color: '#dce2e4' },
  { handle: '@mono.monday', caption: 'NB-07-11821', artwork: 3, serial: '11821', color: '#dde5dc' },
  { handle: '@bobby.exe', caption: 'we had the same prompt and got completely different shirts', artwork: 5, serial: '19702', color: '#e6dfd0' },
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Arrow({ reverse = false }: { reverse?: boolean }) {
  return <span aria-hidden="true">{reverse ? '←' : '→'}</span>
}

export function WeeklyDrop({ onSelect, endAt }: { onSelect: (artwork: number) => void; endAt: number }) {
  const [now, setNow] = useState(Date.now)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [galleryPosition, setGalleryPosition] = useState({ first: true, last: false })
  const remaining = Math.max(0, endAt - now)
  const closed = remaining === 0
  const totalSeconds = Math.ceil(remaining / 1000)
  const countdown = [
    { value: Math.floor(totalSeconds / 86400), label: 'DAYS' },
    { value: Math.floor((totalSeconds % 86400) / 3600), label: 'HRS' },
    { value: Math.floor((totalSeconds % 3600) / 60), label: 'MIN' },
    { value: totalSeconds % 60, label: 'SEC' },
  ]

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const updateGalleryPosition = () => {
    const gallery = galleryRef.current
    if (!gallery) return
    setGalleryPosition({ first: gallery.scrollLeft < 3, last: gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 3 })
  }

  const moveGallery = (direction: number) => {
    const gallery = galleryRef.current
    if (!gallery) return
    const card = gallery.querySelector<HTMLElement>('.drop-card')
    gallery.scrollBy({ left: direction * ((card?.offsetWidth ?? 340) + 20), behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return (
    <section id="this-week" className="collections-section drop-section">
      <div className="section-shell">
        <Reveal>
          <div className="drop-section-topline">
            <span className="eyebrow">THIS WEEK’S UNIVERSE</span>
            <span className={`drop-live-label${closed ? ' drop-live-label-closed' : ''}`}><i />{closed ? 'DROP CLOSED' : 'LIVE NOW'} · DROP 07</span>
          </div>
          <div className="drop-intro">
            <div>
              <h2 className="section-heading drop-heading">DREAM<br />MACHINES<span className="drop-heading-dot">.</span></h2>
              <p className="drop-description">Machines remembering things<br className="drop-desktop-break" /> that never happened.</p>
            </div>
            <div className="drop-countdown">
              <span className="eyebrow">{closed ? 'THIS UNIVERSE HAS CLOSED' : 'THIS UNIVERSE ENDS IN'}</span>
              <div className="drop-countdown-values" role="timer" aria-label={closed ? 'Drop has ended' : `${countdown[0].value} days, ${countdown[1].value} hours, ${countdown[2].value} minutes, ${countdown[3].value} seconds remaining`}>
                {countdown.map((unit, index) => (
                  <div className="drop-countdown-unit" key={unit.label}>
                    {index > 0 && <span className="drop-countdown-colon" aria-hidden="true">:</span>}
                    <strong>{String(unit.value).padStart(2, '0')}</strong><span>{unit.label}</span>
                  </div>
                ))}
              </div>
              <p>One week. Infinite possibilities. Then gone.</p>
            </div>
          </div>
          <div className="drop-gallery-header">
            <p>The theme is shared. <span>The output isn’t.</span></p>
            <div className="drop-gallery-controls" aria-label="Browse this week’s designs">
              <button type="button" onClick={() => moveGallery(-1)} disabled={galleryPosition.first} aria-label="Previous shirt design"><Arrow reverse /></button>
              <button type="button" onClick={() => moveGallery(1)} disabled={galleryPosition.last} aria-label="Next shirt design"><Arrow /></button>
            </div>
          </div>
        </Reveal>
        <div className="drop-gallery" ref={galleryRef} onScroll={updateGalleryPosition} aria-label="Six unique Dream Machines shirt examples" tabIndex={0}>
          {ARTWORKS.map((artwork, index) => (
            <article className="drop-card" key={artwork.key}>
              <button
                type="button"
                className="drop-card-image"
                style={{ backgroundColor: artwork.tint }}
                disabled={closed}
                aria-label={`Choose ${artwork.title}, one of one shirt ${dropSerials[index]}`}
                onClick={() => { if (Date.now() < endAt) onSelect(index) }}
              >
                <span className="drop-edition">1 / 1</span>
                <ShirtViewer design={displayDesign(index, dropSerials[index])} compact interactive={false} className="drop-shirt" />
                <span className="drop-card-image-cta">{closed ? 'UNIVERSE CLOSED' : 'MAKE IT YOURS'} <span aria-hidden="true">↗</span></span>
              </button>
              <div className="drop-card-caption"><div><h3>{artwork.title}</h3><p>NB-07-{dropSerials[index]}</p></div><span className="drop-card-count">0{index + 1} / 06</span></div>
            </article>
          ))}
        </div>
        <div className="drop-section-footer"><span><i /> GENERATED WITH NANO BANANA</span><p>Every output is a first. And a last.</p></div>
      </div>
    </section>
  )
}

export function Archive() {
  return (
    <section id="archive" className="collections-section archive-section">
      <div className="section-shell">
        <Reveal>
          <div className="archive-heading-row"><div><span className="eyebrow">PAST LIVES</span><h2 className="section-heading">GONE.<br />STILL OUT THERE.</h2></div><p>Some universes only happen once.<br />These already did.</p></div>
          <div className="archive-grid">
            {archiveDrops.map(drop => (
              <article className="archive-card" key={drop.name} style={{ backgroundColor: drop.color }} tabIndex={0} aria-label={`Drop ${drop.number}: ${drop.name}. Archived, never returning.`}>
                <img src={asset(`art/${ARTWORKS[drop.artwork].filename}`)} alt="" className="archive-art" loading="lazy" />
                <div className="archive-card-top"><span>DROP {drop.number}</span><span aria-hidden="true">↗</span></div>
                <div className="archive-card-title"><h3>{drop.name}</h3><p>{drop.description}</p></div>
                <div className="archive-card-bottom"><span>ARCHIVED</span><span>NEVER RETURNING</span></div>
              </article>
            ))}
          </div>
          <p className="archive-footnote">Hover to remember. Nothing here comes back.</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Community() {
  return (
    <section id="community" className="collections-section community-section">
      <div className="section-shell">
        <Reveal>
          <div className="community-heading-row"><div><span className="eyebrow">THE UNBOXING IS THE REVEAL</span><h2 className="section-heading">WHAT DID<br />YOU GET<span className="community-question">?</span></h2></div><p>SAME DROP.<br />DIFFERENT UNIVERSE.</p></div>
          <div className="community-grid">
            {communityPosts.map((post, index) => (
              <article className="community-card" key={post.handle}>
                <div className={`community-photo community-photo-${index}`} style={{ backgroundColor: post.color }}>
                  <span className="community-photo-label">DREAM MACHINES / 07</span>
                  <ShirtViewer design={displayDesign(post.artwork, post.serial)} compact interactive={false} className="community-shirt" />
                  <span className="community-photo-edition">ONE / ONE</span>
                </div>
                <div className="community-caption"><span className="community-handle">{post.handle}</span><p>{post.caption}</p><span className="community-post-detail">1 unique output <span aria-hidden="true">♡</span></span></div>
              </article>
            ))}
          </div>
          <div className="community-footer"><p>Your shirt has a story.<br /><strong>We want to see how it ends up.</strong></p><span>CONCEPT COMMUNITY · FICTIONAL REVEALS</span></div>
        </Reveal>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="collections-section about-section">
      <div className="section-shell">
        <Reveal>
          <div className="about-heading-row"><span className="eyebrow">A SMALL BANANA. A BIG IDEA.</span><span className="about-wordmark">NANO BANANA / ONE<span>ONE</span></span></div>
          <h2 className="about-heading">YOURS.<br />AND ONLY<br /><span>YOURS.</span><BananaMark className="about-banana" /></h2>
          <div className="about-intro"><p>A shared identity.<br />An individual imagination.</p><p>One cream shirt. One small banana, always there. Everything else starts with a possibility — and becomes a graphic that belongs to one person.</p></div>
          <div className="about-steps">
            <article><span className="about-step-number">01</span><h3>THE IDEA.</h3><p>Write a prompt. Follow the weekly theme. Or hand the imagination over to a roll of the dice.</p></article>
            <article><span className="about-step-number">02</span><h3>THE SURPRISE.</h3><p>See an unexpected universe take shape on your shirt. Same starting point. A different ending, every time.</p></article>
            <article><span className="about-step-number">03</span><h3>THE LOCK.</h3><p>Make it yours and that exact design is retired. An edition of one. A certificate to prove it.</p></article>
          </div>
          <div className="about-prototype"><span className="eyebrow">AN EXPERIMENT IN INDIVIDUALITY</span><p>This is an independent concept prototype. Graphics and generation are simulated; community posts are fictional. No payment is taken, no physical order is placed, and this concept is not affiliated with Google.</p></div>
        </Reveal>
      </div>
    </section>
  )
}
