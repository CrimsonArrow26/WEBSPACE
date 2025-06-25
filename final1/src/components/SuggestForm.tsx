import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { categories } from '../data/categories';
import { ContactCategory, SuggestedContact } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface SuggestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestForm: React.FC<SuggestFormProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<SuggestedContact>({
    name: '',
    phone: '',
    department: '',
    category: 'crime',
    location: '',
    workingHours: '',
    additionalInfo: '',
    submitterEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Suggested contact:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        department: '',
        category: 'crime',
        location: '',
        workingHours: '',
        additionalInfo: '',
        submitterEmail: ''
      });
      onClose();
    }, 2000);
  };

  const handleInputChange = (field: keyof SuggestedContact, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('suggestionSubmitted')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We'll review your suggestion and add it to our database if verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-lg my-8">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('suggestContact')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('contactName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('phoneNumber')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('department')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('category')} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {language === 'hi' ? category.nameHi : category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('location')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State, PIN Code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('workingHoursLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleInputChange('workingHours', e.target.value)}
              placeholder="e.g., 24/7 or 9:00 AM - 5:00 PM"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('additionalInfo')} <span className="text-gray-500">({t('optional')})</span>
            </label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('yourEmail')} <span className="text-gray-500">({t('optional')})</span>
            </label>
            <input
              type="email"
              value={formData.submitterEmail}
              onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t('submit')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};