// src/pages/customer/AddListing.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router';
import { useApi } from '../../hooks/useApi';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlinePlus, HiOutlineShieldCheck, HiOutlineTrash } from 'react-icons/hi';
import { HiOutlineArrowLeftEndOnRectangle } from 'react-icons/hi2';

function AddListing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, error, callApi } = useApi();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    priceUnit: 'day',
    category: '',
    location: '',
    availability: 'available'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listingData = {
        ...formData,
        price: Number(formData.price),
        images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400"],
        ownerId: user.id,
        ownerName: `${user.firstName} ${user.lastName}`,
        createdAt: new Date().toISOString()
      };

      await callApi(() => api.createListing(listingData));
      alert('Listing created successfully!');
      navigate('/customer/my-listings');
    } catch (error) {
      alert('Failed to create listing: ' + error.message);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Simulate image upload - in real app, you'd upload to cloud storage
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      isNew: true
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {user ? (
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/customer/my-listings"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
              Back to My Listings
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Listing</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Images *
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Add photos of your item. First image will be the main display photo.
              </p>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}

                {images.length < 8 && (
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 transition-colors">
                    <HiOutlinePhotograph className="h-8 w-8 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center px-2">
                      Add Photos
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {images.length === 0 && (
                <p className="text-red-500 text-sm mt-2">Please add at least one image</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Professional Camera, Mountain Bike, Power Tools"
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
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your item in detail. Include brand, model, condition, accessories included, and any special features."
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Rental Price *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="1"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      name="priceUnit"
                      value={formData.priceUnit}
                      onChange={handleInputChange}
                      className="h-full border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="hour">per hour</option>
                      <option value="day">per day</option>
                      <option value="week">per week</option>
                      <option value="month">per month</option>
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
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="photography">Photography Equipment</option>
                  <option value="tools">Tools & Equipment</option>
                  <option value="outdoor">Outdoor & Adventure Gear</option>
                  <option value="sports">Sports Equipment</option>
                  <option value="party">Party & Event Supplies</option>
                  <option value="home">Home & Garden</option>
                  <option value="vehicle">Vehicles & Transportation</option>
                  <option value="clothing">Clothing & Accessories</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Kathmandu, Nepal or specific address"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Specifications (Optional) */}
            {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specifications (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Brand"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Model"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Condition"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Size/Weight"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div> */}

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="available">Available for Rent</option>
                <option value="unavailable">Not Available</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions. I confirm that this item is in good working condition
                  and I will be responsible for any damages during the rental period.
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                to="/customer/my-listings"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || images.length === 0}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>Creating Listing...</>
                ) : (
                  <>Create Listing</>
                )}
              </button>
            </div>
          </form>
        </div>) : (
        <div className='flex justify-center mx-auto text-white mb-6 font-bold bg-indigo-600 py-3 rounded-md max-w-[300px]'>
          <NavLink to="/auth/login" className="inline-flex items-center text-white hover:text-white">
            <HiOutlineShieldCheck className="h-5 w-5 mr-2 flex my-auto" /> <span className='px-2'>Login to rent this item!</span>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default AddListing;