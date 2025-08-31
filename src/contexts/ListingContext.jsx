import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const ListingContext = createContext();

export const useListing = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListing must be used within a ListingProvider');
  }
  return context;
};

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const createListing = async (listingData) => {
    setLoading(true);
    setError(null);

    try {
      // Get the current user from AuthContext
      const currentUser = user; // This comes from useAuth()  
      const listing = {
        ...listingData,
        ownerId: currentUser.id,
        ownerName: `${currentUser.firstName} ${currentUser.lastName}`,
        status: 'available',
        createdAt: new Date().toISOString(),
      };

      const response = await api.createListing(listing);
      setListings(prev => [...prev, response]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMyListings = async () => {
    setLoading(true);
    setError(null);

    try {
      const myListings = await api.getMyListings();
      setListings(myListings);
      return myListings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateListingStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const updatedListing = await api.updateListingStatus(id, status);
      setListings(prev => prev.map(listing => listing.id === id ? updatedListing : listing));
      return updatedListing;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await api.deleteListing(id);
      setListings(prev => prev.filter(listing => listing.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    listings,
    loading,
    error,
    createListing,
    getMyListings,
    updateListingStatus,
    deleteListing,
  };

  return (
    <ListingContext.Provider value={value}>
      {children}
    </ListingContext.Provider>
  );
}