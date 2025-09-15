
import React from 'react';
import type { View } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const { language, setLanguage, t } = useLanguage();

  const langButtonClasses = (lang: 'en' | 'pt') => 
    `px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
      language === lang 
      ? 'bg-gray-700 text-white' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`;

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-800 gap-4 sm:gap-0">
      <h1 
        className="text-2xl sm:text-3xl font-bold tracking-tight text-white cursor-pointer"
        onClick={() => setView('home')}
      >
        {t('appTitle')}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg bg-gray-900 p-0.5">
          <button onClick={() => setLanguage('en')} className={langButtonClasses('en')}>EN</button>
          <button onClick={() => setLanguage('pt')} className={langButtonClasses('pt')}>PT</button>
        </div>
        <button
          onClick={() => setView('tutorials')}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-300 bg-amber-900/50 rounded-md hover:bg-amber-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-amber-500"
        >
          <AcademicCapIcon className="w-5 h-5" />
          {t('tutorials')}
        </button>
        <button
          onClick={() => setView('history')}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-sky-300 bg-sky-900/50 rounded-md hover:bg-sky-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-sky-500"
        >
          <ClockIcon className="w-5 h-5" />
          {t('history')}
        </button>
      </div>
    </header>
  );
};

export default Header;