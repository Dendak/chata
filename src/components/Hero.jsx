import { motion } from 'framer-motion'
import { ArrowRight, Bed, Flame, Snowflake, Wifi } from 'lucide-react'
import { img } from '../utils/img'

const fade = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.4, 0, 0.2, 1] },
})

const pills = [
  { Icon: Bed,       label: '4 ložnice' },
  { Icon: Flame,     label: 'Krb' },
  { Icon: Snowflake, label: '5 min sjezdovka' },
  { Icon: Wifi,      label: 'Wi-Fi' },
]

export default function Hero() {
  const go = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-end pb-24"
      style={{ backgroundImage: `url(${img('exterier-leto.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10" />

      <div className="max-w-6xl mx-auto px-5 relative z-10 w-full">

        <motion.p {...fade(0)}
          className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[3px] text-white/55 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
          Lipno nad Vltavou, CZ
        </motion.p>

        <motion.h1 {...fade(0.1)}
          className="font-serif text-[clamp(3rem,10vw,7rem)] font-bold text-white leading-[1.04] mb-5">
          Váš domov<br />
          <em className="italic font-normal" style={{ color: 'rgb(212 117 90)' }}>
            uprostřed přírody
          </em>
        </motion.h1>

        <motion.p {...fade(0.2)}
          className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
          Útulná chata s krbem, terasou a přímým napojením na přírodu
          Lipenska — pro celou rodinu.
        </motion.p>

        <motion.div {...fade(0.3)} className="flex items-center gap-3 flex-wrap mb-10">
          <button onClick={() => go('#about')}
            className="flex items-center gap-2 bg-accent text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-accent/80 hover:-translate-y-0.5 transition-all shadow-lg shadow-accent/30">
            Prohlédnout chatu <ArrowRight size={16} />
          </button>
          <button onClick={() => go('#pricing')}
            className="text-sm font-medium text-white px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/10 transition-all">
            Ceník
          </button>
        </motion.div>

        <motion.div {...fade(0.4)} className="flex gap-2 flex-wrap">
          {pills.map(({ Icon, label }) => (
            <div key={label}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium px-4 py-2 rounded-full">
              <Icon size={13} style={{ color: 'rgb(212 117 90)' }} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <button onClick={() => go('#stats')}
        className="absolute bottom-8 right-8 z-10 w-11 h-11 rounded-full border border-white/30 text-white/60 flex items-center justify-center hover:border-white/70 hover:text-white transition-all"
        style={{ animation: 'bounce 2s infinite' }}
        aria-label="Scrollovat dolů">
        ↓
      </button>
    </section>
  )
}
