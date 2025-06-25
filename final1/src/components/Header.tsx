import React from 'react';
import { Search, Settings, Menu } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  onSearchToggle: () => void;
  onSettingsToggle: () => void;
  onMenuToggle: () => void;
  showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchToggle,
  onSettingsToggle,
  onMenuToggle,
  showSearch = false
}) => {
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-2 md:ml-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('appTitle')}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                {t('appSubtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {showSearch && (
              <button
                onClick={onSearchToggle}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onSettingsToggle}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};