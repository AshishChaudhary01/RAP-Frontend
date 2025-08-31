import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useApi } from '../../hooks/useApi';
import { api } from '../../services/api';
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';

function MyListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, callApi } = useApi();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    priceUnit: 'day',
    category: '',
    location: '',
    availability: 'available'
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingData = await callApi(() => api.getListing(id));
        setListing(listingData);
        setFormData({
          title: listingData.title || '',
          description: listingData.description || '',
          price: listingData.price || '',
          priceUnit: listingData.priceUnit || 'day',
          category: listingData.category || '',
          location: listingData.location || '',
          availability: listingData.availability || 'available'
        });
        setImages(listingData.images || []);
      } catch (err) {
        console.error('Failed to fetch listing:', err);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        images: images
      };

      if (id) {
        await callApi(() => api.updateListing(id, updatedData));
        alert('Listing updated successfully!');
      } else {
        await callApi(() => api.createListing(updatedData));
        alert('Listing created successfully!');
        navigate('/customer/my-listings');
      }
    } catch (error) {
      alert('Failed to save listing: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await callApi(() => api.deleteListing(id));
        alert('Listing deleted successfully!');
        navigate('/customer/my-listings');
      } catch (error) {
        alert('Failed to delete listing: ' + error.message);
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Simulate image upload - in real app, you'd upload to cloud storage
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
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
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/customer/my-listings"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
          Back to My Listings
        </Link>
        {id && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
          >
            <HiOutlineTrash className="h-4 w-4 inline mr-1" />
            Delete Listing
          </button>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Edit Listing' : 'Create New Listing'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Listing Images
          </label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Listing ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            ))}
            <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-600">
              <HiOutlinePhotograph className="h-8 w-8 text-gray-400" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="price"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select
                  value={formData.priceUnit}
                  onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                  className="h-full border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="day">per day</option>
                  <option value="hour">per hour</option>
                  <option value="week">per week</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="outdoor">Outdoor Gear</option>
              <option value="tools">Tools</option>
              <option value="sports">Sports Equipment</option>
              <option value="home">Home & Garden</option>
            </select>
          </div>
        </div>

        {/* Location & Availability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <input
              type="text"
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <select
              id="availability"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/customer/my-listings"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            onClick={() => { handleSubmit(id); }}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (id ? 'Update Listing' : 'Create Listing')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyListingDetails;