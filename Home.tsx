import React, { useEffect, useState, useMemo } from 'react';
import { getProofs } from '../lib/store';
import { Proof } from '../lib/types';
import ProofCard from '../components/ProofCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';

const Home: React.FC = () => {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setProofs(getProofs());
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    proofs.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [proofs]);

  const filteredProofs = useMemo(() => {
    let result = proofs;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }
    return result;
  }, [proofs, searchQuery, selectedTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTag !== null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className={`text-4xl md:text-5xl font-bold font-serif mb-4 ${
          isDark ? 'text-[#f0ead6]' : 'text-stone-900'
        }`}>
          The Library of Proofs
        </h1>
        <p className={`text-lg max-w-2xl mx-auto font-serif italic ${
          isDark ? 'text-[#8a8478]' : 'text-stone-600'
        }`}>
          "Mathematics is the music of reason." — James Joseph Sylvester
        </p>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <div className={`rounded-2xl overflow-hidden transition-theme ${
          isDark
            ? 'glass-card'
            : 'bg-white border border-stone-200 shadow-sm'
        }`}>
          <div className="flex items-center px-4">
            <Search size={20} className={isDark ? 'text-white/30 shrink-0' : 'text-stone-400 shrink-0'} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search proofs by title, author, content, or tag…"
              className={`flex-1 px-3 py-4 bg-transparent outline-none ${
                isDark
                  ? 'text-[#e2ddd5] placeholder:text-white/25'
                  : 'text-stone-800 placeholder:text-stone-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10 text-white/30 hover:text-white/60' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-600'
                }`}
              >
                <X size={16} />
              </button>
            )}
            <div className={`w-px h-6 mx-2 ${isDark ? 'bg-white/10' : 'bg-stone-200'}`} />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium ${
                showFilters || selectedTag
                  ? isDark ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-50 text-amber-700'
                  : isDark ? 'hover:bg-white/5 text-white/40' : 'hover:bg-stone-100 text-stone-500'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {selectedTag && (
                <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                  isDark ? 'bg-amber-500 text-[#0a0e1a]' : 'bg-amber-600 text-white'
                }`}>
                  1
                </span>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && allTags.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className={`px-5 pb-4 pt-2 border-t ${
                  isDark ? 'border-white/5' : 'border-stone-100'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Filter size={14} className={isDark ? 'text-white/30' : 'text-stone-400'} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-white/40' : 'text-stone-500'
                    }`}>
                      Filter by Tag
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? null : tag)
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedTag === tag
                            ? isDark
                              ? 'bg-amber-500 text-[#0a0e1a] border-amber-500 shadow-md shadow-amber-500/20'
                              : 'bg-stone-900 text-white border-stone-900 shadow-md'
                            : isDark
                              ? 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:bg-white/10'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-100'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mt-3 px-1"
          >
            <p className={`text-sm ${isDark ? 'text-[#8a8478]' : 'text-stone-500'}`}>
              Showing{' '}
              <span className={`font-semibold ${isDark ? 'text-[#e2ddd5]' : 'text-stone-800'}`}>
                {filteredProofs.length}
              </span>{' '}
              of{' '}
              <span className={`font-semibold ${isDark ? 'text-[#e2ddd5]' : 'text-stone-800'}`}>
                {proofs.length}
              </span>{' '}
              proof{proofs.length !== 1 ? 's' : ''}
              {selectedTag && (
                <span>
                  {' '}in{' '}
                  <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    {selectedTag}
                  </span>
                </span>
              )}
            </p>
            <button
              onClick={clearFilters}
              className={`text-xs font-medium underline underline-offset-2 transition-colors ${
                isDark ? 'text-[#8a8478] hover:text-amber-400' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Clear all
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Proof Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProofs.map((proof, index) => (
            <ProofCard key={proof.id} proof={proof} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty States */}
      {filteredProofs.length === 0 && proofs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDark ? 'bg-white/5' : 'bg-stone-100'
          }`}>
            <Search size={24} className={isDark ? 'text-white/30' : 'text-stone-400'} />
          </div>
          <h3 className={`text-lg font-serif font-semibold mb-2 ${
            isDark ? 'text-[#e2ddd5]' : 'text-stone-700'
          }`}>
            No proofs found
          </h3>
          <p className={`mb-4 ${isDark ? 'text-[#8a8478]' : 'text-stone-500'}`}>
            No proofs match your search{selectedTag ? ` in "${selectedTag}"` : ''}.
          </p>
          <button
            onClick={clearFilters}
            className={`text-sm font-medium underline underline-offset-2 transition-colors ${
              isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-800'
            }`}
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {proofs.length === 0 && (
        <div className={`text-center py-20 ${isDark ? 'text-[#8a8478]' : 'text-stone-500'}`}>
          <p>No proofs found in the library yet.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
