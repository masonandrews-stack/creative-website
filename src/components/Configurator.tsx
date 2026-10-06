import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ARTWORKS, SIZES, STYLES, priceFor, type Design, type ShirtSide, type ShirtSize } from '../data/designs'
import ShirtViewer, { SideToggle } from './ShirtViewer'

interface Props {
  design: Design; side: ShirtSide; setSide: (side: ShirtSide) => void; prompt: string; setPrompt: (prompt: string) => void;
  style: string; setStyle: (style: string) => void; size: ShirtSize; setSize: (size: ShirtSize) => void;
  phase: 'idle' | 'generating' | 'rolling'; error: string; kept: boolean; locked: boolean; dropClosed: boolean; count: number;
  onGenerate: () => void; onRoll: () => void; onKeep: () => void; onVariant: (direction: number) => void; onOrder: () => void;
}

export default function Configurator(props: Props) {
  const { design, side, setSide, prompt, setPrompt, style, setStyle, size, setSize, phase, error, kept, locked, dropClosed, count, onGenerate, onRoll, onKeep, onVariant, onOrder } = props
  const busy = phase !== 'idle'
  const expired = design.mode === 'drop' && dropClosed
  const touch = useRef({ x: 0, y: 0 })
  const reduced = useReducedMotion()
  return <section id="create" className="lab-section section-shell">
    <div className="lab-section-heading"><div><p className="eyebrow">01 / THE GENERATION LAB</p><h2 className="section-heading">A little you.<br /><span>A little unknown.</span></h2></div><p>Start with an idea.<br />See what comes back.</p></div>
    <div className="lab-grid">
      <div className="lab-preview">
        <div className="lab-preview-top"><span className="eyebrow">YOUR NEXT ONE/ONE</span><span className="lab-live-label"><span /> LIVE PREVIEW</span></div>
        <div className="lab-swipe-surface" onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={event => {
          const dx = event.changedTouches[0].clientX - touch.current.x
          const dy = event.changedTouches[0].clientY - touch.current.y
          if (!busy && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) onVariant(dx < 0 ? 1 : -1)
        }}>
          <ShirtViewer design={design} side={side} interactive busy={busy} />
          {busy && <div className="generation-overlay" role="status"><span className="feeding-icon">🍌</span><strong>{phase === 'rolling' ? 'CONSULTING THE UNIVERSE…' : 'FEEDING THE BANANA…'}</strong><span className="generation-progress"><i /></span><small>{phase === 'rolling' ? 'A little less control. A lot more possibility.' : 'An idea goes in. A one-of-one comes out.'}</small></div>}
          {!busy && <motion.span key={design.id} className="edition-stamp" initial={{ scale: reduced ? 1 : 1.8, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: -9 }} transition={{ duration: .35 }}>1/1</motion.span>}
        </div>
        <div className="lab-view-controls"><SideToggle side={side} onChange={setSide} /><div className="variation-controls"><button aria-label="Previous variation" disabled={busy} onClick={() => onVariant(-1)}>←</button><span>VARIATION {design.artwork + 1} / {ARTWORKS.length}</span><button aria-label="Next variation" disabled={busy} onClick={() => onVariant(1)}>→</button></div></div>
        <div className="lab-design-meta"><span>{design.id}</span><span>GENERATED WITH NANO BANANA</span></div>
      </div>
      <div className="lab-controls">
        <div className="lab-controls-heading"><span className="eyebrow">MAKE THE FIRST MOVE</span><span className="little-sparkle">✳</span></div>
        <label className="prompt-label" htmlFor="shirt-prompt">What should your<br />shirt dream about?</label>
        <div className={`prompt-field ${error ? 'prompt-field-error' : ''}`}><textarea id="shirt-prompt" maxLength={240} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="An abandoned lunar gas station photographed in 1997…" aria-invalid={Boolean(error)} aria-describedby={error ? 'prompt-error' : 'prompt-count'} disabled={busy} /><div className="prompt-field-footer"><span>LET YOUR WEIRD OUT.</span><span id="prompt-count">{prompt.length}/240</span></div></div>
        {error && <p className="prompt-error" id="prompt-error" role="alert">{error}</p>}
        <div className="style-label"><span className="eyebrow">SET THE FEELING</span><span>optional</span></div>
        <div className="style-options">{STYLES.map(value => <button key={value} aria-pressed={style === value} disabled={busy} onClick={() => setStyle(value)}>{value}</button>)}</div>
        <button className="button button-ink generate-button" onClick={onGenerate} disabled={busy}><span>{phase === 'generating' ? 'FEEDING THE BANANA…' : 'GENERATE'}</span><span aria-hidden="true">✳</span></button>
        <p className="custom-fee">Custom Prompt +$10 <span>YOUR IDEA. OUR HAPPY ACCIDENT.</span></p>
        <div className="roll-zone" id="roll"><div><h3>Or, give up control.</h3><p>Nano Banana decides what you wear.</p></div><button className="button button-paper" disabled={busy} onClick={onRoll}><motion.span animate={phase === 'rolling' && !reduced ? { rotate: [0, 180, 360], y: [0, -5, 0] } : { rotate: 0, y: 0 }} transition={{ duration: .5, repeat: phase === 'rolling' && !reduced ? Infinity : 0 }}>🎲</motion.span><span>{phase === 'rolling' ? 'ROLLING…' : 'ROLL THE DICE'}</span></button></div>
      </div>
    </div>
    <div className="result-bar" aria-live="polite"><div><span className="eyebrow">{expired ? 'THIS UNIVERSE HAS CLOSED' : locked ? 'THIS DESIGN IS RETIRED' : kept ? 'GOOD CALL. THIS ONE IS A KEEPER.' : design.mode === 'roll' ? 'YOU ROLLED' : design.mode === 'custom' ? 'YOUR PROMPT, REIMAGINED' : 'FROM THIS WEEK’S UNIVERSE'}</span><p>“{design.prompt}”</p></div>{design.mode === 'roll' && !locked && <div className="result-actions"><button className={`button ${kept ? 'button-yellow' : 'button-outline'}`} disabled={busy} onClick={onKeep}>{kept ? '✓ KEPT' : 'KEEP IT'}</button><button className="text-button" disabled={busy} onClick={onRoll}>ROLL AGAIN ↗</button></div>}</div>
    <div className="purchase-bar"><div className="purchase-edition"><span>1 OF 1</span><p>Generated for you.<small>This exact graphic will never be printed again.</small></p></div><fieldset className="size-select"><legend>SELECT SIZE</legend><div>{SIZES.map(value => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)} disabled={busy || locked}>{value}</button>)}</div></fieldset><div className="purchase-action"><div className="purchase-price"><span>{design.mode === 'custom' ? 'CUSTOM PROMPT' : design.mode === 'drop' ? 'THE DROP' : 'ROLL THE DICE'}</span><strong>${priceFor(design.mode)}<small>USD</small></strong></div><button className="button button-ink" disabled={busy || locked || expired} onClick={onOrder}>{expired ? 'DROP CLOSED' : locked ? '✓ DESIGN LOCKED' : 'GENERATE & ORDER'}</button></div></div>
    <div className="lab-bottom-line"><span><i /> {count.toLocaleString()} unique shirts generated this drop</span><span>ONE IDEA. INFINITE POSSIBILITIES.</span></div>
  </section>
}
