import React from 'react';
import { X, Sun, Moon, Monitor, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full sm:max-w-md sm:rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('settings')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Language Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {t('language')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  language === 'en'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="font-medium">English</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">English</div>
              </button>
              
              <button
                onClick={() => setLanguage('hi')}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  language === 'hi'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="font-medium">हिंदी</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hindi</div>
              </button>
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              {t('theme')}
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setTheme('light')}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center ${
                  theme === 'light'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Sun className="h-4 w-4 mr-3" />
                <div>
                  <div className="font-medium">{t('light')}</div>
                </div>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center ${
                  theme === 'dark'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Moon className="h-4 w-4 mr-3" />
                <div>
                  <div className="font-medium">{t('dark')}</div>
                </div>
              </button>
              
              <button
                onClick={() => setTheme('system')}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center ${
                  theme === 'system'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Monitor className="h-4 w-4 mr-3" />
                <div>
                  <div className="font-medium">{t('system')}</div>
                </div>
              </button>
            </div>
          </div>

          {/* About */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('about')}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {t('appTitle')} - Emergency Contact Finder
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t('version')} 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};