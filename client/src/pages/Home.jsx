import { useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import BrandsCarousel from '../components/BrandsCarousel'
import TherapeuticAreas from '../components/TherapeuticAreas'
import GlobalPresence from '../components/GlobalPresence'
import LifeAtTasmed from '../components/LifeAtTasmed'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ background: '#FCFAF7', minHeight: '100vh' }}>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Navbar visible={loaded} />
      <Hero visible={loaded} />
      <AboutSection />
      <BrandsCarousel />
      <TherapeuticAreas />
      <GlobalPresence />
      <LifeAtTasmed />
    </div>
  )
}
