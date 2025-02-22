import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

function Messages() {
  const { dir } = useLanguage();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className={`p-4 text-xl font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {t('messages.title')}
        </h1>
      </header>

      <section className="p-4" aria-label={t('messages.title')}>
        <div className="space-y-4">
          <article className={`p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}>
            <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3`}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full"
              />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h2 className="font-semibold">Sarah Johnson</h2>
                <p className="text-gray-600 dark:text-gray-400">{t('messages.newMessage')}</p>
              </div>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
          </article>

          <article className={`p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors`}>
            <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3`}>
              <img
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Mike Chen"
                className="w-12 h-12 rounded-full"
              />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h2 className="font-semibold">Mike Chen</h2>
                <p className="text-gray-600 dark:text-gray-400">{t('messages.startConversation')}</p>
              </div>
              <span className="text-sm text-gray-500">5h ago</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Messages;