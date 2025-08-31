import { useEffect, useState } from 'react';
import { useListing } from '../../contexts/ListingContext';
import { useRental } from '../../contexts/RentalContext';
// import { useAuth } from '../../contexts/AuthContext';
import { HiOutlineCheck, HiOutlineX, HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineTrash, HiOutlineCalendar } from 'react-icons/hi';
import { Link, NavLink } from 'react-router';

function MyListings() {
  const { listings, loading: listingsLoading, error: listingsError, getMyListings, updateListingStatus, deleteListing } = useListing();
  const { rentals, loading: rentalsLoading, updateRentalStatus } = useRental();
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'requests'

  useEffect(() => {
    getMyListings();
  }, []);

  // Get rental requests for the current user's listings
  const getRentalRequests = () => {
    return rentals.filter(rental =>
      listings.some(listing => listing.id === rental.listingId)
    );
  };

  const handleDelete = (listingId) => async () => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      try {
        await deleteListing(listingId);
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'rented': return 'text-yellow-600 bg-yellow-100';
      case 'unavailable': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRentalStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleApproveRental = async (rentalId) => {
    try {
      await updateRentalStatus(rentalId, 'approved');
      await updateListingStatus(rentalId, 'rented');
    } catch (error) {
      console.error('Failed to approve rental:', error);
    }
  };

  const handleRejectRental = async (rentalId) => {
    try {
      await updateRentalStatus(rentalId, 'rejected');
    } catch (error) {
      console.error('Failed to reject rental:', error);
    }
  };

  const loading = listingsLoading || rentalsLoading;
  const error = listingsError;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Listings & Rental Requests</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'listings'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            My Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'requests'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Rental Requests ({getRentalRequests().length})
          </button>
        </nav>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Listings Tab */}
      {activeTab === 'listings' && (
        <>
          {listings.length === 0 ? (
            <div className="text-center py-12">
              <HiOutlineCalendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No listings yet. Create a listing first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg p-4 shadow-lg">
                  <img
                    src={listing.images?.[0] || '/placeholder-image.jpg'}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-indigo-600">
                      Nrs. {listing.price}
                      <span className="text-sm font-normal text-gray-500">/{listing.priceUnit}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.availability)}`}>
                      {listing.availability}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">
                    <HiOutlineLocationMarker className="h-4 w-4 inline mr-1" />
                    {listing.location}
                  </p>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex space-x-2">
                    <NavLink
                      to={`/customer/my-listings/edit/${listing.id}`}
                      className="flex-1 text-center bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Edit
                    </NavLink>
                    <button
                      className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700"
                      onClick={handleDelete(listing.id)}
                    >
                      <HiOutlineTrash className="h-4 w-4 inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Rental Requests Tab */}
      {activeTab === 'requests' && (
        <>
          {getRentalRequests().length === 0 ? (
            <div className="text-center py-12">
              <HiOutlineUser className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No rental requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getRentalRequests().map((rental) => {
                const listing = listings.find(l => l.id === rental.listingId);
                return (
                  <div key={rental.id} className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Rental Request for {listing?.title}
                        </h3>
                        <p className="text-gray-600">From {rental.renterName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRentalStatusColor(rental.status)}`}>
                        {rental.status}
                      </span>
                    </div>

                    {/* Renter Information */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-3">Renter Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <HiOutlineUser className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{rental.renterName}</span>
                        </div>
                        <div className="flex items-center">
                          <HiOutlineMail className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-indigo-600">Contact via message</span>
                        </div>
                        <div className="flex items-center">
                          <HiOutlinePhone className="h-4 w-4 text-gray-500 mr-2" />
                          <span>Phone: *******</span>
                        </div>
                      </div>
                    </div>

                    {/* Rental Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Rental Dates</p>
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

                    {/* Action Buttons */}
                    {rental.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApproveRental(rental.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                        >
                          <HiOutlineCheck className="h-4 w-4 inline mr-1" />
                          Approve Request
                        </button>
                        <button
                          onClick={() => handleRejectRental(rental.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                        >
                          <HiOutlineX className="h-4 w-4 inline mr-1" />
                          Reject Request
                        </button>
                        {/* <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700">
                          Message Renter
                        </button> */}
                      </div>
                    )}

                    {/* Status Messages */}
                    {rental.status === 'approved' && (
                      <p className="text-green-600 text-sm mt-3">
                        ✅ You approved this rental request. The renter will contact you for pickup.
                      </p>
                    )}

                    {rental.status === 'rejected' && (
                      <p className="text-red-600 text-sm mt-3">
                        ❌ You rejected this rental request.
                      </p>
                    )}

                    {rental.status === 'cancelled' && (
                      <p className="text-gray-600 text-sm mt-3">
                        📝 This rental request was cancelled by the requester.
                      </p>
                    )}

                    {rental.status === 'completed' && (
                      <p className="text-blue-600 text-sm mt-3">
                        📦 This rental has been completed successfully.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyListings;