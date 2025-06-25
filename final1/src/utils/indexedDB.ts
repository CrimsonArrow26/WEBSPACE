import { Contact } from '../types';

const DB_NAME = 'WhoCanICallDB';
const DB_VERSION = 1;
const CONTACTS_STORE = 'contacts';
const CACHE_STORE = 'cache';

class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Contacts store
        if (!db.objectStoreNames.contains(CONTACTS_STORE)) {
          const contactsStore = db.createObjectStore(CONTACTS_STORE, { keyPath: 'id' });
          contactsStore.createIndex('category', 'category', { unique: false });
          contactsStore.createIndex('location.pincode', 'location.pincode', { unique: false });
        }

        // Cache store for API responses
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
        }
      };
    });
  }

  async saveContacts(contacts: Contact[]): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction([CONTACTS_STORE], 'readwrite');
    const store = transaction.objectStore(CONTACTS_STORE);
    
    for (const contact of contacts) {
      await new Promise<void>((resolve, reject) => {
        const request = store.put(contact);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  }

  async getContacts(): Promise<Contact[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONTACTS_STORE], 'readonly');
      const store = transaction.objectStore(CONTACTS_STORE);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getContactsByCategory(category: string): Promise<Contact[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONTACTS_STORE], 'readonly');
      const store = transaction.objectStore(CONTACTS_STORE);
      const index = store.index('category');
      const request = index.getAll(category);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async cacheData(key: string, data: any, ttl: number = 3600000): Promise<void> {
    if (!this.db) await this.init();
    
    const cacheItem = {
      key,
      data,
      timestamp: Date.now(),
      ttl
    };

    const transaction = this.db!.transaction([CACHE_STORE], 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.put(cacheItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedData(key: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CACHE_STORE], 'readonly');
      const store = transaction.objectStore(CACHE_STORE);
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }
        
        // Check if cache is still valid
        const now = Date.now();
        if (now - result.timestamp > result.ttl) {
          // Cache expired
          resolve(null);
          return;
        }
        
        resolve(result.data);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const dbManager = new IndexedDBManager();