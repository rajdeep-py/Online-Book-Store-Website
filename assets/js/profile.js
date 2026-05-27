/**
 * BookHeaven Bookstore - Profile Dashboard Controller
 */

const Profile = {
  // Load and render user info
  async loadAccountDetails() {
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');

    const sumName = document.getElementById('sum-user-name');
    const sumEmail = document.getElementById('sum-user-email');

    const user = Storage.get('bookheaven_logged_in_user');
    if (!user) {
      window.location.href = 'login.html?redirect=profile.html';
      return;
    }

    Loader.show();
    try {
      let currentUser;
      try {
        const backendProfile = await API.getProfile();
        currentUser = {
          name: backendProfile.full_name,
          email: backendProfile.email,
          phone: backendProfile.phone_number
        };
      } catch (err) {
        console.warn("Backend load profile failed, falling back to mock data.", err);
        const usersDB = await API.getUsers();
        const fallbackUser = usersDB.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (fallbackUser) {
          currentUser = {
            name: fallbackUser.name,
            email: fallbackUser.email,
            phone: fallbackUser.phone
          };
        }
      }

      if (currentUser) {
        if (nameInput) nameInput.value = currentUser.name;
        if (emailInput) emailInput.value = currentUser.email;
        if (phoneInput) phoneInput.value = currentUser.phone || '';

        if (sumName) sumName.textContent = currentUser.name;
        if (sumEmail) sumEmail.textContent = currentUser.email;
      }
    } catch (e) {
      console.error(e);
      Toast.error('Error loading account details.');
    } finally {
      Loader.hide();
    }
  },

  // Save changes to account info
  async saveAccountDetails(name, email, phone) {
    Loader.show();
    try {
      const user = Storage.get('bookheaven_logged_in_user');

      try {
        await API.updateProfile(name, email, phone);
      } catch (err) {
        console.warn("Backend update profile failed, falling back to mock data.", err);
        const usersDB = await API.getUsers();
        const userIndex = usersDB.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userIndex > -1) {
          if (email.toLowerCase() !== user.email.toLowerCase()) {
            const emailExists = usersDB.some(u => u.email.toLowerCase() === email.toLowerCase());
            if (emailExists) {
              Toast.error('An account already exists with this new email!');
              Loader.hide();
              return false;
            }
          }
          usersDB[userIndex].name = name;
          usersDB[userIndex].email = email;
          usersDB[userIndex].phone = phone;
          Storage.set('bookheaven_users_db', usersDB);
        }
      }

      // Update session
      user.name = name;
      user.email = email;
      user.phone = phone;
      Storage.set('bookheaven_logged_in_user', user);

      Toast.success('Profile updated successfully!');
      this.loadAccountDetails();
      
      if (window.updateUserHeaderStatus) {
        window.updateUserHeaderStatus();
      }
    } catch (e) {
      console.error(e);
      Toast.error('Error saving profile changes.');
    } finally {
      Loader.hide();
    }
  },

  // Render Saved Address Cards
  async renderAddresses() {
    const container = document.getElementById('profile-addresses-grid');
    if (!container) return;

    const user = Storage.get('bookheaven_logged_in_user');
    Loader.show();
    try {
      const usersDB = await API.getUsers();
      const currentUser = usersDB.find(u => u.email.toLowerCase() === user.email.toLowerCase());

      if (!currentUser || !currentUser.addresses) {
        container.innerHTML = `
          <div class="add-address-card" onclick="Profile.openAddressModal()">
            <i class="ri-map-pin-add-line"></i>
            <span>Add New Address</span>
          </div>
        `;
        return;
      }

      let addressCardsHTML = currentUser.addresses.map(addr => `
        <div class="address-card fade-in" data-id="${addr.id}">
          <span class="address-tag ${addr.isDefault ? 'default' : ''}">${addr.tag} ${addr.isDefault ? '(Default)' : ''}</span>
          <h4 class="address-name">${addr.fullName}</h4>
          <p class="address-details">
            ${addr.street}<br>
            ${addr.city}, ${addr.state} ${addr.zipCode}<br>
            Phone: ${addr.phone}
          </p>
          <div class="address-actions">
            <button class="address-action-btn delete" onclick="Profile.deleteAddress(${addr.id})">
              <i class="ri-delete-bin-line"></i> Delete
            </button>
          </div>
        </div>
      `).join('');

      addressCardsHTML += `
        <div class="add-address-card" onclick="Profile.openAddressModal()">
          <i class="ri-map-pin-add-line"></i>
          <span>Add New Address</span>
        </div>
      `;

      container.innerHTML = addressCardsHTML;

    } catch (e) {
      console.error(e);
      Toast.error('Error rendering address book.');
    } finally {
      Loader.hide();
    }
  },

  // Delete Address from list
  async deleteAddress(id) {
    Loader.show();
    try {
      const user = Storage.get('bookheaven_logged_in_user');
      const usersDB = await API.getUsers();

      const userIndex = usersDB.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (userIndex > -1) {
        let addresses = usersDB[userIndex].addresses || [];
        addresses = addresses.filter(addr => addr.id !== id);
        
        usersDB[userIndex].addresses = addresses;
        Storage.set('bookheaven_users_db', usersDB);
        
        Toast.success('Address deleted successfully!');
        this.renderAddresses();
      }
    } catch (e) {
      console.error(e);
      Toast.error('Error deleting address.');
    } finally {
      Loader.hide();
    }
  },

  // Add Address Modal logic
  openAddressModal() {
    // Append a modal template dynamically to body if not present
    let overlay = document.getElementById('global-modal-overlay');
    if (!overlay) {
      const temp = document.createElement('div');
      temp.innerHTML = `
        <div class="modal-overlay" id="global-modal-overlay">
          <div class="modal-container">
            <div class="modal-header">
              <h4>Add Address</h4>
              <button class="modal-close-btn" onclick="Profile.closeAddressModal()"><i class="ri-close-line"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 1rem;">
              <form id="modal-address-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="m-fullName" class="form-control" required>
                  </div>
                  <div class="form-group">
                    <label>Label Tag (e.g. Home, Office)</label>
                    <input type="text" id="m-tag" class="form-control" placeholder="Home" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Street Address</label>
                  <input type="text" id="m-street" class="form-control" required>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>City</label>
                    <input type="text" id="m-city" class="form-control" required>
                  </div>
                  <div class="form-group">
                    <label>Zip Code</label>
                    <input type="text" id="m-zipCode" class="form-control" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="text" id="m-phone" class="form-control" required>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                  <button type="button" class="btn btn-secondary" onclick="Profile.closeAddressModal()">Cancel</button>
                  <button type="submit" class="btn btn-primary">Add Address</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(temp.firstElementChild);
      overlay = document.getElementById('global-modal-overlay');
    }

    // Force a reflow
    overlay.offsetHeight;
    overlay.classList.add('active');

    // Bind modal submit
    const form = document.getElementById('modal-address-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const newAddress = {
        id: Date.now(),
        tag: document.getElementById('m-tag').value.trim(),
        fullName: document.getElementById('m-fullName').value.trim(),
        street: document.getElementById('m-street').value.trim(),
        city: document.getElementById('m-city').value.trim(),
        state: 'NY',
        zipCode: document.getElementById('m-zipCode').value.trim(),
        country: 'United States',
        phone: document.getElementById('m-phone').value.trim(),
        isDefault: false
      };

      await this.saveNewAddress(newAddress);
    });
  },

  closeAddressModal() {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  },

  async saveNewAddress(addr) {
    Loader.show();
    try {
      const user = Storage.get('bookheaven_logged_in_user');
      const usersDB = await API.getUsers();

      const userIndex = usersDB.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (userIndex > -1) {
        if (!usersDB[userIndex].addresses) {
          usersDB[userIndex].addresses = [];
          addr.isDefault = true; // First address default
        }
        usersDB[userIndex].addresses.push(addr);
        Storage.set('bookheaven_users_db', usersDB);
        
        Toast.success('New address added!');
        this.closeAddressModal();
        this.renderAddresses();
      }
    } catch (e) {
      console.error(e);
      Toast.error('Failed to save new address.');
    } finally {
      Loader.hide();
    }
  }
};

window.Profile = Profile;

// Automatically bind Profile edit form elements
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('profile.html')) {
    Profile.loadAccountDetails();
    Profile.renderAddresses();

    const form = document.getElementById('profile-edit-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('profile-name').value.trim();
        const email = document.getElementById('profile-email').value.trim();
        const phone = document.getElementById('profile-phone').value.trim();

        if (name && email) {
          await Profile.saveAccountDetails(name, email, phone);
        } else {
          Toast.warning('Name and Email are required!');
        }
      });
    }
  }
});
