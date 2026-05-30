/**
 * BookHeaven Bookstore - Main Application Controller
 */

// Helper to inject the navigation bar component
function getNavbarHTML() {
  return `
    <header class="header" id="global-header">
      <div class="container nav-container">
        <!-- Brand Logo -->
        <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 8px;">
          <img src="assets/images/logos/logo.png" alt="Logo" class="logo-icon" style="height: 32px; width: auto; vertical-align: middle;">
          Book<span>Heaven</span>
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="nav-menu">
          <li><a href="index.html" class="nav-link" id="nav-home">Home</a></li>
          <li><a href="books.html" class="nav-link" id="nav-shop">Browse Books</a></li>
          <li><a href="about.html" class="nav-link" id="nav-about">About Us</a></li>
          <li><a href="contact.html" class="nav-link" id="nav-contact">Contact</a></li>
        </ul>

        <!-- Header Action Elements -->
        <div class="nav-actions">
          <!-- Wishlist Action -->
          <a href="wishlist.html" class="action-btn" title="View Wishlist">
            <i class="ri-heart-line"></i>
            <span class="nav-badge" id="wishlist-count-badge">0</span>
          </a>

          <!-- Shopping Bag Action -->
          <a href="cart.html" class="action-btn" title="View Shopping Cart">
            <i class="ri-shopping-bag-line"></i>
            <span class="nav-badge" id="cart-count-badge">0</span>
          </a>

          <!-- User Profile Account Dropdown Wrapper -->
          <div class="user-menu-wrapper">
            <button class="action-btn" id="user-menu-trigger" title="My Account">
              <i class="ri-user-line"></i>
            </button>
            <div class="user-menu-dropdown" id="user-menu-dropdown">
              <div class="user-dropdown-header">
                <h5 id="dropdown-user-name">Guest User</h5>
                <p id="dropdown-user-email">Sign in to manage orders</p>
              </div>
              <div id="dropdown-auth-actions" style="display: flex; flex-direction: column;">
                <!-- Links loaded dynamically -->
              </div>
            </div>
          </div>

          <!-- Mobile Hamburger Button -->
          <button class="hamburger-toggle" id="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer Overlay -->
    <div class="overlay" id="mobile-nav-overlay"></div>
    <div class="mobile-nav-panel" id="mobile-nav-panel">
      <div class="mobile-nav-header">
        <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 8px;">
          <img src="assets/images/logos/logo.png" alt="Logo" class="logo-icon" style="height: 32px; width: auto; vertical-align: middle;">
          Book<span>Heaven</span>
        </a>
        <button class="action-btn" id="mobile-menu-close">
          <i class="ri-close-line" style="font-size: 1.5rem;"></i>
        </button>
      </div>
      <ul class="mobile-nav-menu">
        <li><a href="index.html" class="mobile-nav-link" id="mob-nav-home">Home</a></li>
        <li><a href="books.html" class="mobile-nav-link" id="mob-nav-shop">Browse Books</a></li>
        <li><a href="wishlist.html" class="mobile-nav-link" id="mob-nav-wishlist">My Wishlist</a></li>
        <li><a href="profile.html" class="mobile-nav-link" id="mob-nav-profile">My Profile</a></li>
        <li><a href="about.html" class="mobile-nav-link" id="mob-nav-about">About Us</a></li>
        <li><a href="contact.html" class="mobile-nav-link" id="mob-nav-contact">Contact</a></li>
      </ul>
      <div style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 1.5rem;" id="mobile-auth-section">
        <!-- Mobile Authentication Options -->
      </div>
    </div>
  `;
}

function getFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <!-- Brand Details Column -->
          <div class="footer-brand">
            <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 8px;">
              <img src="assets/images/logos/logo.png" alt="Logo" class="logo-icon" style="height: 32px; width: auto; vertical-align: middle;">
              <span id="dyn-footer-company">BookHeaven</span>
            </a>
            <p id="dyn-footer-tagline">Your ultimate destination for discovering great authors, inspiring stories, and life-changing academic knowledge.</p>
            
            <div class="footer-contact-info" style="margin-top: 1.5rem; margin-bottom: 2rem;">
              <p style="margin-bottom: 0.5rem; color: #a4a7cf;"><i class="ri-map-pin-line" style="color: var(--primary-color); margin-right: 8px;"></i> <span id="dyn-footer-address">123 Library Way, Knowledge City</span></p>
              <p style="margin-bottom: 0.5rem; color: #a4a7cf;"><i class="ri-mail-line" style="color: var(--primary-color); margin-right: 8px;"></i> <a href="mailto:support@bookheaven.com" id="dyn-footer-email" style="color: inherit;">support@bookheaven.com</a></p>
              <p style="margin-bottom: 0.5rem; color: #a4a7cf;"><i class="ri-phone-line" style="color: var(--primary-color); margin-right: 8px;"></i> <a href="tel:+18001234567" id="dyn-footer-phone" style="color: inherit;">+1 (800) 123-4567</a></p>
            </div>

            <div class="social-links">
              <a href="#" class="social-btn" title="Facebook"><i class="ri-facebook-fill"></i></a>
              <a href="#" class="social-btn" title="Twitter"><i class="ri-twitter-x-line"></i></a>
              <a href="#" class="social-btn" title="Instagram"><i class="ri-instagram-line"></i></a>
              <a href="#" class="social-btn" title="LinkedIn"><i class="ri-linkedin-fill"></i></a>
            </div>
          </div>

          <!-- Quick Nav Links -->
          <div class="footer-col">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html"><i class="ri-arrow-right-s-line"></i> Home</a></li>
              <li><a href="books.html"><i class="ri-arrow-right-s-line"></i> Browse Catalog</a></li>
              <li><a href="about.html"><i class="ri-arrow-right-s-line"></i> About Us</a></li>
              <li><a href="contact.html"><i class="ri-arrow-right-s-line"></i> Contact</a></li>
            </ul>
          </div>

          <!-- Customer Assistance -->
          <div class="footer-col">
            <h4 class="footer-heading">Support</h4>
            <ul class="footer-links">
              <li><a href="profile.html"><i class="ri-arrow-right-s-line"></i> My Account</a></li>
              <li><a href="orders.html"><i class="ri-arrow-right-s-line"></i> Order Status</a></li>
              <li><a href="wishlist.html"><i class="ri-arrow-right-s-line"></i> Wishlist</a></li>
              <li><a href="contact.html"><i class="ri-arrow-right-s-line"></i> Help & FAQ</a></li>
            </ul>
          </div>

          <!-- Newsletter subscription -->
          <div class="footer-newsletter">
            <h4 class="footer-heading">Join Our Newsletter</h4>
            <p>Subscribe to receive updates on newly arrived books, exclusive deals, and exciting seasonal campaigns.</p>
            <form class="newsletter-inline-form" id="footer-newsletter-form" onsubmit="event.preventDefault();">
              <input type="email" placeholder="Email Address..." required>
              <button class="btn btn-primary" type="submit" aria-label="Subscribe">
                <i class="ri-send-plane-fill"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Copyright and Legal -->
        <div class="footer-bottom">
          <p>&copy; 2026 <span id="dyn-footer-copyright-company">BookHeaven</span>. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Render dynamic components
async function loadComponents() {
  const navbarContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (navbarContainer) {
    if (window.location.protocol === 'file:') {
      navbarContainer.innerHTML = getNavbarHTML();
      initNavbarActions();
    } else {
      try {
        const response = await fetch('components/navbar.html');
        navbarContainer.innerHTML = await response.text();
        initNavbarActions();
      } catch (e) {
        navbarContainer.innerHTML = getNavbarHTML();
        initNavbarActions();
      }
    }
  }

  if (footerContainer) {
    if (window.location.protocol === 'file:') {
      footerContainer.innerHTML = getFooterHTML();
      initFooterActions();
    } else {
      try {
        const response = await fetch('components/footer.html');
        footerContainer.innerHTML = await response.text();
        initFooterActions();
      } catch (e) {
        footerContainer.innerHTML = getFooterHTML();
        initFooterActions();
      }
    }
  }
}

// Setup header/navbar interactive features
function initNavbarActions() {
  const header = document.getElementById('global-header');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  const userMenuTrigger = document.getElementById('user-menu-trigger');
  const userMenuDropdown = document.getElementById('user-menu-dropdown');

  // Sticky Scroll Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggles
  if (mobileMenuToggle && mobileNavPanel && mobileNavOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavPanel.classList.add('active');
      mobileNavOverlay.classList.add('active');
    });

    const closeMobile = () => {
      mobileNavPanel.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
    };

    mobileMenuClose.addEventListener('click', closeMobile);
    mobileNavOverlay.addEventListener('click', closeMobile);
  }

  // Account Menu Toggles
  if (userMenuTrigger && userMenuDropdown) {
    userMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!userMenuDropdown.contains(e.target) && e.target !== userMenuTrigger) {
        userMenuDropdown.classList.remove('active');
      }
    });
  }

  // Highlight Current Navigation Link
  highlightActiveLinks();

  // Load Auth State in Header
  updateUserHeaderStatus();

  // Load Badge indicators
  updateCartAndWishlistBadges();
}

function initFooterActions() {
  const form = document.getElementById('footer-newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      if (email) {
        Toast.success('Thanks for subscribing to our newsletter!');
        form.reset();
      }
    });
  }

  // Fetch and bind footer data dynamically
  if (window.API && typeof window.API.getAboutUs === 'function') {
    window.API.getAboutUs().then(aboutData => {
      if (aboutData) {
        const companyName = aboutData.company_name || 'BookHeaven';
        const tagline = aboutData.company_description;
        
        if (aboutData.address) {
          const addrEl = document.getElementById('dyn-footer-address');
          if (addrEl) addrEl.textContent = aboutData.address;
        }
        if (aboutData.email_id) {
          const emailEl = document.getElementById('dyn-footer-email');
          if (emailEl) {
            emailEl.textContent = aboutData.email_id;
            emailEl.href = 'mailto:' + aboutData.email_id;
          }
        }
        if (aboutData.phone_no) {
          const phoneEl = document.getElementById('dyn-footer-phone');
          if (phoneEl) {
            phoneEl.textContent = aboutData.phone_no;
            phoneEl.href = 'tel:' + aboutData.phone_no;
          }
        }
        if (companyName) {
          const comp1 = document.getElementById('dyn-footer-company');
          const comp2 = document.getElementById('dyn-footer-copyright-company');
          if (comp1) comp1.textContent = companyName;
          if (comp2) comp2.textContent = companyName;
        }
        if (tagline) {
          const tagEl = document.getElementById('dyn-footer-tagline');
          if (tagEl) tagEl.textContent = tagline;
        }
      }
    }).catch(err => {
      console.warn('Could not load dynamic footer info', err);
    });
  }
}

// Identify active URL navigation link
function highlightActiveLinks() {
  const path = window.location.pathname;
  const page = path.split("/").pop();

  const linksMap = [
    { page: 'index.html', dId: 'nav-home', mId: 'mob-nav-home' },
    { page: '', dId: 'nav-home', mId: 'mob-nav-home' },
    { page: 'books.html', dId: 'nav-shop', mId: 'mob-nav-shop' },
    { page: 'book-details.html', dId: 'nav-shop', mId: 'mob-nav-shop' },
    { page: 'wishlist.html', mId: 'mob-nav-wishlist' },
    { page: 'profile.html', mId: 'mob-nav-profile' },
    { page: 'about.html', dId: 'nav-about', mId: 'mob-nav-about' },
    { page: 'contact.html', dId: 'nav-contact', mId: 'mob-nav-contact' }
  ];

  linksMap.forEach(item => {
    if (page === item.page) {
      if (item.dId) {
        const dLink = document.getElementById(item.dId);
        if (dLink) dLink.classList.add('active');
      }
      if (item.mId) {
        const mLink = document.getElementById(item.mId);
        if (mLink) mLink.classList.add('active');
      }
    }
  });
}

// Fetch session and adjust drop-down listings
// Fetch session and adjust drop-down listings
function updateUserHeaderStatus() {
  const currentUser = Storage.get('bookheaven_logged_in_user');
  const dropdownName = document.getElementById('dropdown-user-name');
  const dropdownEmail = document.getElementById('dropdown-user-email');
  const dropdownAuthBox = document.getElementById('dropdown-auth-actions');
  const mobileAuthSection = document.getElementById('mobile-auth-section');

  function renderStatus(user) {
    if (user) {
      // Logged In Status
      if (dropdownName) dropdownName.textContent = user.name;
      if (dropdownEmail) dropdownEmail.textContent = user.email;

      const loggedInLinks = `
        <a href="profile.html" class="user-dropdown-item"><i class="ri-user-settings-line"></i> My Profile</a>
        <a href="orders.html" class="user-dropdown-item"><i class="ri-survey-line"></i> Order History</a>
        <a href="wishlist.html" class="user-dropdown-item"><i class="ri-heart-line"></i> My Wishlist</a>
        <button class="user-dropdown-item logout" id="logout-btn" style="border: none; background: none; width: 100%; text-align: left; cursor: pointer; font-family: inherit;">
          <i class="ri-logout-box-line"></i> Logout
        </button>
      `;

      if (dropdownAuthBox) {
        dropdownAuthBox.innerHTML = loggedInLinks;
        // Add Logout trigger
        document.getElementById('logout-btn').addEventListener('click', () => {
          Storage.remove('bookheaven_logged_in_user');
          Storage.remove('bookheaven_session_id');
          Storage.remove('bookheaven_cart');
          Storage.remove('bookheaven_wishlist');
          Toast.success('Successfully logged out!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }

      if (mobileAuthSection) {
        mobileAuthSection.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem;">
            <i class="ri-user-line" style="font-size: 1.5rem; color: var(--primary-color);"></i>
            <div>
              <h5 style="margin: 0; font-size: 0.95rem;">${user.name}</h5>
              <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">${user.email}</p>
            </div>
          </div>
          <button class="btn btn-secondary" id="mob-logout-btn" style="width: 100%;">Logout</button>
        `;
        document.getElementById('mob-logout-btn').addEventListener('click', () => {
          Storage.remove('bookheaven_logged_in_user');
          Storage.remove('bookheaven_session_id');
          Storage.remove('bookheaven_cart');
          Storage.remove('bookheaven_wishlist');
          Toast.success('Successfully logged out!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    } else {
      // Guest Status
      if (dropdownName) dropdownName.textContent = 'Guest User';
      if (dropdownEmail) dropdownEmail.textContent = 'Sign in to place orders';

      const guestLinks = `
        <a href="login.html" class="user-dropdown-item"><i class="ri-login-box-line"></i> Sign In</a>
        <a href="register.html" class="user-dropdown-item"><i class="ri-user-add-line"></i> Create Account</a>
      `;

      if (dropdownAuthBox) dropdownAuthBox.innerHTML = guestLinks;

      if (mobileAuthSection) {
        mobileAuthSection.innerHTML = `
          <div style="display: flex; gap: 1rem;">
            <a href="login.html" class="btn btn-secondary" style="flex: 1; padding: 0.6rem;">Sign In</a>
            <a href="register.html" class="btn btn-primary" style="flex: 1; padding: 0.6rem;">Register</a>
          </div>
        `;
      }
    }
  }

  // Render initial status from local storage
  renderStatus(currentUser);

  // Sync asynchronously with backend session if not local protocol
  if (currentUser && !API.isLocalProtocol()) {
    API.getProfile().then(backendProfile => {
      const updatedUser = {
        id: backendProfile.customer_id,
        name: backendProfile.full_name,
        email: backendProfile.email,
        phone: backendProfile.phone_number,
        avatar: backendProfile.profile_photo ? API.getImageUrl(backendProfile.profile_photo) : 'assets/images/icons/user.png'
      };
      Storage.set('bookheaven_logged_in_user', updatedUser);
      // Re-render if it changed
      if (updatedUser.name !== currentUser.name || updatedUser.email !== currentUser.email) {
        renderStatus(updatedUser);
      }
    }).catch(err => {
      console.warn("Backend session validation failed or session expired. Logging out.", err);
      // If we got an error while local storage thought we were logged in,
      // and we are NOT running on file:// mock mode, we clean up the storage to match backend
      Storage.remove('bookheaven_logged_in_user');
      Storage.remove('bookheaven_session_id');
      Storage.remove('bookheaven_cart');
      renderStatus(null);
      
      // If we are on profile.html or orders.html or checkout.html, redirect them to login page because their session has expired!
      const currentPath = window.location.pathname;
      if (currentPath.includes('profile.html') || currentPath.includes('orders.html') || currentPath.includes('checkout.html')) {
        Toast.error("Session expired! Please login again.");
        setTimeout(() => {
          window.location.href = `login.html?redirect=${encodeURIComponent(currentPath.split('/').pop())}`;
        }, 1500);
      }
    });
  }
}

// Update badges totals
function updateCartAndWishlistBadges() {
  const cart = Storage.get('bookheaven_cart', []);
  const wishlist = Storage.get('bookheaven_wishlist', []);

  // Calculate total items count in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const cartBadge = document.getElementById('cart-count-badge');
  const wishlistBadge = document.getElementById('wishlist-count-badge');

  if (cartBadge) cartBadge.textContent = cartCount;
  if (wishlistBadge) wishlistBadge.textContent = wishlistCount;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();
});

// Expose Badge update to other modules
window.updateCartAndWishlistBadges = updateCartAndWishlistBadges;
