import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProof } from '../lib/store';
import { Lock, Unlock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/ThemeContext';

const PASSWORD = '7$1%0@';

const AddProof: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    content: '',
    tags: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    addProof({
      title: formData.title,
      author: formData.author || 'Anonymous',
      abstract: formData.abstract,
      content: formData.content,
      tags: tagsArray,
    });

    navigate('/');
  };

  const inputClass = isDark
    ? 'glass-input rounded-lg'
    : 'w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-stone-400 outline-none bg-white';

  const labelClass = `text-sm font-semibold uppercase tracking-wide ${
    isDark ? 'text-amber-500/60' : 'text-stone-700'
  }`;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
            isDark
              ? 'glass-card'
              : 'bg-white border border-stone-200'
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              isDark ? 'bg-amber-500/10' : 'bg-stone-100'
            }`}>
              <Lock size={32} className={isDark ? 'text-amber-400' : 'text-stone-400'} />
            </div>
          </div>
          <h2 className={`text-2xl font-bold text-center mb-2 font-serif ${
            isDark ? 'text-[#f0ead6]' : 'text-stone-900'
          }`}>Restricted Access</h2>
          <p className={`text-center mb-6 ${
            isDark ? 'text-[#8a8478]' : 'text-stone-500'
          }`}>Enter the secret key to contribute a proof.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 ${
                  isDark
                    ? 'glass-input rounded-lg'
                    : 'rounded-lg border border-stone-300 focus:ring-2 focus:ring-stone-400 focus:border-transparent outline-none'
                }`}
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                isDark
                  ? 'btn-golden'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              <Unlock size={18} className="mr-2" />
              Unlock
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-3xl font-bold font-serif mb-8 ${
          isDark ? 'text-[#f0ead6]' : 'text-stone-900'
        }`}>Contribute a New Proof</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className={inputClass}
                placeholder="e.g. The Infinity of Primes"
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                className={inputClass}
                placeholder="e.g. Euclid"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              className={inputClass}
              placeholder="e.g. Number Theory, Algebra"
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Abstract</label>
            <textarea
              rows={3}
              value={formData.abstract}
              onChange={e => setFormData({...formData, abstract: e.target.value})}
              className={`${inputClass} resize-none`}
              placeholder="Brief summary of the proof..."
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Content (LaTeX Supported)</label>
            <p className={`text-xs mb-2 ${isDark ? 'text-white/30' : 'text-stone-500'}`}>
              Use $$ for block math and $ for inline math.
            </p>
            <textarea
              rows={12}
              required
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className={`${inputClass} font-mono text-sm ${
                isDark ? '' : '!bg-stone-50'
              }`}
              placeholder={"## Theorem\n...\n\n## Proof\nLet $x$ be..."}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center transform hover:-translate-y-0.5 ${
                isDark
                  ? 'btn-golden'
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <Send size={18} className="mr-2" />
              Publish Proof
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProof;
