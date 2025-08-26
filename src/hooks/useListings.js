import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useApi } from './useApi';

export const useListings = () => {
  const [listings, setListings] = useState([]);
  const { loading, error, callApi } = useApi();

  const fetchListings = async () => {
    try {
      const data = await callApi(api.getListings);
      setListings(data);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    }
  };

  const getListing = async (id) => {
    try {
      return await callApi(() => api.getListing(id));
    } catch (err) {
      console.error('Failed to fetch listing:', err);
      throw err;
    }
  };

  const createListing = async (listingData) => {
    try {
      // This would be implemented when you have actual backend
      const newListing = {
        id: Date.now(),
        ...listingData,
        createdAt: new Date().toISOString()
      };

      setListings(prev => [...prev, newListing]);
      return newListing;
    } catch (err) {
      console.error('Failed to create listing:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    fetchListings,
    getListing,
    createListing,
    refetch: fetchListings
  };
};