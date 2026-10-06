import { useEffect, useRef, type ReactNode } from 'react'

export default function Modal({ open, onClose, title, children, className = '' }: { open: boolean, onClose: () => void, title: string, children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  useEffect(() => {
    if (!open) return
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = before }
  }, [open])
  return <dialog ref={ref} className={`modal ${className}`} aria-label={title} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}><div className="modal-inner"><button className="modal-close" aria-label={`Close ${title}`} onClick={onClose}>×</button>{children}</div></dialog>
}
