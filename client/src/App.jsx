import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DivisionPage from './pages/DivisionPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/division/:area" element={<DivisionPage />} />
    </Routes>
  )
}

export default App
