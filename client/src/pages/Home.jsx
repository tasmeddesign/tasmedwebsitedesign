import { useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import TherapeuticAreas from '../components/TherapeuticAreas'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ background: '#f0eeea', minHeight: '100vh' }}>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <Navbar visible={loaded} />
      <Hero visible={loaded} />
      <AboutSection />
      <TherapeuticAreas />
    </div>
  )
}
