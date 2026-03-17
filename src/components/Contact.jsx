import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Send, Check, Phone, AlertCircle } from 'lucide-react'
import { img } from '../utils/img'
import DateRangePicker from './DateRangePicker'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [dates, setDates] = useState({ start: null, end: null })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    // clear error on change
    if (errors[key]) setErrors(err => ({ ...err, [key]: null }))
  }

  const touch = (key) => () => setTouched(t => ({ ...t, [key]: true }))

  const validate = (f = form) => {
    const e = {}
    if (!f.name.trim()) e.name = 'Jméno je povinné'
    // at least one contact method
    if (!f.email.trim() && !f.phone.trim()) {
      e.contact = 'Vyplňte alespoň e-mail nebo telefon'
    } else {
      if (f.email.trim() && !EMAIL_RE.test(f.email.trim()))
        e.email = 'Neplatný formát e-mailu'
      if (f.phone.trim() && !PHONE_RE.test(f.phone.trim()))
        e.phone = 'Neplatný formát telefonu'
    }
    if (!f.message.trim()) e.message = 'Zpráva je povinná'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      setTouched({ name: true, email: true, phone: true, message: true, contact: true })
      return
    }
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', phone: '', message: '' })
      setDates({ start: null, end: null })
      setErrors({})
      setTouched({})
    }, 4000)
  }

  const inputCls = (key) => `w-full bg-white border rounded-xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all ${
    touched[key] && errors[key]
      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
      : 'border-stone-200 focus:border-accent focus:ring-accent/10 hover:border-stone-300'
  }`
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
              { Icon: Phone,  label: 'Telefon', value: '+420 123 456 789' },
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
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Jméno */}
            <div>
              <label className={labelCls}>Jméno *</label>
              <input type="text" placeholder="Vaše jméno"
                value={form.name} onChange={set('name')} onBlur={touch('name')}
                className={inputCls('name')} />
              <FieldError show={touched.name} msg={errors.name} />
            </div>

            {/* E-mail + Telefon */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>E-mail</label>
                <input type="email" placeholder="vas@email.cz"
                  value={form.email} onChange={set('email')} onBlur={touch('email')}
                  className={inputCls('email')} />
                <FieldError show={touched.email} msg={errors.email} />
              </div>
              <div>
                <label className={labelCls}>Telefon</label>
                <input type="tel" placeholder="+420 123 456 789"
                  value={form.phone} onChange={set('phone')} onBlur={touch('phone')}
                  className={inputCls('phone')} />
                <FieldError show={touched.phone} msg={errors.phone} />
              </div>
            </div>

            {/* contact error */}
            {touched.contact && errors.contact && (
              <div className="flex items-center gap-2 text-xs text-red-500 -mt-1 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle size={13} className="flex-shrink-0" />
                {errors.contact}
              </div>
            )}

            {/* Termín */}
            <div>
              <label className={labelCls}>Termín pobytu</label>
              <DateRangePicker value={dates} onChange={setDates} />
            </div>

            {/* Zpráva */}
            <div>
              <label className={labelCls}>Zpráva *</label>
              <textarea rows={4} placeholder="Vaše zpráva…"
                value={form.message} onChange={set('message')} onBlur={touch('message')}
                className={`${inputCls('message')} resize-none`} />
              <FieldError show={touched.message} msg={errors.message} />
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

function FieldError({ show, msg }) {
  if (!show || !msg) return null
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500">
      <AlertCircle size={11} className="flex-shrink-0" />
      {msg}
    </p>
  )
}
