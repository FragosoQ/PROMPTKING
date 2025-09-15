import React, { useState, useMemo } from 'react';
import type { TestResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HistoryViewProps {
  history: TestResult[];
  onViewResult: (result: TestResult) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onViewResult }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = useMemo(() => {
    if (!searchTerm.trim()) {
      return history;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    return history.filter(result => {
      if (result.type === 'Multiple-Choice') {
        const clientProblemMatch = result.testData.clientProblem.toLowerCase().includes(lowercasedFilter);
        const questionMatch = result.testData.questions.some(q => q.questionText.toLowerCase().includes(lowercasedFilter));
        return clientProblemMatch || questionMatch;
      }
      if (result.type === 'Prompt-Development') {
        const clientProblemMatch = result.problem.clientProblem.toLowerCase().includes(lowercasedFilter);
        const taskMatch = result.problem.task.toLowerCase().includes(lowercasedFilter);
        const userPromptMatch = result.userPrompt.toLowerCase().includes(lowercasedFilter);
        const suggestedPromptMatch = result.suggestedPrompt.toLowerCase().includes(lowercasedFilter);
        return clientProblemMatch || taskMatch || userPromptMatch || suggestedPromptMatch;
      }
      return false;
    });
  }, [history, searchTerm]);

  if (history.length === 0) {
    return (
      <div className="text-center max-w-xl mx-auto">
        <div className="text-gray-600 mb-4">
            <ClockIcon className="h-16 w-16 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold">{t('noHistoryTitle')}</h2>
        <p className="mt-2 text-gray-400">
          {t('noHistorySubtitle')}
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-6">{t('historyTitle')}</h2>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchHistoryPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-950/75 border border-gray-800 rounded-lg text-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        />
      </div>

      {filteredHistory.length > 0 ? (
        <ul className="space-y-4">
            {filteredHistory.map((result) => (
            <li 
                key={result.id} 
                onClick={() => onViewResult(result)}
                className="bg-gray-950/75 border border-gray-800 rounded-lg p-4 sm:p-6 hover:bg-gray-900 transition-colors cursor-pointer"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    {result.type === 'Multiple-Choice' ? (
                    <BookOpenIcon className="h-8 w-8 text-sky-400 flex-shrink-0" />
                    ) : (
                    <PencilSquareIcon className="h-8 w-8 text-indigo-400 flex-shrink-0" />
                    )}
                    <div>
                    <p className="font-semibold text-lg text-white">{t(result.type === 'Multiple-Choice' ? 'mcqTitle' : 'promptDevTitle')}</p>
                    <p className="text-sm text-gray-400">
                        {new Date(result.timestamp).toLocaleString()}
                    </p>
                    </div>
                </div>
                <div className={`mt-4 sm:mt-0 text-2xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}/100
                </div>
                </div>
            </li>
            ))}
        </ul>
      ) : (
        <div className="text-center max-w-xl mx-auto mt-12">
            <div className="text-gray-600 mb-4">
                <SearchIcon className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold">{t('noResultsFound')}</h2>
            <p className="mt-2 text-gray-400">
                {t('noResultsFoundSubtitle')}
            </p>
        </div>
      )}
    </div>
  );
};
  
export default HistoryView;