/**
 * BookHeaven Bookstore - Utilities & Helper Functions
 */

// Local Storage Abstraction
const Storage = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading key "${key}" from localStorage:`, e);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving key "${key}" to localStorage:`, e);
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error deleting key "${key}" from localStorage:`, e);
      return false;
    }
  }
};

// Currency Formatter
const Currency = {
  format(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
};

// Global Screen Loader
const Loader = {
  show() {
    let loader = document.getElementById('global-loader');
    if (!loader) {
      const temp = document.createElement('div');
      temp.innerHTML = `
        <div id="global-loader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(4px); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; opacity: 0; transition: opacity 0.3s ease-out;">
          <div class="spinner"></div>
          <p style="font-family: 'Outfit', sans-serif; font-weight: 700; color: #1a1a24; font-size: 1.1rem; letter-spacing: 0.5px;">Loading Books...</p>
        </div>
      `;
      document.body.appendChild(temp.firstElementChild);
      loader = document.getElementById('global-loader');
    }
    // Force a reflow
    loader.offsetHeight;
    loader.style.opacity = '1';
  },
  
  hide() {
    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 300);
    }
  }
};

// Toast Notifications System
const Toast = {
  success(message, duration = 3000) {
    this.show(message, 'success', 'ri-checkbox-circle-fill', duration);
  },
  error(message, duration = 3000) {
    this.show(message, 'error', 'ri-error-warning-fill', duration);
  },
  warning(message, duration = 3000) {
    this.show(message, 'warning', 'ri-alert-fill', duration);
  },
  info(message, duration = 3000) {
    this.show(message, 'info', 'ri-information-fill', duration);
  },
  
  show(message, type = 'info', iconClass = 'ri-information-line', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-message">${message}</div>
      <button class="toast-close"><i class="ri-close-line"></i></button>
    `;
    
    // Add close action
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.remove(toast));
    
    container.appendChild(toast);
    
    // Auto dismiss
    setTimeout(() => {
      this.remove(toast);
    }, duration);
  },
  
  remove(toast) {
    if (!toast.classList.contains('removing')) {
      toast.classList.add('removing');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }
};

// Export to Global namespace
window.Storage = Storage;
window.Currency = Currency;
window.Loader = Loader;
window.Toast = Toast;

// Global Image Error Fallback Handler
window.addEventListener('error', function (e) {
  if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
    const isUser = e.target.classList.contains('profile-avatar') || e.target.id.includes('user') || e.target.id.includes('avatar');
    const fallbackPath = isUser ? 'assets/images/icons/user.png' : 'assets/images/icons/book.png';
    
    // Only set if not already the fallback to prevent infinite loop
    if (!e.target.src.includes(fallbackPath)) {
      e.target.src = fallbackPath;
      // Also ensure background doesn't stay transparent if it was broken
      e.target.style.backgroundColor = '#f1f1f5';
    }
  }
}, true);
