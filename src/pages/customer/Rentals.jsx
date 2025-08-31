import { useEffect } from 'react';
import { useRental } from '../../contexts/RentalContext';
import { useAuth } from '../../contexts/AuthContext';
import { HiOutlineCalendar, HiOutlineTrash } from 'react-icons/hi';

function Rentals() {
  const { rentals, loading, error, getMyRentals, updateRentalStatus } = useRental();
  const { user } = useAuth();
  // const [listings, setListings] = useState({});

  useEffect(() => {
    getMyRentals();
  }, []);

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

  // Check if current user is the renter
  const isRenter = (rental) => {
    return rental.renterId === user?.id;
  };

  const canCancel = (rental) => {
    return isRenter(rental) && rental.status === 'pending';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Rentals</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {rentals.length === 0 ? (
        <div className="text-center py-12">
          <HiOutlineCalendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No rentals yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600">
                    Owner: <span className="font-medium">{rental.ownerName}</span>
                    {/* {isOwner(rental) ? `From customer` : 'From owner'} */}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rental.status)}`}>
                  {rental.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Dates</p>
                  <p className="font-medium">
                    {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
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
              <div className="flex space-x-3">
                {/* Renter Actions */}
                {canCancel(rental) && (
                  <button
                    onClick={() => updateRentalStatus(rental.id, 'cancelled')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    <HiOutlineTrash className="h-4 w-4 inline mr-1" />
                    Cancel Request
                  </button>
                )}
              </div>

              {/* Status Messages */}
              {rental.status === 'approved' && isRenter(rental) && (
                <p className="text-green-600 text-sm mt-3">
                  ✅ Your rental request has been approved! Please contact the owner for pickup details.
                </p>
              )}

              {rental.status === 'rejected' && isRenter(rental) && (
                <p className="text-red-600 text-sm mt-3">
                  ❌ Your rental request was rejected by the owner.
                </p>
              )}

              {rental.status === 'cancelled' && (
                <p className="text-gray-600 text-sm mt-3">
                  📝 This rental has been cancelled.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rentals;