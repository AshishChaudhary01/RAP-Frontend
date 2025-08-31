// src/contexts/RentalContext.jsx
import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const RentalContext = createContext();

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};

export const RentalProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const createRental = async (rentalData) => {
    setLoading(true);
    setError(null);

    try {
      // Get the current user from AuthContext
      const currentUser = user; // This comes from useAuth()

      const rental = {
        ...rentalData,
        renterId: currentUser.id,
        renterName: `${currentUser.firstName} ${currentUser.lastName}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const response = await api.createRental(rental);
      setRentals(prev => [...prev, response]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMyRentals = async () => {
    setLoading(true);
    setError(null);

    try {
      const myRentals = await api.getMyRentals();
      setRentals(myRentals);
      return myRentals;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRentalStatus = async (rentalId, status) => {
    setLoading(true);
    setError(null);

    try {
      const updatedRental = await api.updateRentalStatus(rentalId, status);
      setRentals(prev => prev.map(rental =>
        rental.id === rentalId ? updatedRental : rental
      ));
      return updatedRental;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    rentals,
    loading,
    error,
    createRental,
    getMyRentals,
    updateRentalStatus,
  };

  return (
    <RentalContext.Provider value={value}>
      {children}
    </RentalContext.Provider>
  );
};