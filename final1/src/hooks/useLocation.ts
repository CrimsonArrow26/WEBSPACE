import { useState, useEffect } from 'react';
import { Location } from '../types';

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // In a real app, you'd reverse geocode to get address details
          // For now, we'll use mock data
          const mockLocation: Location = {
            latitude,
            longitude,
            pincode: '110001',
            city: 'Mumbai',
            state: 'Maharshtra'
          };
          
          setLocation(mockLocation);
          localStorage.setItem('lastKnownLocation', JSON.stringify(mockLocation));
        } catch (err) {
          setError('Failed to get location details');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      options
    );
  };

  const setManualLocation = async (pincode: string): Promise<void> => {
    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, you'd geocode the pincode
      // For now, we'll use mock data
      const mockLocation: Location = {
        latitude: 28.6139,
        longitude: 77.2090,
        pincode,
        city: 'Mumbai',
        state: 'Maharshtra'
      };
      
      setLocation(mockLocation);
      localStorage.setItem('lastKnownLocation', JSON.stringify(mockLocation));
    } catch (err) {
      setError('Failed to get location for this PIN code');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to load last known location
    const saved = localStorage.getItem('lastKnownLocation');
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved location');
      }
    }
  }, []);

  return {
    location,
    loading,
    error,
    detectLocation,
    setManualLocation,
    clearError: () => setError(null)
  };
};