export type DesignMode = 'roll' | 'custom' | 'drop'
export type ShirtSide = 'front' | 'back'
export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Design {
  id: string
  prompt: string
  artwork: number
  treatment: number
  style: string
  mode: DesignMode
  generatedAt: string
}

export interface Order {
  design: Design
  size: ShirtSize
  price: number
  orderedAt: string
}

export const ARTWORKS = [
  { key: 'lunar', title: 'LAST STOP, MOON', prompt: 'An abandoned lunar gas station photographed in 1997.', filename: 'dream-01.png', tint: '#eee3dc' },
  { key: 'train', title: 'THE LAST TRAIN HOME', prompt: 'A Renaissance painting of silver robots waiting for the last train home.', filename: 'dream-02.png', tint: '#e3e5e5' },
  { key: 'garden', title: 'GROWING PAINS', prompt: 'A chrome computer growing flowers from memories it never had.', filename: 'dream-03.png', tint: '#ebeccd' },
  { key: 'ocean', title: 'SUN IN THE MACHINE', prompt: 'A floating brutalist dream machine remembering an orange sun over a cobalt sea.', filename: 'dream-04.png', tint: '#dde5eb' },
  { key: 'terminal', title: 'CLOUD STORAGE', prompt: 'An old CRT terminal filled with clouds and fluorescent vines in a pink twilight room.', filename: 'dream-05.png', tint: '#e9dfe8' },
  { key: 'cloudcar', title: 'SOFT DRIVE', prompt: 'A chrome race car made of inflatable clouds crossing an endless yellow desert.', filename: 'dream-06.png', tint: '#e7e3d2' },
] as const

export const STYLES = ['SURREAL', 'MINIMAL', 'RETRO', 'CHAOTIC', 'CYBER', 'ABSTRACT'] as const
export const SIZES: ShirtSize[] = ['S', 'M', 'L', 'XL', 'XXL']
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
export const priceFor = (mode: DesignMode) => mode === 'custom' ? 49 : 39

export function createDesign(artwork: number, mode: DesignMode, prompt: string = ARTWORKS[artwork].prompt, style = 'SURREAL'): Design {
  const serial = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(7, '0')
  return { id: `NB-07-${serial}`, artwork, mode, prompt, style, treatment: Math.floor(Math.random() * 4), generatedAt: new Date().toISOString() }
}

export function displayDesign(artwork: number, serial: string): Design {
  return { id: `NB-07-${serial}`, artwork, mode: 'drop', prompt: ARTWORKS[artwork].prompt, style: 'SURREAL', treatment: 0, generatedAt: '2026-10-06T12:00:00Z' }
}

export function artFilter(design: Design) {
  const styles: Record<string, string> = {
    SURREAL: 'saturate(1.1)', MINIMAL: 'saturate(.3) contrast(.95)', RETRO: 'sepia(.2) saturate(.85)',
    CHAOTIC: 'saturate(1.65) contrast(1.1)', CYBER: 'hue-rotate(22deg) saturate(1.3)', ABSTRACT: 'hue-rotate(-20deg) contrast(1.08)',
  }
  return `${styles[design.style] || styles.SURREAL} hue-rotate(${design.treatment * 8}deg)`
}
