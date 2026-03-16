import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { img } from '../utils/img'
import Lightbox from './Lightbox'

const ALL_IMAGES = [
  { src: 'kuchyn.jpg',                alt: 'Kuchyň',              cat: 'interior' },
  { src: 'obyvak.jpg',                alt: 'Obývák',              cat: 'interior' },
  { src: 'obyvak 2.jpeg',             alt: 'Obývák 2',            cat: 'interior' },
  { src: 'obyvak 3.jpg',              alt: 'Obývák 3',            cat: 'interior' },
  { src: 'jidelna.jpeg',              alt: 'Jídelna',             cat: 'interior' },
  { src: 'loznice.jpeg',              alt: 'Ložnice',             cat: 'interior' },
  { src: 'loznice 1.jpg',             alt: 'Ložnice 1',           cat: 'interior' },
  { src: 'loznice 2.jpeg',            alt: 'Ložnice 2',           cat: 'interior' },
  { src: 'loznice 3.jpeg',            alt: 'Ložnice 3',           cat: 'interior' },
  { src: 'dolni-koupelna-1.jpg',      alt: 'Dolní koupelna',      cat: 'interior' },
  { src: 'horni-koupelna-1.jpg',      alt: 'Horní koupelna 1',    cat: 'interior' },
  { src: 'horni koupelna 2.jpeg',     alt: 'Horní koupelna 2',    cat: 'interior' },
  { src: 'horni koupelna 3.jpeg',     alt: 'Horní koupelna 3',    cat: 'interior' },
  { src: 'horni koupelna 4.jpeg',     alt: 'Horní koupelna 4',    cat: 'interior' },
  { src: 'schody.jpeg',               alt: 'Schody',              cat: 'interior' },
  { src: 'ostatni 1.jpeg',            alt: 'Ostatní interiér',    cat: 'interior' },
  { src: 'exterier-leto.jpg',         alt: 'Exteriér — léto',     cat: 'exterior' },
  { src: 'exterier zima.jpeg',        alt: 'Exteriér — zima',     cat: 'exterior' },
  { src: 'terasa.jpeg',               alt: 'Terasa',              cat: 'exterior' },
  { src: 'vchod.jpg',                 alt: 'Vchod',               cat: 'exterior' },
  { src: 'zimni priroda.jpeg',        alt: 'Zimní příroda',       cat: 'surroundings' },
  { src: 'sjezdovka nedaleko.jpeg',   alt: 'Sjezdovka v okolí',   cat: 'surroundings' },
]

const FILTERS = [
  { key: 'all',          label: 'Vše' },
  { key: 'interior',     label: 'Interiér' },
  { key: 'exterior',     label: 'Exteriér' },
  { key: 'surroundings', label: 'Okolí' },
]

export default function Gallery() {
  const [filter,  setFilter]  = useState('all')
  const [lbIndex, setLbIndex] = useState(null)

  const visible = filter === 'all' ? ALL_IMAGES : ALL_IMAGES.filter(i => i.cat === filter)

  const handleFilter = (key) => { setFilter(key); setLbIndex(null) }
  const openLb  = useCallback((i) => setLbIndex(i), [])
  const closeLb = useCallback(() => setLbIndex(null), [])
  const navLb   = useCallback((dir) => setLbIndex(i => (i + dir + visible.length) % visible.length), [visible.length])

  return (
    <section id="gallery" className="py-24 bg-warm">
      <div className="max-w-6xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[3px] text-accent mb-3">Fotogalerie</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-stone-900">
            Prohlédněte si naši chatu
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => handleFilter(f.key)}
              className={`text-sm font-medium px-5 py-2 rounded-full border transition-all ${
                filter === f.key
                  ? 'bg-accent border-accent text-white'
                  : 'border-stone-300 text-stone-500 hover:border-accent hover:text-accent'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {visible.map((image, i) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="break-inside-avoid mb-3 cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => openLb(i)}>
              <img src={img(image.src)} alt={image.alt} loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Plus size={28} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lbIndex !== null && (
        <Lightbox images={visible} index={lbIndex} onClose={closeLb} onNav={navLb} />
      )}
    </section>
  )
}
