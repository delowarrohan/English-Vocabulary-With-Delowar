import React from 'react';
import { Search, Printer, Plus, Download, SlidersHorizontal, RefreshCw, Layers } from 'lucide-react';
import { DensityMode } from '../types';

interface HeaderControlsProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
  verbFilter: 'all' | 'verbs' | 'non-verbs';
  setVerbFilter: (filter: 'all' | 'verbs' | 'non-verbs') => void;
  density: DensityMode;
  setDensity: (d: DensityMode) => void;
  totalCount: number;
  filteredCount: number;
  onPrint: () => void;
  onAddWord: () => void;
  onExport: () => void;
  onReset: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLetter,
  setSelectedLetter,
  verbFilter,
  setVerbFilter,
  density,
  setDensity,
  totalCount,
  filteredCount,
  onPrint,
  onAddWord,
  onExport,
  onReset,
}) => {
  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <header className="no-print bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              English Dictionary & Verb Forms
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                High Density View
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              ইংরেজি শব্দভাণ্ডার ও ক্রিয়ার রূপ (Present, Meaning, Past, Past Participle)
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            title="Print friendly document or save to PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print List</span>
          </button>

          <button
            onClick={onAddWord}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Word</span>
          </button>

          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Reset dataset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* High Density Filter & Toolbar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          {/* Search Input & Verb Filter */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[220px] max-w-sm flex-1">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search English or Bengali..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-md bg-slate-900 p-0.5 border border-slate-800">
              <button
                onClick={() => setVerbFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  verbFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Words ({totalCount})
              </button>
              <button
                onClick={() => setVerbFilter('verbs')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  verbFilter === 'verbs'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Verbs Only
              </button>
              <button
                onClick={() => setVerbFilter('non-verbs')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  verbFilter === 'non-verbs'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Non-Verbs
              </button>
            </div>

            {/* Density Selector */}
            <div className="flex items-center gap-1.5 ml-auto lg:ml-0 text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Density:</span>
              <div className="inline-flex rounded-md bg-slate-900 p-0.5 border border-slate-800">
                <button
                  onClick={() => setDensity('high')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    density === 'high' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Compact
                </button>
                <button
                  onClick={() => setDensity('standard')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    density === 'standard' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setDensity('comfortable')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    density === 'comfortable' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Spacious
                </button>
              </div>
            </div>
          </div>

          {/* Results Badge */}
          <div className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
            Showing <span className="text-emerald-400 font-semibold">{filteredCount}</span> of {totalCount} items
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/60 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-medium text-slate-400 mr-1 uppercase tracking-wider">A-Z:</span>
          {alphabet.map((letter) => {
            const isActive = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2 py-0.5 text-[11px] rounded transition-colors font-mono ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
