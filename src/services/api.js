// src/services/api.js - Updated with actual fetch calls
class ApiService {
  constructor(baseURL = '/') {
    this.baseURL = baseURL;
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
      password: '1234', // In real app, this would be hashed
      firstName: 'Demo',
      lastName: 'User',
      avatar: '/avatars/user1.jpg',
      isVerified: true,
      rating: 4.5
    }
  ];

  async login(credentials) {
    // For mock data, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Return mock response similar to what Spring Boot would return
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = this.mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user (in real app, this would be saved to db)
    const newUser = {
      id: this.mockUsers.length + 1,
      ...userData,
      avatar: '/avatars/default.jpg',
      isVerified: false,
      rating: 0
    };

    this.mockUsers.push(newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    };
  }

  // Add other API methods that will work with db.json
  async getListings() {
    return this.request('../../public/db').then(data => data.listings || []);
  }

  async getListing(id) {
    const listings = await this.getListings();
    return listings.find(listing => listing.id === parseInt(id));
  }
}

export const api = new ApiService();