// Dilshad Restaurant - Kasa Inspired Menu Script

// Menu Data
const menuData = {
  specials: [
    { id: 1, name: 'Chicken Tikka Masala', urdu: 'چکن ٹکہ مصالحہ', description: 'Tender chicken in creamy tomato sauce', price: 12.95, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80', badge: 'best-seller' },
    { id: 2, name: 'Lamb Rogan Josh', urdu: 'لیمب روگن جوش', description: 'Aromatic lamb curry with Kashmiri spices', price: 14.95, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', badge: 'must-try' },
    { id: 3, name: 'Butter Chicken', urdu: 'بٹر چکن', description: 'Creamy tomato curry with tender chicken', price: 12.95, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80', badge: 'best-seller' },
    { id: 4, name: 'Paneer Tikka Masala', urdu: 'پنیر ٹکہ مصالحہ', description: 'Indian cottage cheese in rich tomato gravy', price: 11.95, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80', badge: null },
    { id: 5, name: 'Lamb Biryani Special', urdu: 'لیمب بریانی', description: 'Fragrant rice with tender lamb and spices', price: 15.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: 'must-try' }
  ],
  starters: [
    { id: 6, name: 'Onion Bhaji', urdu: 'پیاز بھجیا', description: 'Crispy onion fritters with spices', price: 4.95, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', badge: null },
    { id: 7, name: 'Samosa (2 pieces)', urdu: 'سموسہ', description: 'Crispy pastry filled with spiced vegetables', price: 4.50, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', badge: null },
    { id: 8, name: 'Chicken Pakora', urdu: 'چکن پکوڑا', description: 'Spiced chicken fritters', price: 5.95, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', badge: null },
    { id: 9, name: 'Paneer Pakora', urdu: 'پنیر پکوڑا', description: 'Cottage cheese fritters', price: 5.50, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80', badge: null },
    { id: 10, name: 'Mixed Platter', urdu: 'مکسڈ پلیٹر', description: 'Selection of our best starters', price: 12.95, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', badge: 'best-seller' }
  ],
  tandoori: [
    { id: 11, name: 'Chicken Tikka', urdu: 'چکن ٹکہ', description: 'Marinated chicken grilled in tandoor', price: 8.95, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', badge: 'best-seller' },
    { id: 12, name: 'Lamb Tikka', urdu: 'لیمب ٹکہ', description: 'Tender lamb pieces grilled to perfection', price: 9.95, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', badge: null },
    { id: 13, name: 'Tandoori Chicken', urdu: 'تندوری چکن', description: 'Half chicken marinated in yogurt and spices', price: 10.95, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', badge: 'must-try' },
    { id: 14, name: 'Paneer Tikka', urdu: 'پنیر ٹکہ', description: 'Grilled cottage cheese with peppers', price: 8.50, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80', badge: null },
    { id: 15, name: 'Mixed Grill', urdu: 'مکسڈ گرل', description: 'Assortment of tandoori specialties', price: 16.95, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', badge: 'best-seller' }
  ],
  biryani: [
    { id: 16, name: 'Chicken Biryani', urdu: 'چکن بریانی', description: 'Fragrant basmati rice with chicken', price: 12.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: 'best-seller' },
    { id: 17, name: 'Lamb Biryani', urdu: 'لیمب بریانی', description: 'Aromatic rice with tender lamb', price: 14.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: 'must-try' },
    { id: 18, name: 'Vegetable Biryani', urdu: 'سبزی بریانی', description: 'Mixed vegetables with spiced rice', price: 10.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: null },
    { id: 19, name: 'Prawn Biryani', urdu: 'جھینگا بریانی', description: 'Succulent prawns with fragrant rice', price: 15.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: null },
    { id: 20, name: 'Special Mixed Biryani', urdu: 'اسپیشل مکسڈ بریانی', description: 'Chicken, lamb and prawns', price: 16.95, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80', badge: 'best-seller' }
  ],
  naan: [
    { id: 21, name: 'Plain Naan', urdu: 'سادہ نان', description: 'Traditional tandoor-baked bread', price: 2.95, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: null },
    { id: 22, name: 'Garlic Naan', urdu: 'لہسن نان', description: 'Naan with fresh garlic and coriander', price: 3.50, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: 'best-seller' },
    { id: 23, name: 'Peshwari Naan', urdu: 'پشاوری نان', description: 'Sweet naan with coconut and almonds', price: 3.95, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: null },
    { id: 24, name: 'Keema Naan', urdu: 'قیمہ نان', description: 'Stuffed with spiced minced lamb', price: 4.50, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: null },
    { id: 25, name: 'Cheese Naan', urdu: 'پنیر نان', description: 'Naan stuffed with melted cheese', price: 3.95, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: null },
    { id: 26, name: 'Giant Naan', urdu: 'بڑا نان', description: 'Extra large naan for sharing', price: 5.95, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', badge: 'must-try' }
  ],
  rice: [
    { id: 27, name: 'Pilau Rice', urdu: 'پلاؤ چاول', description: 'Basmati rice with aromatic spices', price: 3.50, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null },
    { id: 28, name: 'Boiled Rice', urdu: 'ابلا ہوا چاول', description: 'Plain steamed basmati rice', price: 2.95, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null },
    { id: 29, name: 'Mushroom Rice', urdu: 'مشروم چاول', description: 'Rice with sautéed mushrooms', price: 4.50, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null },
    { id: 30, name: 'Egg Fried Rice', urdu: 'انڈا فرائیڈ چاول', description: 'Rice with scrambled eggs', price: 4.50, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null },
    { id: 31, name: 'Vegetable Rice', urdu: 'سبزی چاول', description: 'Rice with mixed vegetables', price: 4.50, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null },
    { id: 32, name: 'Keema Rice', urdu: 'قیمہ چاول', description: 'Rice with spiced minced lamb', price: 5.50, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', badge: null }
  ],
  sides: [
    { id: 33, name: 'Saag Aloo', urdu: 'ساگ آلو', description: 'Spinach and potatoes', price: 5.95, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', badge: null },
    { id: 34, name: 'Bombay Aloo', urdu: 'بمبئی آلو', description: 'Spiced potatoes', price: 5.50, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', badge: null },
    { id: 35, name: 'Tarka Daal', urdu: 'تڑکا دال', description: 'Lentils with garlic tempering', price: 5.50, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', badge: 'best-seller' },
    { id: 36, name: 'Saag Paneer', urdu: 'ساگ پنیر', description: 'Spinach with cottage cheese', price: 6.50, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80', badge: null },
    { id: 37, name: 'Mixed Vegetable Curry', urdu: 'مکسڈ سبزی کری', description: 'Seasonal vegetables in curry sauce', price: 5.95, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', badge: null },
    { id: 38, name: 'Chana Masala', urdu: 'چنا مصالحہ', description: 'Chickpeas in spiced tomato sauce', price: 5.50, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', badge: null }
  ],
  drinks: [
    { id: 39, name: 'Mango Lassi', urdu: 'آم لسی', description: 'Sweet yogurt drink with mango', price: 3.50, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80', badge: 'best-seller' },
    { id: 40, name: 'Sweet Lassi', urdu: 'میٹھی لسی', description: 'Traditional sweet yogurt drink', price: 2.95, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80', badge: null },
    { id: 41, name: 'Coca Cola', urdu: 'کوکا کولا', description: '330ml can', price: 1.50, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80', badge: null },
    { id: 42, name: 'Sprite', urdu: 'سپرائٹ', description: '330ml can', price: 1.50, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80', badge: null },
    { id: 43, name: 'Still Water', urdu: 'پانی', description: '500ml bottle', price: 1.20, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80', badge: null },
    { id: 44, name: 'Sparkling Water', urdu: 'چمکتا پانی', description: '500ml bottle', price: 1.50, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80', badge: null }
  ]
};

// Cart state
let cart = JSON.parse(localStorage.getItem('dilshad-cart-kasa')) || [];
let itemQuantities = {};

// Initialize quantities
Object.values(menuData).flat().forEach(item => {
  itemQuantities[item.id] = 1;
});

// DOM Elements
const categoryTabs = document.querySelectorAll('.category-tab');
const floatingCart = document.getElementById('floatingCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const themeToggle = document.getElementById('themeToggle');
const locationModal = document.getElementById('locationModal');
const changeLocationBtn = document.getElementById('changeLocation');
const confirmLocationBtn = document.getElementById('confirmLocation');
const collectionBtn = document.getElementById('collectionBtn');
const modalClose = document.getElementById('modalClose');

// Render menu items
function renderMenuItems() {
  Object.keys(menuData).forEach(category => {
    const grid = document.getElementById(`${category}Grid`);
    if (!grid) return;
    
    grid.innerHTML = menuData[category].map(item => `
      <article class="menu-item-card" data-item-id="${item.id}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          ${item.badge ? `<span class="item-badge ${item.badge}">${item.badge.replace('-', ' ')}</span>` : ''}
        </div>
        <div class="item-content">
          <h3 class="item-name">${item.name}</h3>
          <p class="item-name-urdu">${item.urdu}</p>
          <p class="item-description">${item.description}</p>
          <div class="item-footer">
            <span class="item-price">£${item.price.toFixed(2)}</span>
            <div class="item-controls">
              <button class="qty-btn minus" data-item-id="${item.id}">−</button>
              <span class="qty-display" id="qty-${item.id}">1</span>
              <button class="qty-btn plus" data-item-id="${item.id}">+</button>
              <button class="btn-add-cart" data-item-id="${item.id}">Add</button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  });
  
  // Add event listeners
  attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
  // Quantity buttons
  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = parseInt(btn.dataset.itemId);
      if (itemQuantities[itemId] > 1) {
        itemQuantities[itemId]--;
        document.getElementById(`qty-${itemId}`).textContent = itemQuantities[itemId];
      }
    });
  });
  
  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = parseInt(btn.dataset.itemId);
      itemQuantities[itemId]++;
      document.getElementById(`qty-${itemId}`).textContent = itemQuantities[itemId];
    });
  });
  
  // Add to cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemId = parseInt(btn.dataset.itemId);
      addToCart(itemId);
    });
  });
}

// Add to cart
function addToCart(itemId) {
  const item = Object.values(menuData).flat().find(i => i.id === itemId);
  const quantity = itemQuantities[itemId];
  
  const existingItem = cart.find(i => i.id === itemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  
  // Reset quantity
  itemQuantities[itemId] = 1;
  document.getElementById(`qty-${itemId}`).textContent = 1;
  
  updateCart();
  saveCart();
  
  // Show feedback
  const btn = document.querySelector(`[data-item-id="${itemId}"].btn-add-cart`);
  btn.textContent = '✓ Added';
  btn.style.background = 'var(--success)';
  setTimeout(() => {
    btn.textContent = 'Add';
    btn.style.background = '';
  }, 1000);
}

// Update cart display
function updateCart() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 2.50;
  const total = subtotal + delivery;
  
  // Update floating cart
  document.getElementById('cartCount').textContent = cartCount;
  document.getElementById('cartTotal').textContent = `£${total.toFixed(2)}`;
  floatingCart.style.display = cartCount > 0 ? 'flex' : 'none';
  
  // Update cart sidebar
  const cartItemsContainer = document.getElementById('cartItems');
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: var(--space-8);">Your cart is empty</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">£${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn minus" data-cart-item-id="${item.id}">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn plus" data-cart-item-id="${item.id}">+</button>
            <button class="qty-btn" data-remove-item-id="${item.id}" style="margin-left: auto; color: var(--error);">×</button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Add cart item event listeners
    document.querySelectorAll('[data-cart-item-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = parseInt(btn.dataset.cartItemId);
        const item = cart.find(i => i.id === itemId);
        if (btn.classList.contains('minus') && item.quantity > 1) {
          item.quantity--;
        } else if (btn.classList.contains('plus')) {
          item.quantity++;
        }
        updateCart();
        saveCart();
      });
    });
    
    document.querySelectorAll('[data-remove-item-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = parseInt(btn.dataset.removeItemId);
        cart = cart.filter(i => i.id !== itemId);
        updateCart();
        saveCart();
      });
    });
  }
  
  // Update totals
  document.getElementById('subtotalAmount').textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById('deliveryAmount').textContent = `£${delivery.toFixed(2)}`;
  document.getElementById('grandTotal').textContent = `£${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('dilshad-cart-kasa', JSON.stringify(cart));
}

// Category navigation
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    const section = document.getElementById(category);
    
    // Update active tab
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Scroll to section
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Floating cart click
floatingCart.addEventListener('click', () => {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Close cart
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.querySelector('.theme-icon').textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('dilshad-theme', isLight ? 'light' : 'dark');
});

// Load theme preference (default to dark)
const savedTheme = localStorage.getItem('dilshad-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.querySelector('.theme-icon').textContent = '🌙';
} else {
  themeToggle.querySelector('.theme-icon').textContent = '☀️';
}

// Location modal
changeLocationBtn.addEventListener('click', () => {
  locationModal.classList.add('active');
});

confirmLocationBtn.addEventListener('click', () => {
  locationModal.classList.remove('active');
  // In real app, validate postcode and update delivery area
});

collectionBtn.addEventListener('click', () => {
  locationModal.classList.remove('active');
  document.getElementById('deliveryAmount').textContent = '£0.00';
  // Update total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('grandTotal').textContent = `£${subtotal.toFixed(2)}`;
});

modalClose.addEventListener('click', () => {
  locationModal.classList.remove('active');
});

// Checkout button
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotal < 15) {
    alert('Minimum order is £15.00');
    return;
  }
  
  // In real app, redirect to checkout page
  window.location.href = 'checkout-kasa.html';
});

// Scroll spy for category navigation
const observerOptions = {
  root: null,
  rootMargin: '-180px 0px -50% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const category = entry.target.dataset.category;
      categoryTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
      });
    }
  });
}, observerOptions);

document.querySelectorAll('.menu-category').forEach(section => {
  observer.observe(section);
});

// Initialize
renderMenuItems();
updateCart();

// Show location modal on first visit
if (!localStorage.getItem('dilshad-location-set')) {
  setTimeout(() => {
    locationModal.classList.add('active');
  }, 500);
}
