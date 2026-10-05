# Dilshad Restaurant - Kasa Sushi Inspired Redesign

## 🎯 Overview

After analyzing Kasa Sushi's website (kasasushi.vn), this plan adapts their successful design patterns to create a modern, streamlined ordering experience for Dilshad Restaurant.

## 🔑 Key Kasa Sushi Design Elements to Adopt

### 1. **Clean, Minimalist Layout**
- White/light backgrounds with dark text (opposite of current dark theme)
- Generous whitespace
- Simple, uncluttered interface
- Focus on food photography

### 2. **Simplified Navigation**
- Horizontal category tabs that stick on scroll
- Single-page ordering experience
- Minimal header with essential links only
- Mobile-first approach

### 3. **Streamlined Ordering Flow**
- Location selection FIRST (before showing menu)
- Inline quantity controls (+/- buttons)
- Floating cart button (bottom right)
- Quick "Add to Cart" without modals
- Real-time cart updates

### 4. **Product Display**
- Grid layout with consistent card sizes
- Large, square food images
- Price prominently displayed
- Minimal text (name, price, brief description)
- Japanese characters for authenticity (we'll use Urdu/Hindi)
- Badge system (Best Seller, Must Try, etc.)

### 5. **Category Navigation**
- Sticky horizontal scroll categories
- Click to jump to section
- Visual indicators for active category
- Smooth scroll behavior

## 📋 Detailed Implementation Plan


### Phase 1: Color Scheme Transformation

**From Dark to Light:**

```css
/* New Light Theme - Kasa Inspired */
:root {
  /* Base Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-tertiary: #F1F3F5;
  
  /* Text Colors */
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #6C757D;
  
  /* Gold Accent - More Subtle */
  --accent-gold: #D4AF37;
  --accent-gold-light: #E8C55B;
  --accent-gold-dark: #B8941F;
  
  /* Borders */
  --border-light: #E9ECEF;
  --border-medium: #DEE2E6;
  --border-dark: #CED4DA;
  
  /* Status Colors */
  --success: #28A745;
  --error: #DC3545;
  --warning: #FFC107;
  --info: #17A2B8;
}
```

**Keep Dark Mode as Option:**
- Add toggle in header
- Use CSS custom properties for easy switching
- Save preference in localStorage


### Phase 2: Ordering Page Complete Redesign

**New Structure:**

```html
<!-- Simplified Header -->
<header class="header-minimal">
  <div class="container">
    <a href="/" class="logo">DILSHAD</a>
    <nav class="nav-minimal">
      <a href="/about">About</a>
      <a href="/menu">Menu</a>
      <a href="/booking">Book Table</a>
      <a href="/contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle">🌙</button>
      <a href="/account" class="account-link">Account</a>
    </div>
  </div>
</header>

<!-- Location Selection Modal (Shows First) -->
<div class="location-modal" id="locationModal">
  <div class="modal-content">
    <h2>Select Delivery Location</h2>
    <p>Please enter your address to see available items</p>
    <input type="text" placeholder="Enter postcode or address" />
    <button class="btn-primary">Confirm Location</button>
    <button class="btn-link">Collection Instead</button>
  </div>
</div>

<!-- Category Navigation (Sticky) -->
<nav class="category-nav" id="categoryNav">
  <div class="container">
    <div class="category-scroll">
      <button class="category-tab active" data-category="specials">
        House Specials
      </button>
      <button class="category-tab" data-category="starters">
        Starters
      </button>
      <button class="category-tab" data-category="tandoori">
        Tandoori
      </button>
      <button class="category-tab" data-category="biryani">
        Biryani
      </button>
      <button class="category-tab" data-category="naan">
        Naan & Bread
      </button>
      <button class="category-tab" data-category="rice">
        Rice
      </button>
      <button class="category-tab" data-category="sides">
        Sides
      </button>
      <button class="category-tab" data-category="drinks">
        Drinks
      </button>
    </div>
  </div>
</nav>

<!-- Menu Grid -->
<main class="menu-main">
  <div class="container">
    <!-- Category Section -->
    <section class="menu-category" id="specials" data-category="specials">
      <h2 class="category-title">House Specials</h2>
      
      <div class="menu-grid-kasa">
        <!-- Menu Item Card -->
        <article class="menu-item-card">
          <div class="item-image">
            <img src="..." alt="Chicken Tikka Masala" />
            <span class="item-badge best-seller">Best Seller</span>
          </div>
          <div class="item-content">
            <h3 class="item-name">Chicken Tikka Masala</h3>
            <p class="item-name-urdu">چکن ٹکہ مصالحہ</p>
            <p class="item-description">Tender chicken in creamy tomato sauce</p>
            <div class="item-footer">
              <span class="item-price">£12.95</span>
              <div class="item-controls">
                <button class="qty-btn minus">−</button>
                <span class="qty-display">1</span>
                <button class="qty-btn plus">+</button>
                <button class="btn-add-cart">Add</button>
              </div>
            </div>
          </div>
        </article>
        
        <!-- More items... -->
      </div>
    </section>
    
    <!-- More categories... -->
  </div>
</main>

<!-- Floating Cart Button -->
<button class="floating-cart" id="floatingCart">
  <span class="cart-icon">🛒</span>
  <span class="cart-count">3</span>
  <span class="cart-total">£45.80</span>
</button>

<!-- Cart Sidebar (Slides from Right) -->
<aside class="cart-sidebar" id="cartSidebar">
  <div class="cart-header">
    <h3>Your Order</h3>
    <button class="cart-close">×</button>
  </div>
  
  <div class="cart-items">
    <!-- Cart items here -->
  </div>
  
  <div class="cart-footer">
    <div class="cart-totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>£42.80</span>
      </div>
      <div class="total-row">
        <span>Delivery</span>
        <span>£3.00</span>
      </div>
      <div class="total-row grand">
        <span>Total</span>
        <span>£45.80</span>
      </div>
    </div>
    <button class="btn-checkout">Proceed to Checkout</button>
  </div>
</aside>
```

