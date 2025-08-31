class ApiService {
  constructor(baseURL = 'http://localhost:3001') {
    this.baseURL = baseURL;
    // Remove all .bind() calls from constructor since we're using arrow functions
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

  // ✅ Use arrow functions consistently (they auto-bind 'this')
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
      method: 'PATCH',
      body: listingData,
    });
  }

  deleteListing = async (id) => {
    return this.request(`/listings/${id}`, {
      method: 'DELETE',
    });
  }

  login = async (credentials) => {
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

  register = async (userData) => {
    return this.request('/users', {
      method: 'POST',
      body: userData
    });
  }

  getReviews = async (listingId) => {
    return this.request(`/reviews?listingId=${listingId}`);
  }

  createRental = async (rentalData) => {
    return this.request('/rentals', {
      method: 'POST',
      body: rentalData,
    });
  }

  getRentals = async () => {
    return this.request('/rentals');
  }

  getRental = async (id) => {
    return this.request(`/rentals/${id}`);
  }

  updateRentalStatus = async (id, status) => {
    return this.request(`/rentals/${id}`, {
      method: 'PATCH',
      body: { status },
    });
  }

  getMyRentals = async () => {
    const rentals = await this.getRentals();
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
    return rentals.filter(rental => rental.renterId === currentUserId);
  }

  getRentalRequests = async () => {
    const rentals = await this.getRentals();
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
    return rentals.filter(rental => rental.ownerId === currentUserId);
  }

  getMyListings = async () => {
    const listings = await this.getListings();
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;
    return listings.filter(listing => listing.ownerId === currentUserId);
  }
}

export const api = new ApiService();