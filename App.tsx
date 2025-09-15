
import React, { useState, useCallback } from 'react';
import type { View, TestResult } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Home from './components/Home';
import MultipleChoiceTest from './components/MultipleChoiceTest';
import PromptDevelopment from './components/PromptDevelopment';
import HistoryView from './components/HistoryView';
import ResultsView from './components/ResultsView';
import TutorialsView from './components/TutorialsView';

export default function App(): React.ReactElement {
  const [view, setView] = useState<View>('home');
  const [history, setHistory] = useLocalStorage<TestResult[]>('prompt-history', []);
  const [activeResult, setActiveResult] = useState<TestResult | null>(null);

  const addResultToHistory = useCallback((result: TestResult) => {
    setHistory(prevHistory => [result, ...prevHistory]);
    setActiveResult(result);
    setView('results');
  }, [setHistory]);

  const handleNavigate = (newView: View) => {
    setActiveResult(null);
    setView(newView);
  };
  
  const handleViewResult = (result: TestResult) => {
    setActiveResult(result);
    setView('results');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home setView={handleNavigate} />;
      case 'multiple-choice':
        return <MultipleChoiceTest onTestComplete={addResultToHistory} />;
      case 'prompt-dev':
        return <PromptDevelopment onTestComplete={addResultToHistory} />;
      case 'history':
        return <HistoryView history={history} onViewResult={handleViewResult} />;
      case 'results':
        return activeResult ? <ResultsView result={activeResult} setView={handleNavigate} /> : <Home setView={handleNavigate} />;
      case 'tutorials':
        return <TutorialsView />;
      default:
        return <Home setView={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-800/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header setView={handleNavigate} />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}