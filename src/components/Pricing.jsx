import { motion } from 'framer-motion'
import { Moon, Star, CalendarDays, Check } from 'lucide-react'

const plans = [
  {
    Icon:     Moon,
    name:     'Standardní',
    price:    '1 200',
    period:   'Kč / noc',
    features: ['Pondělí – čtvrtek', 'Celá chata', 'Wi-Fi zdarma', 'Parkování zdarma'],
    featured: false,
  },
  {
    Icon:     Star,
    name:     'Víkendová',
    price:    '1 500',
    period:   'Kč / noc',
    badge:    'Nejoblíbenější',
    features: ['Pátek – neděle', 'Celá chata', 'Wi-Fi zdarma', 'Parkování zdarma'],
    featured: true,
  },
  {
    Icon:     CalendarDays,
    name:     'Týdenní pobyt',
    price:    '7 000',
    period:   'Kč / týden',
    features: ['7 nocí', 'Celá chata', 'Wi-Fi zdarma', 'Parkování zdarma'],
    featured: false,
  },
]

export default function Pricing() {
  const go = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[3px] text-accent mb-3">Ceník</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 mb-2">Ceny ubytování</h2>
          <p className="text-stone-400 text-sm">Ceny jsou za celou chatu — ne za osobu</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map(({ Icon, name, price, period, badge, features, featured }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                featured
                  ? 'bg-dark text-white shadow-xl'
                  : 'bg-white border border-stone-200 text-stone-900'
              }`}>

              {badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[0.7rem] font-bold uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                featured ? 'bg-white/10' : 'bg-accent/10'
              }`}>
                <Icon size={22} className={featured ? 'text-white' : 'text-accent'} />
              </div>

              <h3 className={`text-base font-semibold mb-3 ${featured ? 'text-white/90' : ''}`}>{name}</h3>

              <div className="mb-1">
                <span className="font-serif text-4xl font-bold">{price}</span>
                <span className={`text-sm ml-2 ${featured ? 'text-white/45' : 'text-stone-400'}`}>{period}</span>
              </div>

              <ul className={`my-6 space-y-3 flex-1 ${featured ? 'text-white/65' : 'text-stone-500'}`}>
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check size={14} className="text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => go('#contact')}
                className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  featured
                    ? 'bg-accent text-white hover:bg-accent/80 shadow-lg shadow-accent/30'
                    : 'border-2 border-accent text-accent hover:bg-accent hover:text-white'
                }`}>
                Rezervovat
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
