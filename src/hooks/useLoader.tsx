import React, {useState} from 'react';
import LoaderBase from '../components/LoaderOverlay';
const useLoaderOverlay = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const LoaderOverlay = () => {
    if (!isLoading) {
      return null;
    }
    return <LoaderBase />;
  };

  return {showLoader, hideLoader, LoaderOverlay};
};

export default useLoaderOverlay;
