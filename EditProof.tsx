import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProofById, updateProof } from '../lib/store';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import PasswordModal from '../components/PasswordModal';
import { useTheme } from '../lib/ThemeContext';

const EditProof: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    if (id && isAuthenticated) {
      const proof = getProofById(id);
      if (proof) {
        setFormData({
          title: proof.title,
          author: proof.author,
          abstract: proof.abstract,
          content: proof.content,
          tags: proof.tags.join(', '),
        });
      } else {
        setNotFound(true);
      }
    }
  }, [id, isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData.title || !formData.content) return;

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    updateProof(id, {
      title: formData.title,
      author: formData.author || 'Anonymous',
      abstract: formData.abstract,
      content: formData.content,
      tags: tagsArray,
    });

    navigate(`/proof/${id}`);
  };

  const inputClass = isDark
    ? 'glass-input rounded-lg w-full px-4 py-3'
    : 'w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-stone-400 outline-none bg-white';

  const labelClass = `text-sm font-semibold uppercase tracking-wide ${
    isDark ? 'text-amber-500/60' : 'text-stone-700'
  }`;

  if (!isAuthenticated) {
    return (
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          navigate(-1);
        }}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowPasswordModal(false);
        }}
        title="Edit Proof"
        description="Owner authentication is required to edit a proof."
      />
    );
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className={`text-2xl font-serif font-bold mb-4 ${
          isDark ? 'text-[#f0ead6]' : 'text-stone-900'
        }`}>
          Proof Not Found
        </h2>
        <Link to="/" className={isDark ? 'text-amber-400 underline' : 'text-amber-700 underline'}>
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to={`/proof/${id}`}
          className={`inline-flex items-center mb-8 transition-colors group ${
            isDark ? 'text-[#8a8478] hover:text-amber-400' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Proof
        </Link>

        <h1 className={`text-3xl font-bold font-serif mb-8 ${
          isDark ? 'text-[#f0ead6]' : 'text-stone-900'
        }`}>
          Edit Proof
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. The Infinity of Primes"
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
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
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className={inputClass}
              placeholder="e.g. Number Theory, Algebra"
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Abstract</label>
            <textarea
              rows={3}
              value={formData.abstract}
              onChange={(e) =>
                setFormData({ ...formData, abstract: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className={`${inputClass} font-mono text-sm ${
                isDark ? '' : '!bg-stone-50'
              }`}
              placeholder={"## Theorem\n...\n\n## Proof\nLet $x$ be..."}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link
              to={`/proof/${id}`}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'border border-white/10 text-[#b0a898] hover:bg-white/5'
                  : 'border border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center transform hover:-translate-y-0.5 ${
                isDark
                  ? 'btn-golden'
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProof;
