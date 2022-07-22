import { useEffect } from 'react';
import { Location as LocationWeb } from 'react-router-dom';
import { Location as LocationNative } from 'react-router-native';

export const createLocationChangeHook =
  (useLocation: () => LocationNative | LocationWeb) =>
  (action: (current: LocationWeb | LocationNative) => void) => {
    const location = useLocation();
    useEffect(() => {
      action(location);
    }, [location]);
  };
