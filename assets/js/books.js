/**
 * BookHeaven Bookstore - Book Card Rendering & Catalog Logic
 */

const Books = {
  // Generate star icons from float values (e.g. 4.7)
  renderStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="ri-star-fill"></i>';
    }
    if (hasHalfStar) {
      starsHTML += '<i class="ri-star-half-fill"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="ri-star-line"></i>';
    }

    return starsHTML;
  },

  // Generate individual book card HTML
  createBookCard(book) {
    const wishlist = Storage.get('bookheaven_wishlist', []);
    const inWishlist = wishlist.some(item => item.id === book.id);

    return `
      <div class="book-card fade-in" data-id="${book.id}">
        <div class="book-card-image-box">
          <img src="${book.image}" alt="${book.title}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/icons/book.png';">
          <button class="wishlist-toggle-btn ${inWishlist ? 'active' : ''}" data-id="${book.id}" title="Toggle Wishlist">
            <i class="ri-heart-${inWishlist ? 'fill' : 'line'}"></i>
          </button>
        </div>
        <div class="book-card-body">
          <span class="book-card-category">${book.category}</span>
          <h4 class="book-card-title"><a href="book-details.html?id=${book.id}">${book.title}</a></h4>
          <p class="book-card-author">By ${book.author}</p>
          <div class="book-card-rating">
            <div class="rating-stars">
              ${this.renderStars(book.rating)}
            </div>
            <span class="rating-number">${book.rating}</span>
          </div>
          <div class="book-card-footer">
            <div class="book-card-price-container" style="display: flex; align-items: center; flex-wrap: wrap;">
              ${book.originalPrice && book.originalPrice > book.price 
                ? `<span class="book-card-price" style="color:var(--primary-color);">₹${Number(book.price).toFixed(2)}</span>
                   <span class="book-card-discount" style="color:#d32f2f; background:rgba(211, 47, 47, 0.1); padding: 2px 6px; border-radius:4px; font-size:0.75rem; margin-left:6px; font-weight:700; letter-spacing:0.5px;">${Number(book.discountPercent).toFixed(2)}% OFF</span>
                   <span class="book-card-price-original" style="text-decoration:line-through; font-size:0.85rem; color:rgba(62, 39, 35, 0.5); margin-left:6px;">₹${Number(book.originalPrice).toFixed(2)}</span>`
                : `<span class="book-card-price" style="color:var(--primary-color);">₹${Number(book.price).toFixed(2)}</span>`
              }
            </div>
            <button class="btn btn-primary add-to-cart-btn" data-id="${book.id}">
              <i class="ri-shopping-bag-line"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Display skeleton loading placeholders
  renderSkeletons(container, count = 4) {
    if (!container) return;
    
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
      skeletonHTML += `
        <div class="book-card" style="pointer-events: none;">
          <div class="book-card-image-box skeleton-loading" style="height: 240px; background-image: none;"></div>
          <div class="book-card-body">
            <div class="skeleton-loading" style="height: 12px; width: 40%; margin-bottom: 0.6rem; border-radius: 4px;"></div>
            <div class="skeleton-loading" style="height: 16px; width: 85%; margin-bottom: 0.5rem; border-radius: 4px;"></div>
            <div class="skeleton-loading" style="height: 12px; width: 60%; margin-bottom: 1rem; border-radius: 4px;"></div>
            <div class="skeleton-loading" style="height: 12px; width: 50%; margin-bottom: 1.5rem; border-radius: 4px; margin-top: auto;"></div>
            <div class="book-card-footer" style="border-top-color: var(--border-color); padding-top: 1rem;">
              <div class="skeleton-loading" style="height: 20px; width: 35%; border-radius: 4px;"></div>
              <div class="skeleton-loading" style="height: 32px; width: 30%; border-radius: var(--border-radius-sm);"></div>
            </div>
          </div>
        </div>
      `;
    }
    container.innerHTML = skeletonHTML;
  },

  // Render lists of books dynamically
  renderList(books, container) {
    if (!container) return;
    
    if (books.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="ri-book-3-line"></i></div>
          <h3 class="empty-state-title">No Books Found</h3>
          <p class="empty-state-desc">We couldn't find any books matching your criteria. Try adjusting your filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = books.map(book => this.createBookCard(book)).join('');
    this.bindCardEvents(container);
  },

  // Bind actions click triggers
  bindCardEvents(container) {
    // Add to Cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card navigation
        const id = parseInt(btn.getAttribute('data-id'));
        if (window.Cart) {
          window.Cart.add(id);
        } else {
          console.error("Cart module is not loaded!");
        }
      });
    });

    // Wishlist togglers
    container.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card navigation
        const id = parseInt(btn.getAttribute('data-id'));
        if (window.Wishlist) {
          window.Wishlist.toggle(id, btn);
        } else {
          console.error("Wishlist module is not loaded!");
        }
      });
    });

    // Entire Card Click Redirect (excluding interactive buttons/anchors)
    container.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const isInteractive = e.target.closest('.add-to-cart-btn') || 
                              e.target.closest('.wishlist-toggle-btn') ||
                              e.target.closest('a');
        if (!isInteractive) {
          const id = card.getAttribute('data-id');
          window.location.href = `book-details.html?id=${id}`;
        }
      });
    });
  }
};

window.Books = Books;
