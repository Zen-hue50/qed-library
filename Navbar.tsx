import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, PlusCircle, Sigma, Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-theme ${
      isDark ? 'glass-nav' : 'backdrop-blur-md bg-[#fdfbf7]/80 border-b border-stone-200'
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className={`p-2 rounded-lg transition-all ${
            isDark
              ? 'bg-gradient-to-br from-amber-500/20 to-amber-700/20 text-amber-400 border border-amber-500/20 group-hover:from-amber-500/30 group-hover:to-amber-700/30'
              : 'bg-stone-900 text-white group-hover:bg-stone-800'
          }`}>
            <Sigma size={20} />
          </div>
          <span className={`font-serif text-2xl font-bold tracking-tight ${
            isDark ? 'text-[#f0ead6]' : 'text-stone-900'
          }`}>Q.E.D.</span>
        </Link>

        <div className="flex items-center space-x-5">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
              isActive('/')
                ? isDark ? 'text-amber-400' : 'text-stone-900'
                : isDark ? 'text-[#8a8478] hover:text-amber-400' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <FileText size={16} />
            <span>Proofs</span>
          </Link>
          <Link
            to="/add"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
              isActive('/add')
                ? isDark ? 'text-amber-400' : 'text-stone-900'
                : isDark ? 'text-[#8a8478] hover:text-amber-400' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <PlusCircle size={16} />
            <span>Contribute</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
            aria-label="Toggle dark mode"
          >
            <div className="toggle-circle flex items-center justify-center">
              {isDark ? (
                <Moon size={12} className="text-indigo-900" />
              ) : (
                <Sun size={12} className="text-amber-800" />
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
