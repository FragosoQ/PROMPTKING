
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { translations } from '../lib/translations';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

type TranslationKey = keyof typeof translations.en;

interface Tutorial {
  category: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  detailKey: TranslationKey;
  color: 'sky' | 'green' | 'amber' | 'indigo' | 'rose';
}

const tutorials: Tutorial[] = [
  {
    category: 'Core Skills',
    titleKey: 'promptingMasteryTitle',
    descriptionKey: 'promptingMasteryDesc',
    detailKey: 'promptingMasteryDetail',
    color: 'sky',
  },
  {
    category: 'Advanced Techniques',
    titleKey: 'ragExplainedTitle',
    descriptionKey: 'ragExplainedDesc',
    detailKey: 'ragExplainedDetail',
    color: 'green',
  },
  {
    category: 'Google Cloud AI',
    titleKey: 'vertexAiIntroTitle',
    descriptionKey: 'vertexAiIntroDesc',
    detailKey: 'vertexAiIntroDetail',
    color: 'amber',
  },
  {
    category: 'AI Automation',
    titleKey: 'buildingAgentsTitle',
    descriptionKey: 'buildingAgentsDesc',
    detailKey: 'buildingAgentsDetail',
    color: 'indigo',
  },
  {
    category: 'Advanced Techniques',
    titleKey: 'chainOfThoughtTitle',
    descriptionKey: 'chainOfThoughtDesc',
    detailKey: 'chainOfThoughtDetail',
    color: 'rose',
  }
];

const colorClasses = {
  sky: {
    border: 'border-sky-500 hover:border-sky-400',
    text: 'text-sky-400',
  },
  green: {
    border: 'border-green-500 hover:border-green-400',
    text: 'text-green-400',
  },
  amber: {
    border: 'border-amber-500 hover:border-amber-400',
    text: 'text-amber-400',
  },
  indigo: {
    border: 'border-indigo-500 hover:border-indigo-400',
    text: 'text-indigo-400',
  },
  rose: {
    border: 'border-rose-500 hover:border-rose-400',
    text: 'text-rose-400',
  },
};

const TutorialsView: React.FC = () => {
  const { t } = useLanguage();
  const [expandedKey, setExpandedKey] = useState<TranslationKey | null>(null);

  const handleToggle = (key: TranslationKey) => {
    setExpandedKey(prevKey => (prevKey === key ? null : key));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {t('tutorialsTitle')}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          {t('tutorialsSubtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {tutorials.map((tutorial) => {
          const isExpanded = expandedKey === tutorial.titleKey;
          return (
            <div
              key={tutorial.titleKey}
              className={`rounded-xl bg-gray-950/75 transition-all duration-300 ease-in-out border border-gray-800 ${colorClasses[tutorial.color].border}`}
            >
              <button
                onClick={() => handleToggle(tutorial.titleKey)}
                className="w-full text-left p-6 flex justify-between items-start gap-4 focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${colorClasses[tutorial.color].text}`}>
                    {tutorial.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">{t(tutorial.titleKey)}</h3>
                  {!isExpanded && (
                     <p className="mt-3 text-gray-400">
                        {t(tutorial.descriptionKey)}
                     </p>
                  )}
                </div>
                <ChevronDownIcon 
                  className={`w-6 h-6 text-gray-400 flex-shrink-0 mt-1 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 border-t border-gray-800/50">
                        <p className="mt-4 text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {t(tutorial.detailKey)}
                        </p>
                    </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialsView;
