import { motion } from 'framer-motion'

export default function MapSection() {
  return (
    <section id="map">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 text-center bg-[#FAFAF7]">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[3px] text-accent mb-3">Poloha</p>
        <h2 className="font-serif text-4xl font-bold text-stone-900 mb-2">Kde nás najdete</h2>
        <p className="text-stone-400 text-sm">Lipno nad Vltavou 434, 382 78</p>
      </motion.div>
      <div style={{ aspectRatio: '21/9' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391.92837165870264!2d14.241190352296751!3d48.63722335064525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47737ace11781b51%3A0x278cd9644998c038!2sLipno%20nad%20Vltavou%20434%2C%20382%2078%20Lipno%20nad%20Vltavou!5e0!3m2!1scs!2scz!4v1716455696683!5m2!1scs!2scz"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Poloha chaty"
        />
      </div>
    </section>
  )
}
