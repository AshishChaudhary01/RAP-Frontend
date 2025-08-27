// src/services/api.js - Updated with actual fetch calls
class ApiService {
  constructor(baseURL = 'http://localhost:3001') {
    this.baseURL = baseURL;

    // Bind methods to maintain 'this' context
    this.request = this.request.bind(this);
    this.getListings = this.getListings.bind(this);
    this.getListing = this.getListing.bind(this);
    this.createListing = this.createListing.bind(this);
    this.updateListing = this.updateListing.bind(this);
    this.deleteListing = this.deleteListing.bind(this);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Network error. Please try again.');
    }
  }

  // Mock user data for development
  mockUsers = [
    {
      id: 1,
      email: 'demo@example.com',
      password: 'demo',
      firstName: '1234',
      lastName: 'User',
      avatar: 'https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfDJ8MHx8fDI%3D',
      isVerified: true,
      rating: 4.5
    }
  ];

  // Use arrow functions to automatically bind 'this'
  getListings = async () => {
    return this.request('/listings');
  }

  getListing = async (id) => {
    return this.request(`/listings/${id}`);
  }

  createListing = async (listingData) => {
    return this.request('/listings', {
      method: 'POST',
      body: listingData,
    });
  }

  updateListing = async (id, listingData) => {
    return this.request(`/listings/${id}`, {
      method: 'PUT',
      body: listingData,
    });
  }

  deleteListing = async (id) => {
    return this.request(`/listings/${id}`, {
      method: 'DELETE',
    });
  }

  async login(credentials) {
    // Simulate API call to db.json users
    const users = await this.request('/users');
    const user = users.find(u =>
      u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      token: 'mock-jwt-token',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
      }
    };
  }

  async register(userData) {
    // POST to users endpoint
    return this.request('/users', {
      method: 'POST',
      body: userData
    });
  }
}

export const api = new ApiService();