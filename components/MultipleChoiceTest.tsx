
import React, { useState, useEffect, useCallback } from 'react';
import type { MCQTest, Question, TestResult } from '../types';
import { generateMultipleChoiceTest, evaluateMultipleChoiceAnswers } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface MultipleChoiceTestProps {
  onTestComplete: (result: TestResult) => void;
}

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({ onTestComplete }) => {
  const [testData, setTestData] = useState<MCQTest | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const fetchTest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateMultipleChoiceTest(language);
      setTestData(data);
      setUserAnswers(new Array(data.questions.length).fill(-1));
      setCurrentQuestionIndex(0);
    } catch (err) {
      setError(t('errorLoadTest'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [t, language]);

  useEffect(() => {
    fetchTest();
  }, [fetchTest]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (testData && currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!testData) return;
    setIsEvaluating(true);
    setError(null);
    try {
        const evaluation = await evaluateMultipleChoiceAnswers(testData, userAnswers, language);
        const score = evaluation.feedback.reduce((acc: number, item: {isCorrect: boolean}) => acc + (item.isCorrect ? 1 : 0), 0) / testData.questions.length * 100;
        
        onTestComplete({
            id: new Date().toISOString(),
            type: 'Multiple-Choice',
            testData,
            userAnswers,
            score: Math.round(score),
            feedback: evaluation.feedback,
            suggestions: evaluation.suggestions,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        setError(t('errorEvaluate'));
        console.error(err);
        setIsEvaluating(false);
    }
  };

  if (isLoading) {
    return <div className="text-center"><LoadingSpinner /> <p className="mt-4 text-gray-300">{t('loadingTest')}</p></div>;
  }
  if (isEvaluating) {
    return <div className="text-center"><LoadingSpinner /> <p className="mt-4 text-gray-300">{t('evaluatingAnswers')}</p></div>;
  }
  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }
  if (!testData) {
    return <div className="text-center text-gray-400">{t('noTestError')}</div>;
  }

  const currentQuestion: Question = testData.questions[currentQuestionIndex];
  const isAllAnswered = userAnswers.every(ans => ans !== -1);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-950/75 border border-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-sky-400">{t('clientScenario')}</h2>
        <p className="mt-2 text-gray-300">{testData.clientProblem}</p>
      </div>

      <div className="mt-8 bg-gray-950/75 border border-gray-800 rounded-xl p-6 sm:p-8 shadow-lg">
        <p className="text-sm font-medium text-gray-400">{t('question')} {currentQuestionIndex + 1} / {testData.questions.length}</p>
        <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white">{currentQuestion.questionText}</h3>

        <div className="mt-6 space-y-4">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                userAnswers[currentQuestionIndex] === index
                  ? 'bg-sky-900/50 border-sky-500 ring-2 ring-sky-500'
                  : 'bg-black/50 border-gray-800 hover:bg-gray-900/50'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                checked={userAnswers[currentQuestionIndex] === index}
                onChange={() => handleAnswerSelect(index)}
                className="h-4 w-4 text-sky-600 bg-gray-900 border-gray-700 focus:ring-sky-500"
              />
              <span className="ml-4 text-gray-200">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0}>{t('back')}</Button>
        {currentQuestionIndex < testData.questions.length - 1 ? (
          <Button onClick={handleNext} disabled={userAnswers[currentQuestionIndex] === -1}>{t('next')}</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!isAllAnswered} variant="primary">{t('submitEvaluation')}</Button>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceTest;