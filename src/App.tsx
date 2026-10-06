import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Configurator from './components/Configurator'
import ShirtViewer, { BananaMark, SideToggle } from './components/ShirtViewer'
import Modal from './components/Modal'
import { About, Archive, Community, WeeklyDrop } from './components/Collections'
import { ARTWORKS, createDesign, priceFor, type Order, type ShirtSide, type ShirtSize } from './data/designs'
import './index.css'

function readOrders(): Order[] {
  try {
    const saved = JSON.parse(localStorage.getItem('nano-oneone-orders') || '[]')
    return Array.isArray(saved) ? saved.filter(order => order?.design?.id && typeof order.design.artwork === 'number' && order.design.artwork >= 0 && order.design.artwork < ARTWORKS.length && typeof order.design.prompt === 'string' && ['S', 'M', 'L', 'XL', 'XXL'].includes(order.size) && [39, 49].includes(order.price)) : []
  } catch { return [] }
}

function dropDeadline() {
  try {
    const saved = Number(localStorage.getItem('nano-drop-07-end'))
    if (saved > 0) return saved
    const deadline = Date.now() + ((2 * 24 + 14) * 60 + 32) * 60_000
    localStorage.setItem('nano-drop-07-end', String(deadline))
    return deadline
  } catch { return Date.now() + 225_120_000 }
}

function App() {
  const [design, setDesign] = useState(() => createDesign(0, 'drop'))
  const [side, setSide] = useState<ShirtSide>('front')
  const [size, setSize] = useState<ShirtSize>('M')
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('SURREAL')
  const [phase, setPhase] = useState<'idle' | 'generating' | 'rolling'>('idle')
  const [error, setError] = useState('')
  const [kept, setKept] = useState(false)
  const [count, setCount] = useState(2418)
  const [endAt] = useState(dropDeadline)
  const [dropClosed, setDropClosed] = useState(() => Date.now() >= endAt)
  const [orders, setOrders] = useState<Order[]>(readOrders)
  const [certificate, setCertificate] = useState<Order | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [shareCopied, setShareCopied] = useState(false)
  const timers = useRef<{ interval?: number, timeout?: number }>({})
  const phaseRef = useRef(false)
  const reduced = useReducedMotion()
  const locked = orders.some(order => order.design.id === design.id || (order.design.artwork === design.artwork && order.design.treatment === design.treatment && order.design.style === design.style))
  useEffect(() => { try { localStorage.setItem('nano-oneone-orders', JSON.stringify(orders)) } catch { /* Optional local persistence. */ } }, [orders])
  useEffect(() => () => { window.clearInterval(timers.current.interval); window.clearTimeout(timers.current.timeout) }, [])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 4200); return () => window.clearTimeout(timer) }, [toast])
  useEffect(() => { const timer = window.setInterval(() => setCount(value => value + 1), 28000); return () => window.clearInterval(timer) }, [])
  useEffect(() => { const timer = window.setTimeout(() => setDropClosed(true), Math.max(0, endAt - Date.now())); return () => window.clearTimeout(timer) }, [endAt])

  function availableDesign(artwork: number, mode: 'roll' | 'custom' | 'drop', nextPrompt: string = ARTWORKS[artwork].prompt, nextStyle = 'SURREAL') {
    const next = createDesign(artwork, mode, nextPrompt, nextStyle)
    const available = [0, 1, 2, 3].filter(treatment => !orders.some(order => order.design.artwork === artwork && order.design.treatment === treatment && order.design.style === nextStyle))
    if (available.length) next.treatment = available[Math.floor(Math.random() * available.length)]
    return next
  }

  function goTo(id: string, focusPrompt = false) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })
    if (focusPrompt) document.getElementById('shirt-prompt')?.focus({ preventScroll: true })
  }
  function startGeneration(mode: 'roll' | 'custom') {
    if (phaseRef.current) return
    if (mode === 'custom' && !prompt.trim()) { setError('Give the banana an idea first. A few words will do.'); goTo('create', true); return }
    setError(''); setKept(false); setShareCopied(false); phaseRef.current = true
    setPhase(mode === 'roll' ? 'rolling' : 'generating')
    let tick = 0
    const nextArtwork = mode === 'roll' ? Math.floor(Math.random() * ARTWORKS.length) : (prompt.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) + design.artwork + 1) % ARTWORKS.length
    const finalPrompt = mode === 'roll' ? ARTWORKS[nextArtwork].prompt : prompt.trim()
    const next = availableDesign(nextArtwork, mode, finalPrompt, mode === 'roll' ? 'SURREAL' : style)
    if (!reduced) timers.current.interval = window.setInterval(() => {
      tick += 1
      setDesign(current => {
        const artwork = (current.artwork + 1) % ARTWORKS.length
        return { ...current, artwork, treatment: tick % 4, prompt: mode === 'roll' ? ARTWORKS[artwork].prompt : current.prompt }
      })
    }, mode === 'roll' ? 135 : 360)
    timers.current.timeout = window.setTimeout(() => { window.clearInterval(timers.current.interval); setDesign(next); setPhase('idle'); phaseRef.current = false; setCount(value => value + 1); setToast(mode === 'roll' ? 'The universe has spoken. Meet your one-of-one.' : 'Idea in. One-of-one out. This is yours to lock.') }, reduced ? 900 : mode === 'roll' ? 2200 : 2600)
  }
  function rollFromHero() { goTo('create'); startGeneration('roll') }
  function chooseDrop(artwork: number) { if (Date.now() >= endAt) { setToast('This universe has closed. Try a custom prompt.'); return }; if (phaseRef.current) { setToast('Your next one-of-one is still cooking.'); return }; setDesign(availableDesign(artwork, 'drop')); setKept(false); setError(''); goTo('create') }
  function chooseVariation(direction: number) { if (phaseRef.current) return; setDesign(availableDesign((design.artwork + direction + ARTWORKS.length) % ARTWORKS.length, design.mode, design.prompt, design.style)); setKept(false) }
  function orderDesign() {
    if (phaseRef.current || locked) return
    if (design.mode === 'drop' && Date.now() >= endAt) { setToast('This universe has closed. Try a custom prompt.'); return }
    const order: Order = { design: { ...design }, size, price: priceFor(design.mode), orderedAt: new Date().toISOString() }
    setOrders(current => [order, ...current]); setCertificate(order); setShareCopied(false)
  }
  async function shareDesign(order: Order) {
    const text = `I got ${order.design.id}. “${order.design.prompt}” Same drop. Different universe. Nano Banana ONE/ONE — ${location.origin}${import.meta.env.BASE_URL}`
    try { await navigator.clipboard.writeText(text); setShareCopied(true) } catch { setToast('Sharing is unavailable in this browser. Your design ID is on the certificate.') }
  }
  function downloadCertificate(order: Order) {
    const text = `NANO BANANA ONE/ONE\nFICTIONAL GENERATION CERTIFICATE\n\n${order.design.id}\nPrompt: ${order.design.prompt}\nGenerated: ${new Date(order.design.generatedAt).toLocaleString()}\nEdition: 1/1\nSize: ${order.size}\n\nGenerated with Nano Banana\nPrototype order — no payment was taken.\n`
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${order.design.id}-certificate.txt`; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <>
    <header className="site-header"><a className="brand" href="#top" aria-label="Nano Banana home"><span className="brand-icon"><BananaMark /></span><span>NANO<br />BANANA<small>ONE/ONE</small></span></a><nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation"><a href="#create" onClick={() => setMenuOpen(false)}>CREATE</a><button onClick={rollFromHero} disabled={phase !== 'idle'}>ROLL</button><a href="#this-week" onClick={() => setMenuOpen(false)}>THIS WEEK</a><a href="#archive" onClick={() => setMenuOpen(false)}>ARCHIVE</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a></nav><div className="header-actions"><button className="cart-button" onClick={() => { setMenuOpen(false); setCartOpen(true) }}>CART <span>{orders.length}</span></button><button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? '×' : '☰'}</button></div></header>
    <main>
      <section className="hero-section" id="top"><div className="hero-grid section-shell">
        <div className="hero-copy"><div className="hero-drop-tag"><span /> DROP 07: DREAM MACHINES <span className="tag-divider">/</span> NOW GENERATING</div><motion.h1 initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>NO TWO<br />ARE THE<br /><span>SAME.</span><span className="headline-asterisk" aria-hidden="true">✳</span></motion.h1><p className="hero-subtitle">Prompt it. Roll it. Wear it.</p><p className="hero-support">Every Nano Banana shirt is generated individually.<br className="desktop-break" /> Choose the idea or leave it to chance.</p><div className="hero-ctas"><button className="button button-yellow" onClick={() => goTo('create', true)}>GENERATE MY SHIRT <span aria-hidden="true">↗</span></button><button className="hero-roll" onClick={rollFromHero} disabled={phase !== 'idle'}><span aria-hidden="true">🎲</span> ROLL THE DICE</button></div><div className="hero-proof"><span className="proof-line" /> ONE GRAPHIC. ONE SHIRT. ONLY YOU.</div></div>
        <div className="hero-product"><div className="hero-product-caption"><span className="eyebrow">A HAPPY ACCIDENT, IN COTTON.</span><span className="hero-edition">EDITION 1/1</span></div><ShirtViewer design={design} side={side} interactive busy={phase !== 'idle'} /><div className="hero-product-controls"><SideToggle side={side} onChange={setSide} /><span>MOVE AROUND.<br />THERE’S ANOTHER SIDE.</span></div><div className="hero-design-id"><span>{design.id}</span><span>100% COTTON / 100% UNREPEATABLE</span></div></div>
      </div><div className="hero-bottom section-shell"><a href="#create">SCROLL TO MAKE SOMETHING STRANGE <span>↓</span></a><span>DESIGNED BY YOU. SURPRISED BY AI.</span></div></section>
      <div className="statement-strip"><span>NEVER MASS PRODUCED.</span><span className="strip-flower">✳</span><span>ALWAYS ONE OF ONE.</span><span className="strip-flower">✳</span><span>A LITTLE WEIRD. A LOT YOU.</span><span className="strip-flower">✳</span><span>NEVER MASS PRODUCED.</span></div>
      <Configurator design={design} side={side} setSide={setSide} prompt={prompt} setPrompt={value => { setPrompt(value); setError('') }} style={style} setStyle={setStyle} size={size} setSize={setSize} phase={phase} error={error} kept={kept} locked={locked} dropClosed={dropClosed} count={count} onGenerate={() => startGeneration('custom')} onRoll={() => startGeneration('roll')} onKeep={() => { setKept(true); setToast('Good call. Pick a size and lock it in.') }} onVariant={chooseVariation} onOrder={orderDesign} />
      <WeeklyDrop onSelect={chooseDrop} endAt={endAt} /><Archive /><Community /><About />
    </main>
    <footer className="site-footer section-shell"><a className="footer-wordmark" href="#top">NANO BANANA<span>ONE/ONE</span></a><div><p>AN EXPERIMENT IN WEARABLE IMAGINATION.</p><span>Interactive concept. Artwork generation, community, scarcity, and orders are simulated.</span></div><a href="#create">MAKE YOUR ONE ↗</a></footer>
    <Modal open={cartOpen} onClose={() => setCartOpen(false)} title="Your collection" className="cart-modal"><p className="eyebrow">YOUR VERY OWN UNIVERSE</p><h2>Your collection<span>({orders.length})</span></h2><p className="modal-description">Prototype orders. No payments are collected.</p>{orders.length === 0 ? <div className="empty-cart"><span>1/1</span><h3>Nothing quite like you. Yet.</h3><p>Your first one-of-one is an idea away.</p><button className="button button-yellow" onClick={() => { setCartOpen(false); goTo('create', true) }}>CREATE YOURS</button></div> : <div className="cart-items">{orders.map(order => <button className="cart-item" key={order.design.id} onClick={() => { setCartOpen(false); setCertificate(order); setShareCopied(false) }}><ShirtViewer design={order.design} compact /><div><strong>{order.design.id}</strong><span>{order.design.prompt}</span><small>SIZE {order.size} · EDITION 1/1 · LOCKED</small></div><b>${order.price}</b></button>)}</div>}</Modal>
    <Modal open={Boolean(certificate)} onClose={() => setCertificate(null)} title="Generation certificate" className="certificate-modal">{certificate && <><div className="certificate-heading"><span className="eyebrow">PROTOTYPE ORDER CONFIRMED</span><h2>YOUR DESIGN<br />IS LOCKED.</h2><p>This exact generated design is retired in your collection.<br />There’s only one. And it’s yours.</p></div><div className="certificate-layout"><div className="certificate-shirt"><ShirtViewer design={certificate.design} /><span>SIZE {certificate.size} · ${certificate.price} USD</span></div><div className="certificate-card"><div className="certificate-card-top"><BananaMark /><span>GENERATION<br />CERTIFICATE</span></div><h3>NANO BANANA<br />ONE/ONE</h3><span className="certificate-id">{certificate.design.id}</span><dl><div><dt>PROMPT</dt><dd>{certificate.design.prompt}</dd></div><div><dt>GENERATED</dt><dd>{new Date(certificate.design.generatedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</dd></div><div><dt>EDITION</dt><dd>1 / 1</dd></div></dl><div className="certificate-seal">1/1</div><p>GENERATED WITH NANO BANANA</p><small>Fictional certificate · no payment taken</small></div></div><div className="certificate-actions"><button className="button button-ink" onClick={() => shareDesign(certificate)}>{shareCopied ? '✓ COPIED TO CLIPBOARD' : 'SHARE YOUR UNIVERSE ↗'}</button><button className="button button-outline" onClick={() => downloadCertificate(certificate)}>SAVE CERTIFICATE ↓</button></div></>}</Modal>
    <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status">{toast}</div>
  </>
}

export default App
