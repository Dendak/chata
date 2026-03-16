import { Home, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark py-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 font-serif text-lg text-white/80">
            <Home size={16} className="text-accent" />
            <strong>Chata Lipno</strong>
          </div>
          <p className="text-white/30 text-xs text-center flex-1">
            &copy; 2026 Všechna práva vyhrazena
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border border-white/15 text-white/45 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all"
            aria-label="Zpět nahoru">
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
