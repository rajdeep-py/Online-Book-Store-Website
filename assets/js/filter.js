/**
 * BookHeaven Bookstore - Filtering & Sorting Module
 */

const Filter = {
  // Apply category, price, rating, and search constraints
  apply(books, state) {
    let filtered = [...books];

    // 1. Search Query Filter
    if (state.searchQuery && window.Search) {
      filtered = window.Search.query(filtered, state.searchQuery);
    }

    // 2. Categories Genres Filter
    if (state.categories && state.categories.length > 0) {
      filtered = filtered.filter(book => 
        state.categories.includes(book.category)
      );
    }

    // 3. Price Filter
    if (state.maxPrice) {
      filtered = filtered.filter(book => book.price <= state.maxPrice);
    }
    if (state.minPrice) {
      filtered = filtered.filter(book => book.price >= state.minPrice);
    }

    // 4. Customer Rating Filter
    if (state.minRating && state.minRating > 0) {
      filtered = filtered.filter(book => book.rating >= state.minRating);
    }

    return filtered;
  },

  // Apply sorting models
  sort(books, sortBy) {
    const sorted = [...books];

    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-high-low':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'default':
      default:
        return sorted; // Returns original sequence
    }
  }
};

window.Filter = Filter;
