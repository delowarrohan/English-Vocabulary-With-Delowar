import React, { useState, useEffect } from 'react';
import { WordItem } from '../types';
import { X, Check } from 'lucide-react';

interface WordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (wordData: Omit<WordItem, 'id'>) => void;
  initialData?: WordItem | null;
}

export const WordModal: React.FC<WordModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [present, setPresent] = useState('');
  const [meaning, setMeaning] = useState('');
  const [past, setPast] = useState('');
  const [pastParticiple, setPastParticiple] = useState('');
  const [isVerb, setIsVerb] = useState(true);

  useEffect(() => {
    if (initialData) {
      setPresent(initialData.present || '');
      setMeaning(initialData.meaning || '');
      setPast(initialData.past || '');
      setPastParticiple(initialData.pastParticiple || '');
      setIsVerb(initialData.isVerb);
    } else {
      setPresent('');
      setMeaning('');
      setPast('');
      setPastParticiple('');
      setIsVerb(true);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!present.trim() || !meaning.trim()) return;

    onSave({
      present: present.trim(),
      meaning: meaning.trim(),
      past: isVerb ? past.trim() : '',
      pastParticiple: isVerb ? pastParticiple.trim() : '',
      isVerb,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <h3 className="font-semibold text-sm">
            {initialData ? 'Edit Word Entry' : 'Add New Dictionary Entry'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Verb Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
            <div>
              <span className="font-semibold text-slate-800 block">Is this a Verb?</span>
              <span className="text-[11px] text-slate-500">
                Verbs require Past and Past Participle forms.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isVerb}
                onChange={(e) => {
                  setIsVerb(e.target.checked);
                  if (!e.target.checked) {
                    setPast('');
                    setPastParticiple('');
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Present */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Present / English Word <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Awake"
              value={present}
              onChange={(e) => setPresent(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Meaning */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Meaning (বাংলা অর্থ) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. জাগ্রত হওয়া"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-sans"
              style={{ fontFamily: "'Tiro Bangla', 'Kalpurush', 'Noto Sans Bengali', sans-serif" }}
            />
          </div>

          {/* Past Form */}
          {isVerb && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Past Form
              </label>
              <input
                type="text"
                placeholder="e.g. Awoke"
                value={past}
                onChange={(e) => setPast(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Past Participle Form */}
          {isVerb && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Past Participle Form
              </label>
              <input
                type="text"
                placeholder="e.g. Awoken"
                value={pastParticiple}
                onChange={(e) => setPastParticiple(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {!isVerb && (
            <p className="text-[11px] text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
              Note: Since this is a non-verb, Past and Past Participle fields will remain blank.
            </p>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold inline-flex items-center gap-1 shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
