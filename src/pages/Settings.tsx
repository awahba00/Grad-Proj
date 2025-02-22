import React from 'react';
import { Bell, Lock, Eye, User, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AccountSettings from './settings/AccountSettings';
import NotificationSettings from './settings/NotificationSettings';
import PrivacySettings from './settings/PrivacySettings';
import AccessibilitySettings from './settings/AccessibilitySettings';
import ThemeSettings from './settings/ThemeSettings';

function Settings() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/settings${path}`;
  };

  const buttonClasses = (path: string) => `
    w-full flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3 p-3 rounded-lg
    transition-colors
    ${isActive(path) 
      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }
  `;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className={`p-4 text-xl font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {t('settings.title')}
        </h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Settings Navigation */}
        <nav className="md:w-64 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            <Link to="/settings/account" className={buttonClasses('/account')}>
              <User className="w-5 h-5" />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('settings.account')}</p>
              </div>
            </Link>

            <Link to="/settings/notifications" className={buttonClasses('/notifications')}>
              <Bell className="w-5 h-5" />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('settings.notifications')}</p>
              </div>
            </Link>

            <Link to="/settings/privacy" className={buttonClasses('/privacy')}>
              <Lock className="w-5 h-5" />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('settings.privacy')}</p>
              </div>
            </Link>

            <Link to="/settings/accessibility" className={buttonClasses('/accessibility')}>
              <Eye className="w-5 h-5" />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('settings.accessibility')}</p>
              </div>
            </Link>

            <Link to="/settings/theme" className={buttonClasses('/theme')}>
              <Moon className="w-5 h-5" />
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">{t('settings.theme')}</p>
              </div>
            </Link>
          </div>
        </nav>

        {/* Settings Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AccountSettings />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            <Route path="/privacy" element={<PrivacySettings />} />
            <Route path="/accessibility" element={<AccessibilitySettings />} />
            <Route path="/theme" element={<ThemeSettings />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default Settings;