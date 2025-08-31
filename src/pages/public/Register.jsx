import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import { Link, useNavigate } from 'react-router';

function Register() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { loading, error: apiError, callApi, clearError } = useApi();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!userData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!userData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(userData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    if (!userData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!userData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await callApi(() => register({
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone.trim(),
        password: userData.password,
        dateOfBirth: userData.dateOfBirth,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        isVerified: false,
        rating: 0,
        createdAt: new Date().toISOString()
      }));

      navigate('/auth/login', {
        state: { message: 'Registration successful! Please login.' }
      });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="RAP"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                First Name *
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                Last Name *
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address *
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
              Phone Number *
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm/6 font-medium text-gray-900">
              Date of Birth *
            </label>
            <div className="mt-1">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={userData.dateOfBirth}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
              Address *
            </label>
            <div className="mt-1">
              <input
                id="address"
                name="address"
                type="text"
                value={userData.address}
                onChange={handleChange}
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password *
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password *
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm/6"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={userData.agreeToTerms}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="font-medium text-gray-900">
                I agree to the{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a> *
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>

          {apiError && (
            <div className="rounded-md bg-red-50 p-3">
              <div className="text-sm text-red-700">{apiError}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm/6 text-gray-500">
          <p className="mt-4">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Click here to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register