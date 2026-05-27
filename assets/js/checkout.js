/**
 * BookHeaven Bookstore - Checkout Controller
 */

const Checkout = {
  selectedPaymentMethod: 'credit-card',

  // Populate purchase summary on page load
  renderSummary() {
    const listContainer = document.getElementById('review-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');

    if (!listContainer) return;

    const cart = Storage.get('bookheaven_cart', []);
    if (cart.length === 0) {
      Toast.warning('Your cart is empty! Redirecting to catalog...');
      setTimeout(() => {
        window.location.href = 'books.html';
      }, 1500);
      return;
    }

    // Populate item list
    listContainer.innerHTML = cart.map(item => `
      <div class="review-item">
        <img src="${item.image}" alt="${item.title}" class="review-item-img" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80';">
        <div class="review-item-info">
          <h5 class="review-item-title">${item.title}</h5>
          <span class="review-item-qty-price">${item.quantity} x ₹${item.price}</span>
        </div>
        <span class="review-item-price">₹${item.price * item.quantity}</span>
      </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 60;
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    if (totalEl) totalEl.textContent = `₹${total}`;
  },

  // Initialize Payment Method card clicks
  initPaymentSelectors() {
    const ccCard = document.getElementById('pm-cc');
    const codCard = document.getElementById('pm-cod');
    const ccDetailsBox = document.getElementById('cc-details-box');

    if (ccCard && codCard) {
      ccCard.addEventListener('click', () => {
        ccCard.classList.add('active');
        codCard.classList.remove('active');
        this.selectedPaymentMethod = 'credit-card';
        if (ccDetailsBox) ccDetailsBox.style.display = 'flex';
      });

      codCard.addEventListener('click', () => {
        codCard.classList.add('active');
        ccCard.classList.remove('active');
        this.selectedPaymentMethod = 'cod';
        if (ccDetailsBox) ccDetailsBox.style.display = 'none';
      });
    }
  },

  // Place order simulation
  async placeOrder(formData) {
    Loader.show();
    try {
      const user = Storage.get('bookheaven_logged_in_user');
      const cart = Storage.get('bookheaven_cart', []);

      if (!user) {
        Toast.error('Please log in to place orders.');
        Loader.hide();
        return;
      }

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal > 1000 ? 0 : 60;
      const grandTotal = subtotal + shipping;

      const payloadCart = cart.map(item => ({
        book_id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));

      // Call Backend API
      await API.createOrder(payloadCart);

      // Empty shopping cart
      Storage.set('bookheaven_cart', []);
      API.syncCart([]);
      if (window.updateCartAndWishlistBadges) {
        window.updateCartAndWishlistBadges();
      }

      Toast.success('Order placed successfully! Redirecting to Order History...');
      
      // Navigate to orders history page after delay
      setTimeout(() => {
        window.location.href = 'orders.html';
      }, 1500);

    } catch (e) {
      console.error(e);
      Toast.error('Error placing order.');
    } finally {
      Loader.hide();
    }
  }
};

window.Checkout = Checkout;

// Page initialization
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('checkout.html')) {
    // Force authentication check
    const user = Storage.get('bookheaven_logged_in_user');
    if (!user) {
      window.location.href = 'login.html?redirect=checkout.html';
      return;
    }

    Checkout.renderSummary();
    Checkout.initPaymentSelectors();

    // Bind Place Order Form submission
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Forms Input elements references
        const fullName = document.getElementById('fullName');
        const street = document.getElementById('street');
        const city = document.getElementById('city');
        const zipCode = document.getElementById('zipCode');
        const phone = document.getElementById('phone');

        let isValid = true;

        if (!fullName.value.trim()) {
          Validation.setError(fullName, 'Full Name is required.');
          isValid = false;
        } else {
          Validation.setSuccess(fullName);
        }

        if (!street.value.trim()) {
          Validation.setError(street, 'Street Address is required.');
          isValid = false;
        } else {
          Validation.setSuccess(street);
        }

        if (!city.value.trim()) {
          Validation.setError(city, 'City is required.');
          isValid = false;
        } else {
          Validation.setSuccess(city);
        }

        if (!zipCode.value.trim()) {
          Validation.setError(zipCode, 'Zip Code is required.');
          isValid = false;
        } else {
          Validation.setSuccess(zipCode);
        }

        if (!phone.value.trim() || phone.value.trim().length < 8) {
          Validation.setError(phone, 'Enter a valid phone number.');
          isValid = false;
        } else {
          Validation.setSuccess(phone);
        }

        // Validate credit card details if selected
        if (Checkout.selectedPaymentMethod === 'credit-card') {
          const cardNum = document.getElementById('card-number');
          const expiry = document.getElementById('expiry');
          const cvv = document.getElementById('cvv');

          if (!cardNum.value.trim() || cardNum.value.trim().replace(/\s/g, '').length !== 16) {
            Validation.setError(cardNum, 'Enter a valid 16-digit Card Number.');
            isValid = false;
          } else {
            Validation.setSuccess(cardNum);
          }

          if (!expiry.value.trim()) {
            Validation.setError(expiry, 'Expiry Date required (MM/YY).');
            isValid = false;
          } else {
            Validation.setSuccess(expiry);
          }

          if (!cvv.value.trim() || cvv.value.trim().length !== 3) {
            Validation.setError(cvv, 'Enter 3-digit CVV.');
            isValid = false;
          } else {
            Validation.setSuccess(cvv);
          }
        }

        if (isValid) {
          const formData = {
            fullName: fullName.value.trim(),
            street: street.value.trim(),
            city: city.value.trim(),
            zipCode: zipCode.value.trim(),
            phone: phone.value.trim()
          };
          await Checkout.placeOrder(formData);
        }
      });
    }
  }
});
