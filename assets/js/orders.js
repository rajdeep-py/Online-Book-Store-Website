/**
 * BookHeaven Bookstore - Order History Controller
 */

const Orders = {
  // Render user's order history cards
  async renderOrdersList() {
    const listContainer = document.getElementById('orders-history-list');
    if (!listContainer) return;

    const user = Storage.get('bookheaven_logged_in_user');
    if (!user) {
      window.location.href = 'login.html?redirect=orders.html';
      return;
    }

    Loader.show();
    try {
      const usersDB = await API.getUsers();
      const currentUserData = usersDB.find(u => u.email.toLowerCase() === user.email.toLowerCase());

      if (!currentUserData || !currentUserData.orders || currentUserData.orders.length === 0) {
        listContainer.innerHTML = `
          <div class="empty-state" style="max-width: 100%;">
            <div class="empty-state-icon"><i class="ri-survey-line"></i></div>
            <h3 class="empty-state-title">No Orders Found</h3>
            <p class="empty-state-desc">You haven't placed any orders yet. Once you make a purchase, your orders will appear here.</p>
            <a href="books.html" class="btn btn-primary">Start Shopping</a>
          </div>
        `;
        return;
      }

      // Populate orders list
      listContainer.innerHTML = currentUserData.orders.map(order => {
        let badgeClass = 'badge-info';
        if (order.status === 'Delivered') badgeClass = 'badge-success';
        if (order.status === 'Shipped') badgeClass = 'badge-warning';
        if (order.status === 'Cancelled') badgeClass = 'badge-danger';

        return `
          <div class="order-history-card fade-in">
            <div class="order-card-header">
              <div class="order-meta-info">
                <div class="order-meta-item">
                  <span>ORDER PLACED</span>
                  <span>${order.date}</span>
                </div>
                <div class="order-meta-item">
                  <span>TOTAL AMOUNT</span>
                  <span>₹${order.total}</span>
                </div>
                <div class="order-meta-item">
                  <span>ORDER NUMBER</span>
                  <span>${order.orderId}</span>
                </div>
              </div>
              <span class="badge ${badgeClass}">${order.status}</span>
            </div>
            
            <div class="order-card-body">
              <div class="order-card-items-list">
                ${order.items.map(item => `
                  <div class="order-card-item">
                    <div class="order-item-info">
                      <span class="order-item-name">${item.title}</span>
                      <span class="order-item-qty">Quantity: ${item.quantity}</span>
                    </div>
                    <span class="order-item-price">₹${item.price}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');

    } catch (e) {
      console.error(e);
      Toast.error('Failed to load order history.');
    } finally {
      Loader.hide();
    }
  }
};

window.Orders = Orders;

// Automatically render orders list on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('orders.html')) {
    Orders.renderOrdersList();
  }
});
