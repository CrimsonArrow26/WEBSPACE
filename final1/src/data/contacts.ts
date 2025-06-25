import { Contact } from '../types';

export const mockContacts: Contact[] = [
  // Crime & Safety
  {
    id: '1',
    name: 'Mumbai Police Control Room',
    phone: '100',
    department: 'Mumbai Police',
    category: 'crime',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Emergency police assistance'
  },
  {
    id: '2',
    name: 'Women Helpline Mumbai',
    phone: '103',
    department: 'Mumbai Police',
    category: 'crime',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Women safety and assistance'
  },
  
  // Medical
  {
    id: '3',
    name: 'Emergency Ambulance Mumbai',
    phone: '108',
    department: 'Health Department',
    category: 'medical',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Free ambulance service'
  },
  {
    id: '4',
    name: 'KEM Hospital Emergency',
    phone: '022-24107000',
    department: 'KEM Hospital Mumbai',
    category: 'medical',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400012' },
    description: 'King Edward Memorial Hospital'
  },
  
  // Water
  {
    id: '5',
    name: 'BMC Water Supply',
    phone: '1916',
    department: 'Brihanmumbai Municipal Corporation',
    category: 'water',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Water supply complaints'
  },
  
  // Electricity
  {
    id: '6',
    name: 'MSEB Power Outage',
    phone: '19120',
    department: 'Maharashtra State Electricity Board',
    category: 'electricity',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Power outage complaints'
  },
  
  // Roads
  {
    id: '7',
    name: 'Mumbai Traffic Police Helpline',
    phone: '8454999999',
    department: 'Mumbai Traffic Police',
    category: 'roads',
    workingHours: '24/7',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Traffic related issues'
  },
  
  // Animal
  {
    id: '8',
    name: 'Animal Helpline Mumbai',
    phone: '022-24137518',
    department: 'Mumbai Animal Welfare',
    category: 'animal',
    workingHours: '9:00 AM - 6:00 PM',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Animal rescue and control'
  },
  
  // Disability
  {
    id: '9',
    name: 'Disability Helpline Maharashtra',
    phone: '1800-222-363',
    department: 'Social Welfare Department',
    category: 'disability',
    workingHours: '9:00 AM - 5:00 PM',
    isVerified: true,
    location: { state: 'Maharashtra', city: 'Mumbai', pincode: '400001' },
    description: 'Disability support services'
  }
];