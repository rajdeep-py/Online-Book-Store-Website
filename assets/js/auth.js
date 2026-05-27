/**
 * BookHeaven Bookstore - Authentication Controller
 */

const Auth = {
  // Get all registered users from database
  async getUsersDB() {
    return await API.getUsers();
  },

  // Perform sign-in check
  async login(email, password) {
    Loader.show();
    try {
      let sessionUser;
      try {
        const backendUser = await API.login(email, password);
        sessionUser = {
          id: backendUser.customer_id,
          name: backendUser.full_name,
          email: backendUser.email,
          phone: backendUser.phone_number || '',
          avatar: backendUser.profile_photo ? API.getImageUrl(backendUser.profile_photo) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'
        };
        if (backendUser.session_id) {
          Storage.set('bookheaven_session_id', backendUser.session_id);
        }
      } catch (err) {
        console.warn("Backend login failed, falling back to mock authentication.", err);
        const users = await this.getUsersDB();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
          Toast.error('No account registered with this email address!');
          Loader.hide();
          return false;
        }

        if (user.password !== password) {
          Toast.error('Incorrect password! Please try again.');
          Loader.hide();
          return false;
        }

        sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'
        };
      }
      
      Storage.set('bookheaven_logged_in_user', sessionUser);
      Toast.success(`Welcome back, ${sessionUser.name}!`);

      // Handle redirect URL
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const dest = params.get('redirect') || 'index.html';
        window.location.href = dest;
      }, 1200);

      return true;
    } catch (e) {
      console.error(e);
      Toast.error('Authentication failed.');
      Loader.hide();
      return false;
    }
  },

  // Register a new user account
  async register(name, email, password) {
    Loader.show();
    try {
      try {
        await API.register(name, email, password);
      } catch (err) {
        console.warn("Backend registration failed, falling back to mock registration.", err);
        const users = await this.getUsersDB();
        const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
          Toast.error('An account already exists with this email address!');
          Loader.hide();
          return false;
        }

        const newUser = {
          id: users.length + 1,
          name: name,
          email: email,
          password: password,
          phone: '',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150',
          addresses: [],
          orders: []
        };

        users.push(newUser);
        Storage.set('bookheaven_users_db', users);
      }
      
      Toast.success('Account created successfully! Redirecting to Login...');
      
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);

      return true;
    } catch (e) {
      console.error(e);
      Toast.error('Account creation failed.');
      Loader.hide();
      return false;
    }
  }
};

window.Auth = Auth;

// Handle Auth page forms bindings on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // 1. Sign In Page Elements
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('email');
      const passInput = document.getElementById('password');
      
      let isValid = true;

      if (!emailInput.value.trim() || !Validation.email(emailInput.value.trim())) {
        Validation.setError(emailInput, 'Enter a valid email address.');
        isValid = false;
      } else {
        Validation.setSuccess(emailInput);
      }

      if (!passInput.value) {
        Validation.setError(passInput, 'Password cannot be empty.');
        isValid = false;
      } else {
        Validation.setSuccess(passInput);
      }

      if (isValid) {
        await Auth.login(emailInput.value.trim(), passInput.value);
      }
    });
  }

  // 2. Sign Up Page Elements
  if (registerForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    // Live Password Strength listener
    if (passInput && strengthFill && strengthText) {
      passInput.addEventListener('input', () => {
        const details = Validation.passwordStrength(passInput.value);
        strengthFill.style.width = `${(details.score / 4) * 100}%`;
        strengthFill.style.backgroundColor = details.color;
        strengthText.textContent = `Strength: ${details.label}`;
        strengthText.style.color = details.color;
      });
    }

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        Validation.setError(nameInput, 'Name must be at least 3 characters.');
        isValid = false;
      } else {
        Validation.setSuccess(nameInput);
      }

      if (!emailInput.value.trim() || !Validation.email(emailInput.value.trim())) {
        Validation.setError(emailInput, 'Enter a valid email address.');
        isValid = false;
      } else {
        Validation.setSuccess(emailInput);
      }

      const strength = Validation.passwordStrength(passInput.value);
      if (strength.score < 2) {
        Validation.setError(passInput, 'Password must be stronger.');
        isValid = false;
      } else {
        Validation.setSuccess(passInput);
      }

      if (confirmInput.value !== passInput.value) {
        Validation.setError(confirmInput, 'Passwords do not match!');
        isValid = false;
      } else {
        Validation.setSuccess(confirmInput);
      }

      if (isValid) {
        await Auth.register(
          nameInput.value.trim(),
          emailInput.value.trim(),
          passInput.value
        );
      }
    });
  }
});
