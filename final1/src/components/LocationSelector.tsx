import React, { useState } from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import { useLanguage } from '../hooks/useLanguage';

interface LocationSelectorProps {
  onLocationSet: () => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSet
}) => {
  const { location, loading, error, detectLocation, setManualLocation, clearError } = useLocation();
  const { t } = useLanguage();
  const [pincode, setPincode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleDetectLocation = async () => {
    clearError();
    await detectLocation();
    if (!error) {
      onLocationSet();
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await setManualLocation(pincode);
    if (!error) {
      onLocationSet();
    }
  };

  if (location) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              {t('locationDetected')}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              {location.city}, {location.state} - {location.pincode}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {!showManualInput ? (
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('useCurrentLocation')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            We'll find contacts near you automatically
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleDetectLocation}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t('detectingLocation')}
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('useCurrentLocation')}
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowManualInput(true)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {t('manualLocation')}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('enterPincode')}
          </h3>
          
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder={t('pincodePlaceholder')}
                maxLength={6}
                pattern="\d{6}"
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white text-center text-lg font-mono"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowManualInput(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {t('cancel')}
              </button>
              
              <button
                type="submit"
                disabled={loading || pincode.length !== 6}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('save')
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};