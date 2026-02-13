import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViewProof from './pages/ViewProof';
import AddProof from './pages/AddProof';
import EditProof from './pages/EditProof';
import Stars from './components/Stars';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans relative ${isDark ? 'dark-bg' : 'bg-[#fdfbf7]'}`}>
      {isDark && <Stars />}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proof/:id" element={<ViewProof />} />
            <Route path="/add" element={<AddProof />} />
            <Route path="/edit/:id" element={<EditProof />} />
          </Routes>
        </main>

        <footer className={`py-8 text-center text-sm border-t transition-theme ${
          isDark
            ? 'text-[#7a7468] border-white/5'
            : 'text-stone-400 border-stone-200'
        }`}>
          <p className="font-serif italic opacity-80">
            "Quod erat demonstrandum" — © {new Date().getFullYear()} Q.E.D. Library
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
