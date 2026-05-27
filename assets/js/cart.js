/**
 * BookHeaven Bookstore - Shopping Cart Engine
 */

const Cart = {
  // Read cart items safely
  getItems() {
    return Storage.get('bookheaven_cart', []);
  },

  // Add a book to cart
  async add(bookId, quantity = 1) {
    Loader.show();
    try {
      const book = await API.getBookById(bookId);
      if (!book) {
        Toast.error('Book not found!');
        return;
      }

      let cart = this.getItems();
      const existingItemIndex = cart.findIndex(item => item.id === bookId);

      if (existingItemIndex > -1) {
        const newQty = cart[existingItemIndex].quantity + quantity;
        if (newQty > book.stock) {
          Toast.warning(`Cannot add more. Only ${book.stock} items left in stock.`);
          Loader.hide();
          return;
        }
        cart[existingItemIndex].quantity = newQty;
      } else {
        if (quantity > book.stock) {
          Toast.warning(`Cannot add. Only ${book.stock} items in stock.`);
          Loader.hide();
          return;
        }
        cart.push({
          id: book.id,
          title: book.title,
          author: book.author,
          category: book.category,
          price: book.price,
          image: book.image,
          stock: book.stock,
          quantity: quantity
        });
      }

      Storage.set('bookheaven_cart', cart);
      API.syncCart(cart);
      Toast.success(`"${book.title}" added to your cart!`);
      
      // Update global count badges
      if (window.updateCartAndWishlistBadges) {
        window.updateCartAndWishlistBadges();
      }
    } catch (e) {
      console.error(e);
      Toast.error('Error adding item to cart.');
    } finally {
      Loader.hide();
    }
  },

  // Remove a book from cart
  remove(bookId) {
    let cart = this.getItems();
    const item = cart.find(item => item.id === bookId);
    
    cart = cart.filter(item => item.id !== bookId);
    Storage.set('bookheaven_cart', cart);
    API.syncCart(cart);
    
    if (item) {
      Toast.success(`"${item.title}" removed from cart.`);
    }

    if (window.updateCartAndWishlistBadges) {
      window.updateCartAndWishlistBadges();
    }

    // Re-render cart page if on it
    if (window.location.pathname.includes('cart.html')) {
      this.renderCartPage();
    }
  },

  // Update item quantity
  updateQty(bookId, delta) {
    let cart = this.getItems();
    const itemIndex = cart.findIndex(item => item.id === bookId);

    if (itemIndex > -1) {
      const item = cart[itemIndex];
      const newQty = item.quantity + delta;

      if (newQty < 1) {
        this.remove(bookId);
        return;
      }

      if (newQty > item.stock) {
        Toast.warning(`Only ${item.stock} items left in stock.`);
        return;
      }

      item.quantity = newQty;
      Storage.set('bookheaven_cart', cart);
      API.syncCart(cart);
      
      if (window.updateCartAndWishlistBadges) {
        window.updateCartAndWishlistBadges();
      }

      // Re-render cart page if on it
      if (window.location.pathname.includes('cart.html')) {
        this.renderCartPage();
      }
    }
  },

  // Calculate totals and format values
  calculateTotals() {
    const cart = this.getItems();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 60; // Free delivery above 1000 INR
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  },

  // Render shopping cart page content dynamically
  renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const orderSummaryContainer = document.getElementById('order-summary-container');
    
    if (!cartItemsContainer || !orderSummaryContainer) return;

    const cart = this.getItems();

    if (cart.length === 0) {
      // Render Empty State
      cartItemsContainer.innerHTML = `
        <div class="empty-state" style="max-width: 100%; grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="ri-shopping-cart-2-line"></i></div>
          <h3 class="empty-state-title">Your Cart is Empty</h3>
          <p class="empty-state-desc">Looks like you haven't added any books to your cart yet. Explore our collection today.</p>
          <a href="books.html" class="btn btn-primary">Start Shopping</a>
        </div>
      `;
      orderSummaryContainer.style.display = 'none';
      return;
    }

    orderSummaryContainer.style.display = 'block';

    // Render items list
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-card fade-in">
        <img src="${item.image}" alt="${item.title}" class="cart-item-image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80';">
        <div class="cart-item-details">
          <span class="cart-item-category">${item.category}</span>
          <h4 class="cart-item-title"><a href="book-details.html?id=${item.id}">${item.title}</a></h4>
          <p class="cart-item-author">By ${item.author}</p>
          <span class="cart-item-price">₹${item.price}</span>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-adjuster">
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, -1)"><i class="ri-subtract-line"></i></button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, 1)"><i class="ri-add-line"></i></button>
          </div>
          <button class="remove-cart-item-btn" onclick="Cart.remove(${item.id})" title="Remove Item">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Render Summary calculations
    const { subtotal, shipping, total } = this.calculateTotals();
    
    orderSummaryContainer.innerHTML = `
      <div class="summary-card">
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span>₹${subtotal}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Charges</span>
          <span>${shipping === 0 ? '<span class="text-success fw-bold">FREE</span>' : '₹' + shipping}</span>
        </div>
        ${shipping > 0 ? `<div style="font-size: 0.78rem; color: var(--text-muted); text-align: right; margin-top: -0.5rem; margin-bottom: 1rem;">Add ₹${1000 - subtotal} more for FREE delivery</div>` : ''}
        
        <div class="promo-code-box">
          <input type="text" id="promo-input" class="form-control" placeholder="Promo Code">
          <button class="btn btn-secondary" onclick="Cart.applyPromo()">Apply</button>
        </div>

        <div class="summary-row total-row">
          <span>Total Amount</span>
          <span id="grand-total-val">₹${total}</span>
        </div>

        <button class="btn btn-primary checkout-btn" onclick="Cart.proceedToCheckout()">
          Proceed to Checkout <i class="ri-arrow-right-line"></i>
        </button>
        <a href="books.html" class="continue-shopping-link">
          <i class="ri-arrow-left-line"></i> Continue Shopping
        </a>
      </div>
    `;
  },

  applyPromo() {
    const input = document.getElementById('promo-input');
    if (input && input.value.trim().toUpperCase() === 'BOOKNEW10') {
      const { total } = this.calculateTotals();
      const discountedTotal = Math.round(total * 0.9);
      document.getElementById('grand-total-val').textContent = `₹${discountedTotal}`;
      Toast.success('Promo Code Applied! 10% Discount applied.');
      input.disabled = true;
    } else {
      Toast.error('Invalid promo code. Try "BOOKNEW10"');
    }
  },

  proceedToCheckout() {
    const user = Storage.get('bookheaven_logged_in_user');
    if (!user) {
      Toast.warning('Please log in first to proceed to checkout!');
      setTimeout(() => {
        window.location.href = 'login.html?redirect=cart.html';
      }, 1500);
    } else {
      window.location.href = 'checkout.html';
    }
  }
};

window.Cart = Cart;

// Render page automatically when loaded
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    Cart.renderCartPage();
  }
});
