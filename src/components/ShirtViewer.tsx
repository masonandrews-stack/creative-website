import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { CSSProperties } from 'react'
import { artFilter, asset, type Design, type ShirtSide } from '../data/designs'

export function BananaMark({ className = '' }: { className?: string }) {
  return <span className={`banana-mark ${className}`} aria-hidden="true"><img src={asset('brand/banana.png')} alt="" /></span>
}

export function SideToggle({ side, onChange }: { side: ShirtSide, onChange: (side: ShirtSide) => void }) {
  return <div className="side-toggle" aria-label="Shirt view">{(['front', 'back'] as const).map(value => <button key={value} aria-pressed={side === value} onClick={() => onChange(value)}>{value.toUpperCase()}</button>)}</div>
}

interface Props { design: Design; side?: ShirtSide; interactive?: boolean; compact?: boolean; className?: string; busy?: boolean }

export default function ShirtViewer({ design, side = 'front', interactive = false, compact = false, className = '', busy = false }: Props) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 90, damping: 20 })
  const rotateY = useSpring(y, { stiffness: 90, damping: 20 })
  return <div className={`shirt-stage ${compact ? 'shirt-stage-compact' : ''} ${busy ? 'shirt-stage-busy' : ''} ${className}`} onPointerMove={event => {
    if (!interactive || reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((.5 - (event.clientY - rect.top) / rect.height) * 9)
    y.set(((event.clientX - rect.left) / rect.width - .5) * 14)
  }} onPointerLeave={() => { x.set(0); y.set(0) }} style={{ '--art-filter': artFilter(design) } as CSSProperties}>
    <motion.div className={`shirt-object ${interactive && !reduced ? 'shirt-float' : ''}`} style={{ rotateX, rotateY }}>
      <AnimatePresence mode="wait" initial={false}><motion.div className="shirt-face" key={side} initial={{ opacity: 0, rotateY: reduced ? 0 : -18 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: reduced ? 0 : 18 }} transition={{ duration: reduced ? 0 : .25 }}>
        <img className="shirt-photo" src={asset(`shirts/${side}.png`)} alt={`Cream Nano Banana T-shirt, ${side} view, with ${design.prompt}`} loading={compact ? 'lazy' : 'eager'} draggable={false} />
        <AnimatePresence initial={false}><motion.div className={`shirt-print shirt-print-${side}`} key={`${design.artwork}-${design.treatment}-${design.style}`} initial={{ opacity: 0, scale: reduced ? 1 : .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .28 }}>
          <img src={asset(`art/dream-0${design.artwork + 1}.png`)} alt="" loading={compact ? 'lazy' : 'eager'} draggable={false} /><span className="print-signature">NANO BANANA · ONE/ONE</span>
        </motion.div></AnimatePresence>
        {side === 'front' && <BananaMark className="shirt-permanent-mark" />}
      </motion.div></AnimatePresence>
    </motion.div>
  </div>
}
