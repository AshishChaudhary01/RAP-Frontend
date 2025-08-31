// src/components/customer/RentalRequests.jsx
import { useEffect, useState } from 'react';
import { useRental } from '../../contexts/RentalContext';
import { useListing } from '../../contexts/ListingContext';
import { HiOutlineCheck, HiOutlineX, HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineCalender } from 'react-icons/hi';

function RentalRequests() {
  const { rentals, loading, error, updateRentalStatus } = useRental();
  const { listings } = useListing();
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    // Filter rentals where current user is the owner
    const userListings = listings.getMyLis;
    const requests = rentals.filter(rental =>
      userListings.includes(rental.listingId)
    );
    setFilteredRequests(requests);
  }, [rentals, listings]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleApprove = async (rentalId) => {
    try {
      await updateRentalStatus(rentalId, 'approved');
    } catch (error) {
      console.error('Failed to approve rental:', error);
    }
  };

  const handleReject = async (rentalId) => {
    try {
      await updateRentalStatus(rentalId, 'rejected');
    } catch (error) {
      console.error('Failed to reject rental:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Rental Requests</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <HiOutlineCalender className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No rental requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((rental) => {
            const listing = listings.find(l => l.id === rental.listingId);
            return (
              <div key={rental.id} className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Request for {listing?.title}
                    </h3>
                    <p className="text-gray-600">From {rental.renterName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rental.status)}`}>
                    {rental.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Renter Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <HiOutlineUser className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{rental.renterName}</span>
                    </div>
                    <div className="flex items-center">
                      <HiOutlineMail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-indigo-600 cursor-pointer">Send Message</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Rental Period</p>
                    <p className="font-medium">
                      {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">Nrs. {rental.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{rental.days} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Requested on</p>
                    <p className="font-medium">{new Date(rental.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {rental.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(rental.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      <HiOutlineCheck className="h-4 w-4 inline mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(rental.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                      <HiOutlineX className="h-4 w-4 inline mr-1" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RentalRequests;