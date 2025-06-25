import React from 'react';
import { Phone, Clock, CheckCircle, Building } from 'lucide-react';
import { Contact } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { t } = useLanguage();

  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {contact.name}
            </h3>
            {contact.isVerified && (
              <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
            <Building className="h-3 w-3 mr-1" />
            {contact.department}
          </div>
          
          {contact.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {contact.description}
            </p>
          )}
        </div>
        
        {contact.isVerified && (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
            {t('verified')}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          {contact.workingHours}
        </div>
      </div>
      
      <button
        onClick={handleCall}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        <Phone className="h-4 w-4 mr-2" />
        <span className="font-mono font-semibold">{contact.phone}</span>
      </button>
    </div>
  );
};