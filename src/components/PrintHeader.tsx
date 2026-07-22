import React from 'react';

interface PrintHeaderProps {
  totalCount: number;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ totalCount }) => {
  return (
    <div className="only-print text-black mb-4 pb-2 border-b-2 border-black">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wide">
            English Dictionary & Verb Forms
          </h1>
          <p className="text-xs text-gray-700 font-medium mt-0.5">
            ইংরেজি শব্দভাণ্ডার ও ক্রিয়ার রূপসমূহ (Present, Meaning, Past, Past Participle)
          </p>
        </div>
        <div className="text-right text-xs">
          <p className="font-mono">Total Words: {totalCount}</p>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
