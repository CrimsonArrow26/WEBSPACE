import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryGrid';
import { LocationSelector } from './components/LocationSelector';
import { ContactList } from './components/ContactList';
import { Settings } from './components/Settings';
import { SuggestForm } from './components/SuggestForm';
import { useLocation } from './hooks/useLocation';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { ContactCategory } from './types';
import { dbManager } from './utils/indexedDB';

type Screen = 'categories' | 'contacts' | 'location';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('location');
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory | undefined>();
  const [showSettings, setShowSettings] = useState(false);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { location } = useLocation();
  const { t } = useLanguage();
  
  // Initialize theme and database
  useTheme();
  
  useEffect(() => {
    // Initialize IndexedDB
    dbManager.init().catch(console.error);
    
    // Check if location is already set
    if (location) {
      setCurrentScreen('categories');
    }
  }, [location]);

  const handleCategorySelect = (category: ContactCategory) => {
    setSelectedCategory(category);
    setCurrentScreen('contacts');
  };

  const handleLocationSet = () => {
    setCurrentScreen('categories');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(undefined);
    setCurrentScreen('categories');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'location':
        return <LocationSelector onLocationSet={handleLocationSet} />;
      
      case 'categories':
        return (
          <CategoryGrid
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        );
      
      case 'contacts':
        return (
          <ContactList
            category={selectedCategory}
            location={location?.pincode}
            showSearch={showSearch}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onSearchToggle={() => setShowSearch(!showSearch)}
        onSettingsToggle={() => setShowSettings(true)}
        onMenuToggle={handleBackToCategories}
        showSearch={currentScreen === 'contacts'}
      />
      
      <main className="max-w-7xl mx-auto">
        {renderScreen()}
      </main>

      {/* Floating Action Button */}
      {currentScreen !== 'location' && (
        <button
          onClick={() => setShowSuggestForm(true)}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-40"
          aria-label={t('suggestContact')}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      {/* Bottom Navigation */}
      {currentScreen !== 'location' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-2">
              <button
                onClick={() => setCurrentScreen('categories')}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  currentScreen === 'categories'
                    ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className="text-xs font-medium">{t('home')}</div>
              </button>
              
              {currentScreen === 'contacts' && (
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    showSearch
                      ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Search className="h-5 w-5 mb-1" />
                  <div className="text-xs font-medium">{t('search')}</div>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Modals */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <SuggestForm isOpen={showSuggestForm} onClose={() => setShowSuggestForm(false)} />
    </div>
  );
}

export default App;