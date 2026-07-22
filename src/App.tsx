import { useState, useMemo, useEffect } from 'react';
import { WordItem, DensityMode } from './types';
import { INITIAL_WORDS } from './data/wordsData';
import { HeaderControls } from './components/HeaderControls';
import { DictionaryTable } from './components/DictionaryTable';
import { WordModal } from './components/WordModal';
import { PrintHeader } from './components/PrintHeader';
import { BookOpen, Info } from 'lucide-react';

const STORAGE_KEY = 'english_dictionary_words_v3_3000';

export default function App() {
  const [words, setWords] = useState<WordItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_WORDS.length) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_WORDS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [verbFilter, setVerbFilter] = useState<'all' | 'verbs' | 'non-verbs'>('all');
  const [density, setDensity] = useState<DensityMode>('high');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    } catch {
      // Ignore storage errors
    }
  }, [words]);

  // Filtered dataset
  const filteredWords = useMemo(() => {
    return words.filter((item) => {
      // Letter filter
      if (selectedLetter !== 'All') {
        if (!item.present.toUpperCase().startsWith(selectedLetter)) {
          return false;
        }
      }

      // Verb filter
      if (verbFilter === 'verbs' && !item.isVerb) return false;
      if (verbFilter === 'non-verbs' && item.isVerb) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const inPresent = item.present.toLowerCase().includes(query);
        const inPronunciation = item.pronunciation ? item.pronunciation.toLowerCase().includes(query) : false;
        const inMeaning = item.meaning.toLowerCase().includes(query);
        const inPast = item.past.toLowerCase().includes(query);
        const inPastParticiple = item.pastParticiple.toLowerCase().includes(query);
        return inPresent || inPronunciation || inMeaning || inPast || inPastParticiple;
      }

      return true;
    });
  }, [words, selectedLetter, verbFilter, searchTerm]);

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleOpenAddModal = () => {
    setEditingWord(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (word: WordItem) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const handleDeleteWord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this word entry?')) {
      setWords((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const handleSaveWord = (wordData: Omit<WordItem, 'id'>) => {
    if (editingWord) {
      setWords((prev) =>
        prev.map((w) => (w.id === editingWord.id ? { ...wordData, id: editingWord.id } : w))
      );
    } else {
      const newWord: WordItem = {
        ...wordData,
        id: Date.now().toString(),
      };
      setWords((prev) => [newWord, ...prev]);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset dictionary data back to default 3,000 words dataset?')) {
      setWords(INITIAL_WORDS);
      setSearchTerm('');
      setSelectedLetter('All');
      setVerbFilter('all');
    }
  };

  const handleExportCSV = () => {
    const headers = ['No', 'Present', 'Meaning', 'Past', 'Past Participle'];
    const rows = filteredWords.map((item, index) => [
      index + 1,
      `"${item.present.replace(/"/g, '""')}"`,
      `"${item.meaning.replace(/"/g, '""')}"`,
      `"${item.past.replace(/"/g, '""')}"`,
      `"${item.pastParticiple.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `english_bengali_dictionary_3000words_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Controls */}
      <HeaderControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        verbFilter={verbFilter}
        setVerbFilter={setVerbFilter}
        density={density}
        setDensity={setDensity}
        totalCount={words.length}
        filteredCount={filteredWords.length}
        onPrint={handlePrint}
        onAddWord={handleOpenAddModal}
        onExport={handleExportCSV}
        onReset={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 space-y-4">
        {/* Printable Header - Visible ONLY in Print */}
        <PrintHeader totalCount={filteredWords.length} />

        {/* High Density Banner / Information */}
        <div className="no-print bg-white p-3 sm:p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">3,000 Words English-Bengali Dictionary</span>
              <span className="text-slate-500 block sm:inline sm:ml-2">
                Sequential serial numbers from 1. Verb conjugations (Past & Past Participle) displayed automatically for verbs.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            <span>High Density Theme • Print Friendly</span>
          </div>
        </div>

        {/* The Dictionary Table */}
        <DictionaryTable
          words={filteredWords}
          density={density}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteWord}
          searchTerm={searchTerm}
        />
      </main>

      {/* Footer (Hidden on print) */}
      <footer className="no-print border-t border-slate-200 bg-white py-3 px-4 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© English-Bengali Dictionary • High Density Design System (3,000 Words)</p>
          <p className="font-mono text-[11px]">
            Columns: <span className="text-slate-800 font-semibold">No | Present | Meaning | Past | Past Participle</span>
          </p>
        </div>
      </footer>

      {/* Add / Edit Word Modal */}
      <WordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWord}
        initialData={editingWord}
      />
    </div>
  );
}
