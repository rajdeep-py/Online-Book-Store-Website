/**
 * BookHeaven Bookstore - API & Data Service
 */

// Bulletproof Inlined Fallbacks in case of CORS (file:// protocol)
const MOCK_BOOKS = [
  {
    "id": 1,
    "title": "Atomic Habits",
    "author": "James Clear",
    "category": "Self Help",
    "price": 499,
    "rating": 4.8,
    "stock": 20,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "description": "An easy and proven way to build good habits and break bad ones. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits."
  },
  {
    "id": 2,
    "title": "Deep Work",
    "author": "Cal Newport",
    "category": "Self Help",
    "price": 399,
    "rating": 4.6,
    "stock": 15,
    "image": "https://images-na.ssl-images-amazon.com/images/I/4175fWWDooL._SX322_BO1,204,203,200_.jpg",
    "description": "Rules for focused success in a distracted world. Deep Work is the ability to focus without distraction on a cognitively demanding task, allowing you to quickly master complicated information and produce better results."
  },
  {
    "id": 3,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Technology",
    "price": 899,
    "rating": 4.9,
    "stock": 12,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41xShCOK5mL._SX379_BO1,204,203,200_.jpg",
    "description": "A handbook of agile software craftsmanship. Even bad code can function, but if code isn't clean, it can bring a development organization to its knees. This book is a must-read for any software engineer."
  },
  {
    "id": 4,
    "title": "The Pragmatic Programmer",
    "author": "David Thomas & Andrew Hunt",
    "category": "Technology",
    "price": 999,
    "rating": 4.9,
    "stock": 8,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41HFl4vN1jL._SX379_BO1,204,203,200_.jpg",
    "description": "Your journey to mastery. One of the most significant books on software development, helping programmers create better software and rediscover the joy of coding."
  },
  {
    "id": 5,
    "title": "Zero to One",
    "author": "Peter Thiel",
    "category": "Business",
    "price": 450,
    "rating": 4.5,
    "stock": 25,
    "image": "https://images-na.ssl-images-amazon.com/images/I/4137RDgdV6L._SX322_BO1,204,203,200_.jpg",
    "description": "Notes on startups, or how to build the future. Peter Thiel shows how we can find singular ways to create those new things, moving from 0 to 1 rather than copying what already exists."
  },
  {
    "id": 6,
    "title": "The Intelligent Investor",
    "author": "Benjamin Graham",
    "category": "Business",
    "price": 649,
    "rating": 4.7,
    "stock": 18,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51H7gD5S2BL._SX330_BO1,204,203,200_.jpg",
    "description": "The definitive book on value investing. Benjamin Graham's classic bestseller has taught and inspired people worldwide, offering sound principles for financial success."
  },
  {
    "id": 7,
    "title": "Dune",
    "author": "Frank Herbert",
    "category": "Sci-Fi",
    "price": 599,
    "rating": 4.7,
    "stock": 30,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41-PscQW-8L._SX316_BO1,204,203,200_.jpg",
    "description": "The masterpiece of science fiction. Dune is a triumph of the imagination, set on the desert planet Arrakis, telling the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world."
  },
  {
    "id": 8,
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "category": "Sci-Fi",
    "price": 549,
    "rating": 4.8,
    "stock": 14,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51w7c-kC8NL._SX323_BO1,204,203,200_.jpg",
    "description": "A lone astronaut must save the earth from disaster in this incredible novel from the author of The Martian. An edge-of-your-seat science-fiction thriller."
  },
  {
    "id": 9,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "category": "Fiction",
    "price": 299,
    "rating": 4.7,
    "stock": 40,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg",
    "description": "A gorgeous fable about following your dreams. This inspiring story tells the tale of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure."
  },
  {
    "id": 10,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "category": "Fiction",
    "price": 349,
    "rating": 4.8,
    "stock": 22,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51h1Tssi3mL._SX324_BO1,204,203,200_.jpg",
    "description": "A timeless classic exploring human behavior, class, courage, and compassion, through the eyes of young Scout Finch in the Deep South."
  },
  {
    "id": 11,
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "category": "Business",
    "price": 399,
    "rating": 4.8,
    "stock": 35,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41r6F2LRf8L._SX323_BO1,204,203,200_.jpg",
    "description": "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know. It's about how you behave."
  },
  {
    "id": 12,
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "category": "Self Help",
    "price": 599,
    "rating": 4.5,
    "stock": 10,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41b1dZFt3RL._SX322_BO1,204,203,200_.jpg",
    "description": "A revolutionary exploration of the mind. Kahneman explains the two systems that drive the way we think: System 1 (fast, intuitive, emotional) and System 2 (slower, more deliberative, logical)."
  },
  {
    "id": 13,
    "title": "Designing Data-Intensive Applications",
    "author": "Martin Kleppmann",
    "category": "Technology",
    "price": 1299,
    "rating": 4.9,
    "stock": 7,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51Z9P-1T5FL._SX379_BO1,204,203,200_.jpg",
    "description": "The big ideas behind reliable, scalable, and maintainable systems. This book helps you navigate the diverse and fast-changing landscape of databases, queues, and processing engines."
  },
  {
    "id": 14,
    "title": "Neuromancer",
    "author": "William Gibson",
    "category": "Sci-Fi",
    "price": 449,
    "rating": 4.4,
    "stock": 15,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51L-d2d%2BgHL._SX321_BO1,204,203,200_.jpg",
    "description": "The matrix-defining cyberpunk classic. William Gibson's award-winning masterpiece remains a seminal work of sci-fi that imagined the digital world before the internet existed."
  },
  {
    "id": 15,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "price": 279,
    "rating": 4.6,
    "stock": 28,
    "image": "https://images-na.ssl-images-amazon.com/images/I/51G39mK7tRL._SX310_BO1,204,203,200_.jpg",
    "description": "The quintessential novel of the Jazz Age. Gatsby's fabulous parties, his desperate love for Daisy Buchanan, and the tragic vanity of the American Dream."
  },
  {
    "id": 16,
    "title": "You Don't Know JS Yet",
    "author": "Kyle Simpson",
    "category": "Technology",
    "price": 699,
    "rating": 4.8,
    "stock": 11,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41-lS5vG8SL._SX331_BO1,204,203,200_.jpg",
    "description": "A comprehensive deep-dive into JavaScript. Simpson explores scope, closures, objects, prototypes, types, and grammar in an approachable yet extremely thorough manner."
  },
  {
    "id": 17,
    "title": "Good to Great",
    "author": "Jim Collins",
    "category": "Business",
    "price": 549,
    "rating": 4.6,
    "stock": 19,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41E9-kY0eGL._SX326_BO1,204,203,200_.jpg",
    "description": "Why some companies make the leap... and others don't. Collins and his team identify the key characteristics of companies that transition from mediocre performance to greatness."
  },
  {
    "id": 18,
    "title": "Start with Why",
    "author": "Simon Sinek",
    "category": "Business",
    "price": 420,
    "rating": 4.7,
    "stock": 24,
    "image": "https://images-na.ssl-images-amazon.com/images/I/416T0G4yD1L._SX324_BO1,204,203,200_.jpg",
    "description": "How great leaders inspire everyone to take action. Simon Sinek shows that the leaders who've had the greatest influence in the world all think, act, and communicate the same way — and it's the opposite of everyone else."
  },
  {
    "id": 19,
    "title": "Foundation",
    "author": "Isaac Asimov",
    "category": "Sci-Fi",
    "price": 499,
    "rating": 4.7,
    "stock": 16,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41zSjPpejIL._SX304_BO1,204,203,200_.jpg",
    "description": "The legendary saga of the fall and rebirth of galactic civilization. Foundation tells the story of Hari Seldon, who uses psychohistory to predict the collapse of the Galactic Empire."
  },
  {
    "id": 20,
    "title": "Man's Search for Meaning",
    "author": "Viktor E. Frankl",
    "category": "Self Help",
    "price": 299,
    "rating": 4.9,
    "stock": 33,
    "image": "https://images-na.ssl-images-amazon.com/images/I/41VjU7tJmPL._SX327_BO1,204,203,200_.jpg",
    "description": "The classic tribute to hope from the Holocaust. Psychiatrist Viktor Frankl's memoir of his struggle for survival in Auschwitz, and his psychotherapeutic method for finding meaning."
  }
];

const MOCK_CATEGORIES = [
  { "id": 1, "name": "Self Help", "slug": "self-help", "icon": "ri-mind-map", "count": 4 },
  { "id": 2, "name": "Technology", "slug": "technology", "icon": "ri-code-s-slash-line", "count": 4 },
  { "id": 3, "name": "Business", "slug": "business", "icon": "ri-line-chart-line", "count": 5 },
  { "id": 4, "name": "Sci-Fi", "slug": "sci-fi", "icon": "ri-rocket-2-line", "count": 4 },
  { "id": 5, "name": "Fiction", "slug": "fiction", "icon": "ri-book-open-line", "count": 3 }
];

const MOCK_USERS = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "phone": "+1 234 567 890",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
    "addresses": [
      {
        "id": 101,
        "tag": "Home",
        "fullName": "John Doe",
        "street": "123 Library Lane",
        "city": "Booktown",
        "state": "NY",
        "zipCode": "10001",
        "country": "United States",
        "phone": "+1 234 567 890",
        "isDefault": true
      }
    ],
    "orders": [
      {
        "orderId": "ORD-2026-98745",
        "date": "2026-05-10",
        "status": "Delivered",
        "total": 1397,
        "items": [
          { "id": 1, "title": "Atomic Habits", "price": 499, "quantity": 1 },
          { "id": 3, "title": "Clean Code", "price": 899, "quantity": 1 }
        ]
      }
    ]
  }
];

const BASE_URL = 'http://localhost:8080/book_store_backend';

function mapBackendBook(book) {
  if (book.title) return book; // Already in frontend format

  let imagePath = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80';
  if (book.book_photo) {
    if (book.book_photo.startsWith('http')) {
      imagePath = book.book_photo;
    } else {
      imagePath = API.getImageUrl(book.book_photo);
    }
  } else if (book.book_name) {
    // Attempt fallback based on book name
    imagePath = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80';
  }

  return {
    id: book.book_id,
    title: book.book_name,
    author: book.author_name,
    category: book.book_category || 'General',
    price: book.final_selling_price || book.price,
    rating: book.rating || 4.5,
    stock: book.stock_amount || 0,
    image: imagePath,
    description: book.book_description || ''
  };
}

const API = {
  // Check if running on file:// protocol (local file)
  isLocalProtocol() {
    return window.location.protocol === 'file:';
  },

  async getBooks() {
    try {
      const response = await fetch(`${BASE_URL}/api/books`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const backendBooks = data.items || [];
      return backendBooks.map(mapBackendBook);
    } catch (e) {
      console.warn("Backend API fetch failed, falling back to local files or mock.", e);
      if (this.isLocalProtocol()) {
        return MOCK_BOOKS;
      }
      try {
        const response = await fetch('assets/data/books.json');
        return await response.json();
      } catch (err) {
        return MOCK_BOOKS;
      }
    }
  },

  async getCategories() {
    if (this.isLocalProtocol()) {
      return MOCK_CATEGORIES;
    }
    try {
      const response = await fetch('assets/data/categories.json');
      return await response.json();
    } catch (e) {
      console.warn("Fetch failed, falling back to local mock categories.", e);
      return MOCK_CATEGORIES;
    }
  },

  async getUsers() {
    if (this.isLocalProtocol()) {
      // For local session, fetch from Storage if modified, else mock
      const storedUsers = Storage.get('bookheaven_users_db');
      if (!storedUsers) {
        Storage.set('bookheaven_users_db', MOCK_USERS);
        return MOCK_USERS;
      }
      return storedUsers;
    }
    try {
      const response = await fetch('assets/data/users.json');
      const data = await response.json();
      const storedUsers = Storage.get('bookheaven_users_db');
      if (!storedUsers) {
        Storage.set('bookheaven_users_db', data);
        return data;
      }
      return storedUsers;
    } catch (e) {
      console.warn("Fetch failed, falling back to local mock users.", e);
      const storedUsers = Storage.get('bookheaven_users_db');
      if (!storedUsers) {
        Storage.set('bookheaven_users_db', MOCK_USERS);
        return MOCK_USERS;
      }
      return storedUsers;
    }
  },

  async getBookById(id) {
    const books = await this.getBooks();
    return books.find(book => book.id === parseInt(id));
  },

  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Authentication failed');
    }
    return await response.json();
  },

  async register(name, email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: name,
        email: email,
        password: password
      }),
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
    return await response.json();
  },
  getSessionUrl(url) {
    const sessionId = Storage.get('bookheaven_session_id');
    return sessionId ? `${url};jsessionid=${sessionId}` : url;
  },

  getImageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:image')) return path;
    try {
      if (path.startsWith('/book_store_backend')) {
        const urlObj = new URL(BASE_URL);
        return urlObj.origin + path + '?t=' + new Date().getTime();
      }
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      return `${BASE_URL}/${cleanPath}?t=` + new Date().getTime();
    } catch(e) {
      return path;
    }
  },

  async getProfile() {
    const response = await fetch(this.getSessionUrl(`${BASE_URL}/api/profile`), {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve profile');
    }
    return await response.json();
  },

  async updateProfile(name, email, phone, address, profilePhoto) {
    const payload = {
      full_name: name,
      email: email,
      phone_number: phone,
      address: address
    };
    if (profilePhoto) {
      payload.profile_photo = profilePhoto;
    }
    
    const response = await fetch(this.getSessionUrl(`${BASE_URL}/api/profile`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update profile');
    }
    return await response.json();
  },

  async syncCart(cartItems) {
    if (!Storage.get('bookheaven_session_id')) return; // Only sync if logged in
    try {
      await fetch(this.getSessionUrl(`${BASE_URL}/api/cart`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cartItems }),
        credentials: 'include'
      });
    } catch (e) {
      console.warn("Failed to sync cart to backend", e);
    }
  },

  async getCart() {
    if (!Storage.get('bookheaven_session_id')) return null;
    try {
      const response = await fetch(this.getSessionUrl(`${BASE_URL}/api/cart`), {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const items = data.items || [];
        return items.map(item => ({
          ...item,
          id: item.id || item.book_id
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch cart from backend", e);
    }
    return null;
  },

  async createOrder(cartItems) {
    const response = await fetch(this.getSessionUrl(`${BASE_URL}/api/orders`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cartItems }),
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Order placement failed');
    }
    return await response.json();
  },

  async getOrders() {
    const response = await fetch(this.getSessionUrl(`${BASE_URL}/api/orders`), {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve orders');
    }
    return await response.json();
  }
};

window.API = API;
