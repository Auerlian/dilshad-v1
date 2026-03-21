const MENU = [
  { id: 'ctm', name: 'Chicken Tikka Masala', desc: 'Creamy tomato masala, charcoal-finished tikka.', price: 10.95 },
  { id: 'lrj', name: 'Lamb Rogan Josh', desc: 'Rich Kashmiri-style curry with slow-cooked lamb.', price: 12.95 },
  { id: 'gkp', name: 'Garlic Chilli King Prawn', desc: 'Bold heat, garlic butter, finished with fresh herbs.', price: 13.95 },
  { id: 'gn', name: 'Giant Naan', desc: 'Fresh tandoor naan, ideal for sharing.', price: 4.95 },
  { id: 'pv', name: 'Pilau Rice', desc: 'Fragrant basmati rice with whole spices.', price: 3.95 },
  { id: 'ob', name: 'Onion Bhaji', desc: 'Crispy spiced onion fritters.', price: 4.5 }
];

const DELIVERY_FEE = 2.5;
const WHATSAPP_ORDER_NUMBER = '441214725016';

const menuGrid = document.getElementById('menuGrid');
const cartItemsEl = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const deliveryEl = document.getElementById('delivery');
const totalEl = document.getElementById('total');
const orderTypeEl = document.getElementById('orderType');
const addressWrap = document.getElementById('addressWrap');
const addressEl = document.getElementById('address');
const checkoutForm = document.getElementById('checkoutForm');

const cart = new Map();

const gbp = (n) => `£${n.toFixed(2)}`;

function renderMenu() {
  menuGrid.innerHTML = MENU.map(item => `
    <article class="dish">
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <div class="dish-foot">
        <strong>${gbp(item.price)}</strong>
        <button class="btn btn-primary" data-add="${item.id}" type="button">Add</button>
      </div>
    </article>
  `).join('');

  menuGrid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.add));
  });
}

function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  const existing = cart.get(id);
  if (existing) existing.qty += 1;
  else cart.set(id, { ...item, qty: 1 });
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.get(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.delete(id);
  renderCart();
}

function renderCart() {
  const items = [...cart.values()];

  if (!items.length) {
    cartItemsEl.innerHTML = '<p class="muted">Your basket is empty. Add dishes from the menu.</p>';
  } else {
    cartItemsEl.innerHTML = items.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p class="muted">${gbp(item.price)} each</p>
        </div>
        <div class="qty-controls">
          <button type="button" data-minus="${item.id}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-plus="${item.id}">+</button>
        </div>
      </div>
    `).join('');

    cartItemsEl.querySelectorAll('[data-minus]').forEach(btn => btn.addEventListener('click', () => updateQty(btn.dataset.minus, -1)));
    cartItemsEl.querySelectorAll('[data-plus]').forEach(btn => btn.addEventListener('click', () => updateQty(btn.dataset.plus, +1)));
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = orderTypeEl.value === 'delivery' ? DELIVERY_FEE : 0;
  subtotalEl.textContent = gbp(subtotal);
  deliveryEl.textContent = gbp(delivery);
  totalEl.textContent = gbp(subtotal + delivery);
}

orderTypeEl.addEventListener('change', () => {
  const delivery = orderTypeEl.value === 'delivery';
  addressWrap.style.display = delivery ? 'block' : 'none';
  addressEl.required = delivery;
  renderCart();
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const items = [...cart.values()];
  if (!items.length) {
    alert('Please add at least one dish to your basket.');
    return;
  }

  const formData = new FormData(checkoutForm);
  const data = Object.fromEntries(formData.entries());
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = data.orderType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  const lines = [
    'New online order',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Order Type: ${data.orderType}`,
    data.orderType === 'delivery' ? `Address: ${data.address || 'N/A'}` : null,
    `Preferred Time: ${data.time || 'ASAP'}`,
    data.notes ? `Notes: ${data.notes}` : null,
    '',
    'Items:',
    ...items.map(i => `- ${i.name} x${i.qty} (${gbp(i.price * i.qty)})`),
    '',
    `Subtotal: ${gbp(subtotal)}`,
    `Delivery: ${gbp(delivery)}`,
    `Total: ${gbp(total)}`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  const waUrl = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${text}`;
  window.open(waUrl, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
renderMenu();
renderCart();
