export interface Contact {
  id: string;
  name: string;
  phone: string;
  department: string;
  category: ContactCategory;
  workingHours: string;
  isVerified: boolean;
  location: {
    state: string;
    city: string;
    pincode: string;
  };
  description?: string;
  additionalInfo?: string;
}

export type ContactCategory = 
  | 'crime' 
  | 'water' 
  | 'electricity' 
  | 'roads' 
  | 'medical' 
  | 'animal' 
  | 'disability';

export interface Location {
  latitude: number;
  longitude: number;
  pincode?: string;
  city?: string;
  state?: string;
}

export interface CategoryInfo {
  id: ContactCategory;
  name: string;
  nameHi: string;
  icon: string;
  color: string;
  description: string;
  descriptionHi: string;
}

export interface SuggestedContact {
  name: string;
  phone: string;
  department: string;
  category: ContactCategory;
  location: string;
  workingHours: string;
  additionalInfo?: string;
  submitterEmail?: string;
}

export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark' | 'system';