
import React, { useState, useEffect, useCallback } from 'react';
import type { PromptDevProblem, TestResult } from '../types';
import { generatePromptProblem, evaluateUserPrompt } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface PromptDevelopmentProps {
  onTestComplete: (result: TestResult) => void;
}

const PromptDevelopment: React.FC<PromptDevelopmentProps> = ({ onTestComplete }) => {
  const [problem, setProblem] = useState<PromptDevProblem | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const fetchProblem = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generatePromptProblem(language);
      setProblem(data);
      setUserPrompt('');
    } catch (err) {
      setError(t('errorLoadProblem'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [t, language]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  const handleSubmit = async () => {
    if (!problem || !userPrompt.trim()) return;
    setIsEvaluating(true);
    setError(null);
    try {
        const evaluation = await evaluateUserPrompt(problem, userPrompt, language);
        onTestComplete({
            id: new Date().toISOString(),
            type: 'Prompt-Development',
            problem,
            userPrompt,
            score: evaluation.score,
            feedback: evaluation.feedback,
            suggestedPrompt: evaluation.suggestedPrompt,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        setError(t('errorEvaluatePrompt'));
        console.error(err);
        setIsEvaluating(false);
    }
  };

  if (isLoading) {
    return <div className="text-center"><LoadingSpinner /> <p className="mt-4 text-gray-300">{t('loadingProblem')}</p></div>;
  }
  if (isEvaluating) {
    return <div className="text-center"><LoadingSpinner /> <p className="mt-4 text-gray-300">{t('evaluatingPrompt')}</p></div>;
  }
  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }
  if (!problem) {
    return <div className="text-center text-gray-400">{t('noProblemError')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-gray-950/75 border border-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-400">{t('clientBrief')}</h2>
            <div className="mt-4 space-y-4 text-gray-300">
                <p><strong className="font-semibold text-gray-100">{t('client')}:</strong> {problem.clientProblem}</p>
                <p><strong className="font-semibold text-gray-100">{t('task')}:</strong> {problem.task}</p>
                <p><strong className="font-semibold text-gray-100">{t('desiredOutput')}:</strong> {problem.desiredOutput}</p>
            </div>
        </div>

        <div className="mt-8">
            <label htmlFor="prompt-input" className="block text-lg font-medium text-white">{t('yourPrompt')}</label>
            <p className="text-sm text-gray-400 mb-2">{t('yourPromptHint')}</p>
            <textarea
                id="prompt-input"
                rows={10}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={t('yourPromptPlaceholder')}
                className="w-full mt-2 p-4 bg-black/50 border border-gray-800 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
        </div>

        <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} disabled={!userPrompt.trim()} variant="primary">{t('submitEvaluation')}</Button>
        </div>
    </div>
  );
};

export default PromptDevelopment;