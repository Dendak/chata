import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Stats       from './components/Stats'
import About       from './components/About'
import Gallery     from './components/Gallery'
import Pricing     from './components/Pricing'
import Contact     from './components/Contact'
import MapSection  from './components/MapSection'
import Footer      from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Gallery />
      <Pricing />
      <Contact />
      <MapSection />
      <Footer />
    </>
  )
}
