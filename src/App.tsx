import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App