import React, { useState, useMemo } from 'react';
import { WordItem, DensityMode } from '../types';
import { Edit2, Trash2, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

interface DictionaryTableProps {
  words: WordItem[];
  density: DensityMode;
  onEdit: (word: WordItem) => void;
  onDelete: (id: string) => void;
  searchTerm?: string;
}

export const DictionaryTable: React.FC<DictionaryTableProps> = ({
  words,
  density,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(100);

  // Reset to page 1 whenever total words change (e.g. search filter)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [words.length]);

  // Determine padding classes based on density selection
  const paddingClass =
    density === 'high'
      ? 'py-1.5 px-3 text-xs'
      : density === 'comfortable'
      ? 'py-3.5 px-4 text-sm'
      : 'py-2.5 px-3.5 text-sm';

  const headerPaddingClass =
    density === 'high' ? 'py-2 px-3' : density === 'comfortable' ? 'py-3 px-4' : 'py-2.5 px-3.5';

  const totalWords = words.length;
  const isAll = pageSize === 'all';
  const effectivePageSize = isAll ? totalWords || 1 : (pageSize as number);
  const totalPages = Math.ceil(totalWords / effectivePageSize) || 1;

  const displayedWords = useMemo(() => {
    if (isAll) return words;
    const start = (currentPage - 1) * effectivePageSize;
    return words.slice(start, start + effectivePageSize);
  }, [words, currentPage, effectivePageSize, isAll]);

  const startIndex = isAll ? 1 : (currentPage - 1) * effectivePageSize + 1;
  const endIndex = isAll ? totalWords : Math.min(currentPage * effectivePageSize, totalWords);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Table Container */}
      <div className="w-full bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-spacing-0">
            <thead>
              <tr className="bg-slate-900 text-slate-100 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
                <th scope="col" className={`${headerPaddingClass} w-14 text-center border-r border-slate-800 font-mono`}>
                  No
                </th>
                <th scope="col" className={`${headerPaddingClass} w-1/4 border-r border-slate-800`}>
                  Present
                </th>
                <th scope="col" className={`${headerPaddingClass} w-1/3 border-r border-slate-800`}>
                  Meaning
                </th>
                <th scope="col" className={`${headerPaddingClass} w-1/5 border-r border-slate-800`}>
                  Past
                </th>
                <th scope="col" className={`${headerPaddingClass} w-1/5 border-r border-slate-800`}>
                  Past Participle
                </th>
                <th scope="col" className={`${headerPaddingClass} w-16 text-center no-print`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
              {words.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                    <p className="font-medium">No matching vocabulary words found.</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing your search or filters.</p>
                  </td>
                </tr>
              ) : (
                displayedWords.map((item, index) => {
                  const serialNo = isAll ? index + 1 : (currentPage - 1) * effectivePageSize + index + 1;
                  const isEven = index % 2 === 0;

                  return (
                    <tr
                      key={item.id}
                      className={`group transition-colors hover:bg-indigo-50/60 ${
                        isEven ? 'bg-white' : 'bg-slate-50/70'
                      }`}
                    >
                      {/* 1. Serial Number */}
                      <td
                        className={`${paddingClass} font-mono font-semibold text-center text-slate-500 border-r border-slate-200 group-hover:text-indigo-600`}
                      >
                        {serialNo}
                      </td>

                      {/* 2. Present Form */}
                      <td className={`${paddingClass} font-semibold text-slate-900 border-r border-slate-200`}>
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-semibold text-slate-900">{item.present}</span>
                            {item.isVerb && (
                              <span className="no-print text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                verb
                              </span>
                            )}
                          </div>
                          {item.pronunciation && (
                            <div
                              className="text-[11px] text-teal-700 font-normal mt-0.5"
                              style={{ fontFamily: "'Tiro Bangla', 'Kalpurush', 'Noto Sans Bengali', sans-serif" }}
                            >
                              ({item.pronunciation})
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 3. Meaning */}
                      <td
                        className={`${paddingClass} text-slate-700 border-r border-slate-200 font-medium`}
                        style={{ fontFamily: "'Tiro Bangla', 'Kalpurush', 'Noto Sans Bengali', sans-serif" }}
                      >
                        {item.meaning}
                      </td>

                      {/* 4. Past */}
                      <td className={`${paddingClass} text-slate-800 border-r border-slate-200`}>
                        {item.past ? (
                          <span className="font-medium text-indigo-950">{item.past}</span>
                        ) : (
                          <span className="text-slate-300"></span>
                        )}
                      </td>

                      {/* 5. Past Participle */}
                      <td className={`${paddingClass} text-slate-800 border-r border-slate-200`}>
                        {item.pastParticiple ? (
                          <span className="font-medium text-indigo-950">{item.pastParticiple}</span>
                        ) : (
                          <span className="text-slate-300"></span>
                        )}
                      </td>

                      {/* Action Column (Hidden on Print) */}
                      <td className={`${paddingClass} text-center no-print`}>
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 transition-colors"
                            title="Edit word"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-100 transition-colors"
                            title="Delete word"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination & Controls Bar (Hidden on Print) */}
      {words.length > 0 && (
        <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-1 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-900 font-semibold">{startIndex}</strong> - <strong className="text-slate-900 font-semibold">{endIndex}</strong> of <strong className="text-slate-900 font-semibold">{totalWords}</strong> words</span>
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
              <ListFilter className="w-3.5 h-3.5 text-slate-400" />
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const val = e.target.value;
                  setPageSize(val === 'all' ? 'all' : Number(val));
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option>
                <option value={500}>500</option>
                <option value="all">Show All ({totalWords})</option>
              </select>
            </div>
          </div>

          {!isAll && totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-medium flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="px-2 font-medium text-slate-700">
                Page <strong className="text-slate-900">{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-medium flex items-center gap-1 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
