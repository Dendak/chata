import { useState, useEffect } from 'react'
import { Menu, X, Home } from 'lucide-react'

const links = [
  { href: '#about',   label: 'O nás' },
  { href: '#gallery', label: 'Galerie' },
  { href: '#pricing', label: 'Ceny' },
  { href: '#contact', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-dark/[0.92] backdrop-blur-lg shadow-xl py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">

        <button onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 font-serif text-xl font-bold text-white">
          <Home size={17} className="text-accent" />
          Chata Lipno
        </button>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="px-4 py-2 text-[0.87rem] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')}
            className="ml-3 px-5 py-2.5 text-[0.87rem] font-semibold bg-accent text-white rounded-full hover:bg-accent/80 transition-all hover:-translate-y-0.5">
            Rezervovat
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)}
          className="lg:hidden text-white p-1.5" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-dark/[0.97] backdrop-blur-lg border-t border-white/10 px-5 pb-5 pt-3">
          {links.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="block w-full text-left px-3 py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/5">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')}
            className="mt-4 w-full py-3 text-sm font-semibold bg-accent text-white rounded-full hover:bg-accent/80 transition-all">
            Rezervovat
          </button>
        </div>
      )}
    </nav>
  )
}
