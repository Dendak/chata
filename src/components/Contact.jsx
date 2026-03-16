import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Send, Check } from 'lucide-react'
import { img } from '../utils/img'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', dates: '', message: '' })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', dates: '', message: '' })
    }, 4000)
  }

  const inputCls = "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
  const labelCls = "block text-[0.75rem] font-semibold text-stone-600 uppercase tracking-wider mb-1.5"

  return (
    <section id="contact" className="grid lg:grid-cols-2 min-h-[600px]">

      {/* Left — dark + image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative flex items-center overflow-hidden bg-dark">
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${img('exterier zima.jpeg')})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 to-dark/60" />

        <div className="relative z-10 p-10 lg:p-16 max-w-lg">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[3px] text-white/45 mb-4">Kontakt</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Napište<br />nám
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10">
            Máte zájem o rezervaci nebo dotaz? Neváhejte nás kontaktovat. Odpovíme co nejdříve.
          </p>

          <div className="space-y-5">
            {[
              { Icon: MapPin, label: 'Adresa', value: 'Lipno nad Vltavou 434, 382 78' },
              { Icon: Mail,   label: 'E-mail', value: 'info@chatalipno.cz' },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0"
                  style={{ color: 'rgb(212 117 90)' }}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white/75 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right — form */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="bg-warm flex items-center p-10 lg:p-16">
        <div className="w-full max-w-md">
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-8">Rezervační formulář</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Jméno *</label>
                <input type="text" required placeholder="Vaše jméno"
                  value={form.name} onChange={set('name')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>E-mail *</label>
                <input type="email" required placeholder="Váš e-mail"
                  value={form.email} onChange={set('email')} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Termín pobytu</label>
              <input type="text" placeholder="např. 15.3. – 22.3.2026"
                value={form.dates} onChange={set('dates')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Zpráva *</label>
              <textarea required rows={4} placeholder="Vaše zpráva…"
                value={form.message} onChange={set('message')}
                className={`${inputCls} resize-none`} />
            </div>
            <button type="submit"
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                sent
                  ? 'bg-emerald-500 text-white'
                  : 'bg-accent text-white hover:bg-accent/80 shadow-lg shadow-accent/20'
              }`}>
              {sent
                ? <><Check size={16} /> Zpráva odeslána!</>
                : <><Send size={16} /> Odeslat zprávu</>
              }
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
