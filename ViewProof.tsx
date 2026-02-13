import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProofById, deleteProof } from '../lib/store';
import { Proof } from '../lib/types';
import MathRenderer from '../components/MathRenderer';
import PasswordModal from '../components/PasswordModal';
import { ArrowLeft, Calendar, User, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/ThemeContext';

const ViewProof: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proof, setProof] = useState<Proof | null>(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getProofById(id);
      if (found) {
        setProof(found);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleEditAuth = () => {
    setShowEditModal(false);
    navigate(`/edit/${id}`);
  };

  const handleDeleteAuth = () => {
    setShowDeleteModal(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (id) {
      deleteProof(id);
      navigate('/');
    }
  };

  if (!proof) return null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className={`inline-flex items-center transition-colors group ${
              isDark ? 'text-[#8a8478] hover:text-amber-400' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                isDark
                  ? 'text-[#b0a898] bg-white/5 border border-white/10 hover:bg-white/10 hover:text-amber-400 hover:border-amber-500/20'
                  : 'text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 hover:text-amber-700'
              }`}
            >
              <Pencil size={15} />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
                isDark
                  ? 'text-[#b0a898] bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400'
                  : 'text-stone-600 bg-white border border-stone-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
              }`}
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <header className={`mb-10 pb-8 border-b ${isDark ? 'border-white/8' : 'border-stone-200'}`}>
          <div className="flex flex-wrap gap-2 mb-4">
            {proof.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded ${
                  isDark
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/15'
                    : 'text-amber-700 bg-amber-50'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight ${
            isDark ? 'text-[#f0ead6]' : 'text-stone-900'
          }`}>
            {proof.title}
          </h1>

          <div className={`flex items-center space-x-6 text-sm ${
            isDark ? 'text-[#8a8478]' : 'text-stone-500'
          }`}>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{proof.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(proof.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-none">
          <div className={`p-8 rounded-xl mb-8 transition-theme ${
            isDark
              ? 'glass-card'
              : 'bg-white border border-stone-200 shadow-sm'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 font-sans ${
              isDark ? 'text-amber-500/60' : 'text-stone-400'
            }`}>
              Abstract
            </h3>
            <p className={`italic font-proof text-base leading-relaxed font-medium ${
              isDark ? 'text-[#c4bdb0]' : 'text-stone-700'
            }`}>
              {proof.abstract}
            </p>
          </div>

          <div className={`p-8 rounded-xl transition-theme ${
            isDark ? 'glass-card' : 'bg-white border border-stone-200 shadow-sm'
          }`}>
            <MathRenderer content={proof.content} />
          </div>
        </div>
      </motion.div>

      <PasswordModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditAuth}
        title="Edit Proof"
        description="Enter the owner password to edit this proof."
      />

      <PasswordModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={handleDeleteAuth}
        title="Delete Proof"
        description="Enter the owner password to delete this proof."
      />

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 ${
                isDark
                  ? 'glass-card !bg-[rgba(15,20,40,0.9)]'
                  : 'bg-white border border-stone-200'
              }`}
            >
              <div className="flex justify-center mb-5">
                <div className={`p-4 rounded-full border ${
                  isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'
                }`}>
                  <AlertTriangle size={28} className="text-red-500" />
                </div>
              </div>

              <h2 className={`text-2xl font-bold text-center mb-2 font-serif ${
                isDark ? 'text-[#f0ead6]' : 'text-stone-900'
              }`}>
                Confirm Deletion
              </h2>
              <p className={`text-center mb-2 text-sm ${
                isDark ? 'text-[#8a8478]' : 'text-stone-500'
              }`}>
                Are you sure you want to delete this proof?
              </p>
              <p className={`text-center font-serif font-semibold mb-6 text-lg ${
                isDark ? 'text-[#e2ddd5]' : 'text-stone-700'
              }`}>
                "{proof.title}"
              </p>
              <p className="text-center text-red-400 text-xs mb-6 font-medium">
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isDark
                      ? 'border border-white/10 text-[#b0a898] hover:bg-white/5'
                      : 'border border-stone-300 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ViewProof;
