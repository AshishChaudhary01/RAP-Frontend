// src/pages/customer/Listing.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router';
import { useApi } from '../../hooks/useApi';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import RentalModal from '../../components/customer/RentalModal';
import {
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineArrowLeft,
  HiOutlineLocationMarker,
  HiOutlineX,
} from 'react-icons/hi';

function Listing() {
  const { id } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showRentalModal, setShowRentalModal] = useState(false);
  const { loading, error, callApi } = useApi();

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const listingData = await callApi(() => api.getListing(id));
        setListing(listingData);

        const listingReviews = await callApi(() => api.getReviews(id));
        setReviews(listingReviews);
      } catch (err) {
        console.error('Failed to fetch listing:', err);
      }
    };

    fetchListingData();
  }, [id]);

  const handleRent = () => {
    if (!selectedDate) {
      alert('Please select a rental date');
      return;
    }

    if (!user) {
      alert('Please login to rent this item');
      return;
    }

    setShowRentalModal(true);
  };

  const handleSendMessage = () => {
    if (!user) {
      alert('Please login to send a message');
      return;
    }

    console.log('Message sent to owner:', message);
    setMessage('');
    // Implement actual message sending logic
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading listing: {error}</p>
          <Link to="/customer" className="text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p>Listing not found</p>
        <Link to="/customer" className="text-indigo-600 hover:text-indigo-500">
          ← Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24"> {/* Extra padding for sticky section */}
      {/* Header */}
      <div className="bg-white p-4 sticky top-[65px] z-10 border-b border-gray-300">
        <div className="max-w-4xl mx-auto">
          <Link to="/customer" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
            Back to listings
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={listing.images?.[0] || '/placeholder-image.jpg'}
                alt={listing.title}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>

            {/* Additional Images Grid */}
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {listing.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${listing.title} ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>

            {/* Specifications */}
            {listing.specifications && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(listing.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between pb-2">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <HiOutlineUser className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.reviewerName}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <HiOutlineStar
                              key={i}
                              className={`h-4 w-4 ${i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              Nrs. {listing.price}
              <span className="text-sm font-normal text-gray-500">/{listing.price}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <HiOutlineLocationMarker className="h-5 w-5 mr-2" />
              <span>{listing.location}</span>
            </div>

            {/* Item Available */}
            {listing.availability === 'available' && (
              <div className="flex items-center text-green-600 mb-6">
                <HiOutlineShieldCheck className="h-5 w-5 mr-2" />
                <span className="font-medium">Available for rent</span>
              </div>
            )}

            {/* User Loggedin and user is the owner of the listed item */}
            {user && listing.ownerId === user.id && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-4">
                <p className="text-sm">You are the owner of this listing.</p>
              </div>
            )}
            {listing.availability !== 'available' && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                <div className="flex items-center">
                  <HiOutlineX className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-medium">This item is currently unavailable</p>
                    <p className="text-sm mt-1">
                      {listing.availability === 'rented'
                        ? 'This item is currently rented out to another user.'
                        : 'This item is not available for rent at the moment.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!user && listing.availability === "available" && (
              <div className='flex justify-center text-white mb-6 font-bold bg-indigo-600 py-3 rounded-md'>
                <NavLink to="/auth/login" className="inline-flex items-center text-white hover:text-white">
                  <HiOutlineShieldCheck className="h-5 w-5 mr-2 flex my-auto" /> <span className='px-2'>Login to rent this item!</span>
                </NavLink>
              </div>
            )}

            {/* User Loggedin and user is not the owner of the listed item */}
            {user && listing.ownerId !== user.id && listing.availability === "available" &&(
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose rental date
                  </label>
                  <div className="relative">
                    <HiOutlineCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleRent}
                  disabled={!selectedDate}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Request to Rent
                </button>
              </div>
            )}
          </div>

          {/* Owner Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">About the owner</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <HiOutlineUser className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">John Doe</h4>
                <div className="flex items-center">
                  <HiOutlineStar className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8 (24 reviews)</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Message Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {showRentalModal && listing && (
        <RentalModal
          listing={listing}
          isOpen={showRentalModal}
          onClose={() => setShowRentalModal(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

export default Listing;