import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollProgress from './components/common/ScrollProgress';
import CustomCursor from './components/common/CustomCursor';
import Home from './pages/Home';
import AboutPage from './pages/About';
import NotFound from './pages/NotFound';
import CalculatorPage from './pages/CalculatorPage';
import ConstructionIntro from './components/intro/ConstructionIntro';

/**
 * RAMASHISH Civil Construction
 * Master App with Cinematic Video Intro and Automatic Website Transition
 * Proprietor: Sandeep Sharma (25+ Years Civil Engineering Excellence)
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF7] text-[#0B1B35]">
          <div className="max-w-md p-6 bg-white border border-red-200 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-600 mb-4">{this.state.error?.message || 'An error occurred while loading this page.'}</p>
            <a href="/" className="inline-block px-4 py-2 bg-[#0B1B35] text-white rounded-lg text-xs font-bold">Back to Home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Inner layout wrapper – conditionally strips Navbar/Footer for the calculator page
function AppShell({ introCompleted, onIntroComplete, onReplayIntro }) {
  const location = useLocation();
  const isCalculator = location.pathname.startsWith('/house-construction-calculator');

  // Block home page rendering while intro is active so browser focuses resources on video
  if (!introCompleted && !isCalculator) {
    return <ConstructionIntro onComplete={onIntroComplete} onSkip={onIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#071B36] flex flex-col font-sans selection:bg-[#C99A32] selection:text-white">
      {/* Global site-wide background image — fixed behind all sections */}
      {!isCalculator && (
        <div className="fixed inset-0 z-0 pointer-events-none select-none">
          <img
            src="/images/brand/hero-composite-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.65 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white/55" />
        </div>
      )}

      <CustomCursor />

      {!isCalculator && <ScrollProgress />}
      {!isCalculator && <ScrollToTop />}
      {!isCalculator && <Navbar onReplayIntro={onReplayIntro} />}

      <main className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/house-construction-calculator" element={<CalculatorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {!isCalculator && <Footer />}
    </div>
  );
}

export default function App() {
  // Intro plays once whenever user lands on the website
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  return (
    <Router>
      <AppShell
        introCompleted={introCompleted}
        onIntroComplete={handleIntroComplete}
        onReplayIntro={() => {
          setIntroCompleted(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </Router>
  );
}
