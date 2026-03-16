import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { img } from '../utils/img'

export default function Lightbox({ images, index, onClose, onNav }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft')  onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNav])

  const image = images[index]
  if (!image) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Zavřít">
        <X size={18} />
      </button>

      {/* Prev */}
      <button onClick={() => onNav(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Předchozí">
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <div className="relative z-10 flex flex-col items-center px-16 max-w-5xl w-full">
        <img src={img(image.src)} alt={image.alt}
          className="max-h-[82vh] w-full object-contain rounded-xl shadow-2xl" />
        <p className="mt-4 text-white/45 text-sm">{image.alt}</p>
      </div>

      {/* Next */}
      <button onClick={() => onNav(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Další">
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
