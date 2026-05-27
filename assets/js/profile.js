/**
 * BookHeaven Bookstore - Profile Dashboard Controller
 */

const Profile = {
  currentProfilePhotoBase64: null,

  // Load and render user info
  async loadAccountDetails() {
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const phoneInput = document.getElementById('profile-phone');
    const addressInput = document.getElementById('profile-address');
    
    const sumName = document.getElementById('sum-user-name');
    const sumEmail = document.getElementById('sum-user-email');
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');

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
          phone: backendProfile.phone_number,
          address: backendProfile.address,
          avatar: API.getImageUrl(backendProfile.profile_photo) || user.avatar
        };
      } catch (err) {
        console.warn("Backend load profile failed, falling back to mock data.", err);
        const usersDB = await API.getUsers();
        const fallbackUser = usersDB.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (fallbackUser) {
          currentUser = {
            name: fallbackUser.name,
            email: fallbackUser.email,
            phone: fallbackUser.phone,
            address: fallbackUser.address || '',
            avatar: API.getImageUrl(fallbackUser.avatar) || user.avatar
          };
        }
      }

      if (currentUser) {
        if (nameInput) nameInput.value = currentUser.name;
        if (emailInput) emailInput.value = currentUser.email;
        if (phoneInput) phoneInput.value = currentUser.phone || '';
        if (addressInput) addressInput.value = currentUser.address || '';
        
        if (sumName) sumName.textContent = currentUser.name;
        if (sumEmail) sumEmail.textContent = currentUser.email;
        if (sidebarAvatar && currentUser.avatar) sidebarAvatar.src = currentUser.avatar;
      }
    } catch (e) {
      console.error(e);
      Toast.error('Error loading account details.');
    } finally {
      Loader.hide();
    }
  },

  // Save changes to account info
  async saveAccountDetails(name, email, phone, address) {
    Loader.show();
    try {
      const user = Storage.get('bookheaven_logged_in_user');

      try {
        await API.updateProfile(name, email, phone, address, this.currentProfilePhotoBase64);
      } catch (err) {
        console.warn("Backend update profile failed.", err);
        Toast.error(err.message || 'Error saving profile changes.');
        Loader.hide();
        return;
      }

      // Update session
      user.name = name;
      user.email = email;
      user.phone = phone;
      if (this.currentProfilePhotoBase64) {
        // Will be refreshed properly on reload, but optimistic UI update:
        user.avatar = this.currentProfilePhotoBase64; 
      }
      Storage.set('bookheaven_logged_in_user', user);

      Toast.success('Profile updated successfully!');
      this.currentProfilePhotoBase64 = null;
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
  
  initPhotoUpload() {
    const fileInput = document.getElementById('profile-photo-upload');
    const avatarImg = document.getElementById('sidebar-user-avatar');
    
    if (fileInput && avatarImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target.result;
          avatarImg.src = base64String;
          this.currentProfilePhotoBase64 = base64String;
        };
        reader.readAsDataURL(file);
      });
    }
  }
};

window.Profile = Profile;

// Automatically bind Profile edit form elements
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('profile.html')) {
    Profile.loadAccountDetails();
    Profile.initPhotoUpload();

    const form = document.getElementById('profile-edit-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('profile-name').value.trim();
        const email = document.getElementById('profile-email').value.trim();
        const phone = document.getElementById('profile-phone').value.trim();
        const address = document.getElementById('profile-address').value.trim();

        if (name && email) {
          await Profile.saveAccountDetails(name, email, phone, address);
        } else {
          Toast.warning('Name and Email are required!');
        }
      });
    }
  }
});
