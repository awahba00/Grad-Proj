import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface AccessibilityCheckProps {
  onResponse: (isVisuallyImpaired: boolean) => void;
}

function AccessibilityCheck({ onResponse }: AccessibilityCheckProps) {
  const { language, setLanguage, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Automatically read the question when the component mounts
  useEffect(() => {
    const text = t('accessibility.question');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ar' ? 'ar-SA' : 'en-US';
    window.speechSynthesis.speak(utterance);
  }, [language, t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6">
      {/* Theme and Language Controls */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <button
          onClick={handleLanguageChange}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('settings.selectLanguage')}
        >
          <Languages className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md text-center">
        <h1 className={`text-3xl font-bold mb-4 text-gray-900 dark:text-white ${
          language === 'ar' ? 'font-kufi' : ''
        }`}>
          {t('accessibility.question')}
        </h1>
        
        <p className={`text-lg mb-8 text-gray-600 dark:text-gray-400 ${
          language === 'ar' ? 'font-kufi' : ''
        }`}>
          {t('accessibility.description')}
        </p>

        <div className={`space-y-4 ${dir === 'rtl' ? 'space-y-reverse' : ''}`}>
          <button
            onClick={() => {
              onResponse(true);
              navigate('/signup');
            }}
            className="w-full px-8 py-4 text-lg bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            aria-label={t('accessibility.yes')}
          >
            {t('accessibility.yes')}
          </button>
          <button
            onClick={() => {
              onResponse(false);
              navigate('/signup');
            }}
            className="w-full px-8 py-4 text-lg bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            aria-label={t('accessibility.no')}
          >
            {t('accessibility.no')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityCheck;