import { motion } from 'framer-motion'

const items = [
  { num: '4',            label: 'Ložnice' },
  { num: '2',            label: 'Koupelny' },
  { num: '8',            label: 'Hostů max.' },
  { num: '5', suf: 'min', label: 'Na sjezdovku' },
]

export default function Stats() {
  return (
    <section id="stats" className="bg-dark py-14">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-wrap items-center justify-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {items.map(({ num, suf, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center px-10 py-5 min-w-[160px]">
              <span className="font-serif text-5xl font-bold text-white leading-none mb-1">
                {num}
                {suf && (
                  <small className="font-sans text-base font-normal ml-1" style={{ color: 'rgb(212 117 90)' }}>
                    {suf}
                  </small>
                )}
              </span>
              <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/35 mt-1">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
