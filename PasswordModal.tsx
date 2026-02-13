import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/ThemeContext';

const PASSWORD = '7$1%0@';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Authentication Required',
  description = 'Enter the owner password to proceed.',
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setPasswordInput('');
      setError('');
      onSuccess();
    } else {
      setError('Incorrect password. Access denied.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleClose = () => {
    setPasswordInput('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              x: shaking ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
              isDark
                ? 'glass-card !bg-[rgba(15,20,40,0.85)]'
                : 'bg-white border border-stone-200'
            }`}
          >
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 transition-colors ${
                isDark ? 'text-white/30 hover:text-white/70' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex justify-center mb-5">
                <div className={`p-4 rounded-full border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/20'
                    : 'bg-amber-50 border-amber-100'
                }`}>
                  <Lock size={28} className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                </div>
              </div>

              <h2 className={`text-2xl font-bold text-center mb-2 font-serif ${
                isDark ? 'text-[#f0ead6]' : 'text-stone-900'
              }`}>
                {title}
              </h2>
              <p className={`text-center mb-6 text-sm ${
                isDark ? 'text-[#8a8478]' : 'text-stone-500'
              }`}>
                {description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <ShieldCheck
                    size={18}
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? 'text-white/30' : 'text-stone-400'
                    }`}
                  />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setError('');
                    }}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all ${
                      isDark
                        ? 'glass-input'
                        : 'border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-stone-50'
                    }`}
                    placeholder="Enter password"
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-sm text-center font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    isDark
                      ? 'btn-golden'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  <Lock size={16} />
                  Authenticate
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
