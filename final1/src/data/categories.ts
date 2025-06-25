import { CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'crime',
    name: 'Crime & Safety',
    nameHi: 'अपराध और सुरक्षा',
    icon: 'Shield',
    color: 'bg-red-500',
    description: 'Police, Emergency Services',
    descriptionHi: 'पुलिस, आपातकालीन सेवाएं'
  },
  {
    id: 'medical',
    name: 'Medical Emergency',
    nameHi: 'चिकित्सा आपातकाल',
    icon: 'Heart',
    color: 'bg-pink-500',
    description: 'Hospitals, Ambulance, Health',
    descriptionHi: 'अस्पताल, एम्बुलेंस, स्वास्थ्य'
  },
  {
    id: 'water',
    name: 'Water Supply',
    nameHi: 'जल आपूर्ति',
    icon: 'Droplets',
    color: 'bg-blue-500',
    description: 'Water Board, Supply Issues',
    descriptionHi: 'जल बोर्ड, आपूर्ति समस्याएं'
  },
  {
    id: 'electricity',
    name: 'Electricity',
    nameHi: 'बिजली',
    icon: 'Zap',
    color: 'bg-yellow-500',
    description: 'Power Grid, Outages',
    descriptionHi: 'पावर ग्रिड, कटौती'
  },
  {
    id: 'roads',
    name: 'Roads & Transport',
    nameHi: 'सड़क और परिवहन',
    icon: 'Car',
    color: 'bg-green-500',
    description: 'Traffic, Road Maintenance',
    descriptionHi: 'यातायात, सड़क रखरखाव'
  },
  {
    id: 'animal',
    name: 'Animal Control',
    nameHi: 'पशु नियंत्रण',
    icon: 'Dog',
    color: 'bg-orange-500',
    description: 'Animal Rescue, Control',
    descriptionHi: 'पशु बचाव, नियंत्रण'
  },
  {
    id: 'disability',
    name: 'Disability Support',
    nameHi: 'विकलांगता सहायता',
    icon: 'Accessibility',
    color: 'bg-purple-500',
    description: 'Accessibility, Support Services',
    descriptionHi: 'पहुंच, सहायता सेवाएं'
  }
];