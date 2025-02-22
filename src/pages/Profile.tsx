import React from 'react';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Post } from '../components/Post';
import { generateSamplePosts } from '../lib/sampleData';

function Profile() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const userPosts = generateSamplePosts(5); // Get sample posts for demonstration

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <h1 className={`p-4 text-xl font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {t('profile.title')}
        </h1>
      </header>

      <div className="max-w-3xl mx-auto">
        {/* User Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="px-4 pb-6">
            <div className="relative -mt-20">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt={t('profile.avatar')}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800"
              />
            </div>

            <div className={`mt-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">John Doe</h2>
                <p className="text-gray-600 dark:text-gray-400">@johndoe</p>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Software developer & accessibility advocate. Building tools that make the web more inclusive for everyone. 🌐 ♿️
              </p>
              
              <div className="mt-4 space-y-2">
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>San Francisco, CA</span>
                </div>
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <LinkIcon className="w-4 h-4 flex-shrink-0" />
                  <a href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline">
                    github.com/johndoe
                  </a>
                </div>
                <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 text-gray-600 dark:text-gray-400`}>
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{t('profile.joined')} {t('profile.joinedDate')}</span>
                </div>
              </div>

              <div className={`mt-6 flex ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-6`}>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">1,234</span>
                  <span className={`text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`}>
                    {t('profile.following')}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">5,678</span>
                  <span className={`text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`}>
                    {t('profile.followers')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts Section */}
        <div className="mt-6">
          <h2 className={`px-4 text-lg font-semibold text-gray-900 dark:text-white ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}>
            {t('profile.posts')}
          </h2>
          <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            {userPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;