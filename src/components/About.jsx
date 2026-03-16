import { motion } from 'framer-motion'
import { Bed, Bath, Flame, Wifi, Car, Mountain, ArrowRight } from 'lucide-react'
import { img } from '../utils/img'

const features = [
  { Icon: Bed,      title: '4 ložnice',    desc: 'Pohodlný spánek' },
  { Icon: Bath,     title: '2 koupelny',   desc: 'Moderní vybavení' },
  { Icon: Flame,    title: 'Krb',          desc: 'Útulné večery' },
  { Icon: Wifi,     title: 'Rychlé Wi-Fi', desc: 'Připojení zdarma' },
  { Icon: Car,      title: 'Parkování',    desc: 'U chaty zdarma' },
  { Icon: Mountain, title: 'Sjezdovka',    desc: '5 minut autem' },
]

export default function About() {
  const go = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section id="about" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>

            <p className="text-[0.72rem] font-semibold uppercase tracking-[3px] text-accent mb-4">O chatě</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-5">
              Vaše útočiště<br />v srdci přírody
            </h2>
            <p className="text-stone-500 text-[1.02rem] leading-relaxed mb-8">
              Naše útulná chata nabízí komfortní ubytování s moderním vybavením
              a krásným výhledem na okolní přírodu. Perfektní místo pro rodiny,
              páry i jednotlivce hledající klid a pohodu.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-9">
              {features.map(({ Icon, title, desc }) => (
                <div key={title}
                  className="flex items-center gap-3 bg-warm border border-stone-200/70 rounded-xl p-3.5 hover:bg-accent/5 hover:-translate-y-0.5 transition-all cursor-default">
                  <Icon size={18} className="text-accent flex-shrink-0" />
                  <div>
                    <p className="text-[0.88rem] font-semibold text-stone-900 leading-snug">{title}</p>
                    <p className="text-[0.75rem] text-stone-400 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => go('#contact')}
              className="flex items-center gap-2 bg-accent text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-accent/80 hover:-translate-y-0.5 transition-all shadow-lg shadow-accent/25">
              Nezávazná rezervace <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Images — bento grid */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-5 gap-3 h-[340px] md:h-[480px]">

            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden">
              <img src={img('exterier-leto.jpg')} alt="Chata Lipno — exteriér"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden">
              <img src={img('obyvak.jpg')} alt="Obývací pokoj"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden">
              <img src={img('terasa.jpeg')} alt="Terasa"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
