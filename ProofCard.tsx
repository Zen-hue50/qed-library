import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Hash, ChevronRight } from 'lucide-react';
import { Proof } from '../lib/types';
import { motion } from 'framer-motion';
import { useTheme } from '../lib/ThemeContext';

interface ProofCardProps {
  proof: Proof;
  index: number;
}

const ProofCard: React.FC<ProofCardProps> = ({ proof, index }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link
        to={`/proof/${proof.id}`}
        className={`block rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 ${
          isDark
            ? 'glass-card rounded-xl'
            : 'bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className={`text-xl font-bold font-serif leading-snug transition-colors ${
              isDark
                ? 'text-[#f0ead6] group-hover:text-amber-400'
                : 'text-stone-900 group-hover:text-amber-700'
            }`}>
              {proof.title}
            </h3>
            <div className={`flex items-center space-x-2 text-xs font-medium uppercase tracking-wide ${
              isDark ? 'text-[#8a8478]' : 'text-stone-500'
            }`}>
              <span>{proof.author}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{new Date(proof.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className={`transition-colors ${
            isDark ? 'text-white/15 group-hover:text-amber-400' : 'text-stone-300 group-hover:text-amber-600'
          }`}>
            <ChevronRight size={20} />
          </div>
        </div>

        <p className={`line-clamp-3 mb-6 font-proof text-base leading-relaxed font-medium ${
          isDark ? 'text-[#b0a898]' : 'text-stone-600'
        }`}>
          {proof.abstract}
        </p>

        <div className="flex flex-wrap gap-2">
          {proof.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isDark
                  ? 'bg-white/5 text-amber-400/80 border border-white/10'
                  : 'bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              <Hash size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProofCard;
