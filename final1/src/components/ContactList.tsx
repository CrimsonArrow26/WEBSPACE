import React from 'react';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { useContacts } from '../hooks/useContacts';
import { useLanguage } from '../hooks/useLanguage';
import { ContactCategory } from '../types';

interface ContactListProps {
  category?: ContactCategory;
  location?: string;
  showSearch?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  category,
  location,
  showSearch = false
}) => {
  const { contacts, loading, error, searchTerm, setSearchTerm, refetch } = useContacts(category, location);
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <h3 className="font-medium text-red-800 dark:text-red-200">{t('error')}</h3>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {showSearch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('noContacts')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('noContactsDesc')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('contacts')} ({contacts.length})
            </h2>
          </div>
          
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};