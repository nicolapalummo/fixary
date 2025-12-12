import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Problem } from "./components/Problem"
import { HowItWorks } from "./components/HowItWorks"
import { Privacy } from "./components/Privacy"
import { Final } from "./components/Final"
import { FlowAnimation } from "./components/FlowAnimation"
import { HybridEngine } from "./components/HybridEngine"
import LiquidEther from "./components/LiquidEther"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={13}
          cursorSize={70}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          BFECC={false}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="relative z-10 transition-colors">
        <Navbar />
        <Hero />
        <Problem />
        <HowItWorks />
        <FlowAnimation />
        <HybridEngine />
        <Privacy />
        <Final />
        <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
          <p>&copy; 2025 Fixary. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

      </Routes>
    </Router>
  )
}

export default App
