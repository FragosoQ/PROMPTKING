import React from 'react';
import type { View } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PencilSquareIcon } from './icons/PencilSquareIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {t('homeTitle')}
      </h2>
      <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
        {t('homeSubtitle')}
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          onClick={() => setView('multiple-choice')}
          className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-950/75 p-8 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-900 border border-gray-800 hover:border-sky-500"
        >
          <div className="mb-4 text-sky-400">
             <BookOpenIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t('mcqTitle')}</h3>
          <p className="mt-4 text-gray-400">
            {t('mcqDescription')}
          </p>
        </div>

        <div
          onClick={() => setView('prompt-dev')}
          className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-950/75 p-8 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-900 border border-gray-800 hover:border-indigo-500"
        >
           <div className="mb-4 text-indigo-400">
            <PencilSquareIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t('promptDevTitle')}</h3>
          <p className="mt-4 text-gray-400">
            {t('promptDevDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;