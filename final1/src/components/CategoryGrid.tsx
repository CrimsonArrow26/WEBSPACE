import React from 'react';
import * as Icons from 'lucide-react';
import { categories } from '../data/categories';
import { ContactCategory } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface CategoryGridProps {
  onCategorySelect: (category: ContactCategory) => void;
  selectedCategory?: ContactCategory;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategorySelect,
  selectedCategory
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('selectCategory')}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-md'
                }
              `}
              aria-pressed={isSelected}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto
                ${category.color} text-white
              `}>
                <IconComponent className="h-6 w-6" />
              </div>
              
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 text-center">
                {language === 'hi' ? category.nameHi : category.name}
              </h3>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">
                {language === 'hi' ? category.descriptionHi : category.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};