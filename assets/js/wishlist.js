/**
 * BookHeaven Bookstore - Wishlist Engine
 */

const Wishlist = {
  // Read wishlist items
  getItems() {
    return Storage.get('bookheaven_wishlist', []);
  },

  // Toggle favorite status on card click
  async toggle(bookId, buttonEl = null) {
    let wishlist = this.getItems();
    const existingIndex = wishlist.findIndex(item => item.id === bookId);

    if (existingIndex > -1) {
      // Remove from wishlist
      const item = wishlist[existingIndex];
      wishlist = wishlist.filter(item => item.id !== bookId);
      Storage.set('bookheaven_wishlist', wishlist);
      
      Toast.success(`"${item.title}" removed from your wishlist.`);
      
      if (buttonEl) {
        buttonEl.classList.remove('active');
        const icon = buttonEl.querySelector('i');
        if (icon) {
          icon.className = 'ri-heart-line';
        }
      }
    } else {
      // Add to wishlist
      Loader.show();
      try {
        const book = await API.getBookById(bookId);
        if (!book) {
          Toast.error('Book not found!');
          return;
        }

        wishlist.push(book);
        Storage.set('bookheaven_wishlist', wishlist);

        Toast.success(`"${book.title}" added to your wishlist!`);

        if (buttonEl) {
          buttonEl.classList.add('active');
          const icon = buttonEl.querySelector('i');
          if (icon) {
            icon.className = 'ri-heart-fill';
          }
        }
      } catch (e) {
        console.error(e);
        Toast.error('Error adding to wishlist.');
      } finally {
        Loader.hide();
      }
    }

    if (window.updateCartAndWishlistBadges) {
      window.updateCartAndWishlistBadges();
    }

    // Re-render wishlist page if on it
    if (window.location.pathname.includes('wishlist.html')) {
      this.renderWishlistPage();
    }
  },

  // Render wishlist catalog page
  renderWishlistPage() {
    const container = document.getElementById('wishlist-books-grid');
    if (!container) return;

    const wishlist = this.getItems();

    if (wishlist.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; max-width: 100%;">
          <div class="empty-state-icon"><i class="ri-heart-3-line"></i></div>
          <h3 class="empty-state-title">Your Wishlist is Empty</h3>
          <p class="empty-state-desc">You haven't saved any books to your wishlist yet. Browse our catalog to select your favorites.</p>
          <a href="books.html" class="btn btn-primary">Discover Books</a>
        </div>
      `;
      return;
    }

    // Render list of cards (reusing Books component rendering)
    if (window.Books) {
      window.Books.renderList(wishlist, container);
    }
  }
};

window.Wishlist = Wishlist;

// Render page automatically when loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('wishlist.html')) {
    Wishlist.renderWishlistPage();
  }
});
