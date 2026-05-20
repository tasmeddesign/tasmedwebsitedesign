import { useState, useRef } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import BrandsCarousel from '../components/BrandsCarousel'
import TherapeuticAreas from '../components/TherapeuticAreas'
import GlobalPresence from '../components/GlobalPresence'
import LifeAtTasmed from '../components/LifeAtTasmed'

export default function Home() {
  const skipLoader = useRef(!!sessionStorage.getItem('tasmed_loaded'))
  const [loaded, setLoaded] = useState(skipLoader.current)

  const handleLoaded = () => {
    sessionStorage.setItem('tasmed_loaded', '1')
    setLoaded(true)
  }

  return (
    <div style={{ background: '#FCFAF7', minHeight: '100vh' }}>
      {!skipLoader.current && <LoadingScreen onComplete={handleLoaded} />}
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
