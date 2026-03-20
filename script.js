const ORDER_URL = 'https://dilshadrestau.com/order';
const orderButtons = ['orderTopBtn','orderHeroBtn','orderBottomBtn','orderFooterBtn'];
orderButtons.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = ORDER_URL;
  el.target = '_blank';
  el.rel = 'noopener';
});
document.getElementById('year').textContent = new Date().getFullYear();
