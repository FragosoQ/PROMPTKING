import React, { useState, useEffect } from 'react';
import type { TestResult, View, MCQResult, PromptDevResult } from '../types';
import Button from './Button';
import Fireworks from './Fireworks';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ResultsViewProps {
  result: TestResult;
  setView: (view: View) => void;
}

const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
};

const ResultsView: React.FC<ResultsViewProps> = ({ result, setView }) => {
  const { t } = useLanguage();
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (result.score >= 80) {
        setShowFireworks(true);
        const timer = setTimeout(() => setShowFireworks(false), 4000);
        return () => clearTimeout(timer);
    }
  }, [result.score]);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative">
        {showFireworks && <Fireworks />}
        <div className="text-center mb-8">
            <p className="text-lg font-semibold text-gray-300">{t('evaluationComplete')}</p>
            <h2 className="text-6xl font-bold tracking-tight mt-2">
                <span className={getScoreColor(result.score)}>{result.score}</span>
                <span className="text-gray-600">/100</span>
            </h2>
        </div>

        {result.type === 'Multiple-Choice' && <MCQResults result={result} />}
        {result.type === 'Prompt-Development' && <PromptDevResults result={result} />}

        <div className="mt-12 bg-gray-950/75 border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-3">{t('suggestionsForImprovement')}</h3>
            <ul className="space-y-3 list-disc list-inside text-gray-300">
                {result.type === 'Multiple-Choice' ? 
                    result.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    )) :
                    <li>{result.feedback}</li>
                }
            </ul>
        </div>
        
        <div className="mt-10 text-center">
            <Button onClick={() => setView('home')} variant='secondary' className="inline-flex items-center gap-2">
                <ArrowLeftIcon className="w-5 h-5"/>
                {t('backToHome')}
            </Button>
        </div>
    </div>
  );
};

const MCQResults: React.FC<{ result: MCQResult }> = ({ result }) => {
    const { t } = useLanguage();
    return (
        <div>
            {result.feedback.map((item, index) => (
                <div key={index} className={`mb-4 border-l-4 p-4 rounded-r-lg ${item.isCorrect ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'}`}>
                    <p className="font-semibold text-gray-300">{item.question}</p>
                    <p className="text-sm mt-2">{t('yourAnswer')} <span className="font-medium text-gray-100">{item.userAnswer}</span></p>
                    {!item.isCorrect && <p className="text-sm">{t('correctAnswer')} <span className="font-medium text-gray-100">{item.correctAnswer}</span></p>}
                    <p className="mt-3 text-sm text-gray-400"><strong className="font-semibold">{t(item.isCorrect ? 'explanation' : 'why')}</strong> {item.explanation}</p>
                </div>
            ))}
        </div>
    );
};

const PromptDevResults: React.FC<{ result: PromptDevResult }> = ({ result }) => {
    const { t } = useLanguage();
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('yourPrompt')}</h3>
                <pre className="whitespace-pre-wrap bg-gray-950/75 border border-gray-800 rounded-lg p-4 text-gray-300 font-mono text-sm">{result.userPrompt}</pre>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-3">{t('expertSuggestion')}</h3>
                <pre className="whitespace-pre-wrap bg-sky-900/20 border border-sky-700 rounded-lg p-4 text-gray-200 font-mono text-sm">{result.suggestedPrompt}</pre>
            </div>
        </div>
    );
};

export default ResultsView;