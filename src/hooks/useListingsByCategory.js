import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useApi } from './useApi';

export const useListingsByCategory = () => {
  const [listingsByCategory, setListingsByCategory] = useState({
    newest: [],
    outdoor: [],
    tools: [],
    party: [],
  });

  const { loading, error, callApi } = useApi();

  const fetchListingsByCategory = async () => {
    try {
      const allListings = await callApi(api.getListings);

      if (!Array.isArray(allListings)) {
        throw new Error('Invalid response format from API');
      }

      const newestListings = allListings.slice(0, 6);
      const outdoorListings = allListings.filter(listing =>
        listing.category === 'outdoor' || listing.category === 'sports'
      );
      const toolsListings = allListings.filter(listing =>
        listing.category === 'tools' || listing.category === 'home-garden'
      );
      const partyListings = allListings.filter(listing =>
        listing.category === 'party' || listing.category === 'party'
      );

      setListingsByCategory({
        newest: newestListings,
        outdoor: outdoorListings,
        tools: toolsListings,
        party: partyListings,
      });
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    }
  };

  useEffect(() => {
    fetchListingsByCategory();
  }, []);

  return {
    listingsByCategory,
    loading,
    error,
    refetch: fetchListingsByCategory
  };
};