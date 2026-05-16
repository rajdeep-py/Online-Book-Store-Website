/**
 * BookHeaven Bookstore - Validation Engine
 */

const Validation = {
  // Check if string is a valid email format
  email(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  },

  // Check password strength and return descriptive details
  passwordStrength(password) {
    let score = 0;
    let label = 'Weak';
    let color = 'var(--danger-color)';

    if (!password) {
      return { score, label, color };
    }

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        label = 'Weak';
        color = 'var(--danger-color)';
        break;
      case 2:
        label = 'Fair';
        color = 'var(--warning-color)';
        break;
      case 3:
        label = 'Good';
        color = 'var(--info-color)';
        break;
      case 4:
        label = 'Strong';
        color = 'var(--success-color)';
        break;
    }

    return { score, label, color };
  },

  // Set input field status visually
  setSuccess(element) {
    const parent = element.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-error');
      parent.classList.add('has-success');
      const errEl = parent.querySelector('.error-message-text');
      if (errEl) errEl.remove();
    }
  },

  setError(element, message) {
    const parent = element.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-success');
      parent.classList.add('has-error');
      let errEl = parent.querySelector('.error-message-text');
      if (!errEl) {
        errEl = document.createElement('small');
        errEl.className = 'error-message-text';
        parent.appendChild(errEl);
      }
      errEl.textContent = message;
    }
  },

  clearStatus(element) {
    const parent = element.closest('.form-group');
    if (parent) {
      parent.classList.remove('has-success', 'has-error');
      const errEl = parent.querySelector('.error-message-text');
      if (errEl) errEl.remove();
    }
  }
};

window.Validation = Validation;
