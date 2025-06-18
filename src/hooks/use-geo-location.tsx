'use client';
import React from 'react';

// Define the return type for the hook
interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = React.useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: err.message || 'Unable to retrieve your location',
        loading: false,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error);

    // Cleanup not needed for one-time geolocation call
  }, []); // Empty dependency array for one-time effect

  return location;
};

export default useGeolocation;