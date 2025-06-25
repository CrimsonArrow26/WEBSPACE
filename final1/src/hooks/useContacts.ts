import { useState, useEffect, useMemo } from 'react';
import { Contact, ContactCategory } from '../types';
import { mockContacts } from '../data/contacts';
import { dbManager } from '../utils/indexedDB';

export const useContacts = (category?: ContactCategory, location?: string) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadContacts = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Try to get from cache first
      let contactData = await dbManager.getCachedData('contacts');
      
      if (!contactData) {
        // In a real app, this would be an API call
        contactData = mockContacts;
        
        // Cache the data
        await dbManager.cacheData('contacts', contactData);
        await dbManager.saveContacts(contactData);
      }

      setContacts(contactData);
    } catch (err) {
      setError('Failed to load contacts');
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Filter by category
    if (category) {
      filtered = filtered.filter(contact => contact.category === category);
    }

    // Filter by location (approximate matching for demo)
    if (location) {
      filtered = filtered.filter(contact => 
        contact.location.pincode === location ||
        contact.location.city.toLowerCase().includes(location.toLowerCase()) ||
        contact.location.state.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.department.toLowerCase().includes(term) ||
        contact.phone.includes(term)
      );
    }

    // Sort verified contacts first
    return filtered.sort((a, b) => {
      if (a.isVerified && !b.isVerified) return -1;
      if (!a.isVerified && b.isVerified) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [contacts, category, location, searchTerm]);

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts: filteredContacts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: loadContacts
  };
};