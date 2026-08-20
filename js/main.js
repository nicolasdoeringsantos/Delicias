import paoBeterraba from '../images/paobete.webp';
import bolachaManteiga from '../images/bolachamanteiga.webp';
import paoIntegral from '../images/paointegral.webp';
import massaCaseira from '../images/massa.webp';
import bolachaGlaceada from '../images/bolacha1.webp';
import rosquinhaChocolate from '../images/bolachacho.webp';
import bolachaGoiabada from '../images/bolachagoi.webp';
import paoMilho from '../images/paomilho.webp';
import massaIntegral from '../images/massaintegral.webp';
import massaBeterraba from '../images/massabeterraba.webp';

const WHATS_NUMBER = '555499524097';

const products = [
  { id: 'pao-beterraba', name: 'Pão rocambole de beterraba', price: 12, priceLabel: 'R$ 12,00', image: paoBeterraba },
  { id: 'biscoitos-amanteigados', name: 'Biscoitos amanteigados', price: 15, priceLabel: 'R$ 15,00', image: bolachaManteiga },
  { id: 'pao-integral', name: 'Pão integral', price: 12, priceLabel: 'R$ 12,00', image: paoIntegral },
  { id: 'massa-caseira', name: 'Massa caseira', price: 10, priceLabel: 'R$ 10,00 / 500g', image: massaCaseira },
  { id: 'bolachas-glaceadas', name: 'Bolachas glaceadas', price: 15, priceLabel: 'R$ 15,00', image: bolachaGlaceada },
  { id: 'rosquinha-chocolate', name: 'Biscoito amanteigado de milho coberto com chocolate meio amargo', price: 15, priceLabel: 'R$ 15,00', image: rosquinhaChocolate },
  { id: 'bolacha-goiabada', name: 'Bolacha de manteiga com goiabada', price: 15, priceLabel: 'R$ 15,00', image: bolachaGoiabada },
  { id: 'pao-milho', name: 'Pão de milho', price: 10, priceLabel: 'R$ 10,00', image: paoMilho },
  { id: 'massa-integral', name: 'Massa integral', price: 12, priceLabel: 'R$ 12,00 / 200g', image: massaIntegral },
  { id: 'massa-integral-beterraba', name: 'Massa integral de beterraba', price: 12, priceLabel: 'R$ 12,00 / 200g', image: massaBeterraba }
];

const cart = new Map();

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function cartCount() {
  return [...cart.values()].reduce((sum, qty) => sum + qty, 0);
}

function cartTotal() {
  return [...cart.entries()].reduce((sum, [id, qty]) => sum + products.find((p) => p.id === id).price * qty, 0);
}

function buildMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = products.map((product, index) => {
    const delay = Math.min(index % 4, 3) * 70;
    return `
    <article class="product-card reveal" style="--d:${delay}ms">
      <div class="product-photo"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <strong>${product.priceLabel}</strong>
        <button type="button" class="add-to-cart" data-id="${product.id}"><i data-lucide="cart-plus"></i>Adicionar</button>
      </div>
    </article>
  `;
  }).join('');
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
}

function renderCart() {
  const count = cartCount();
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count > 0 ? count : '';

  const items = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  const bar = document.getElementById('cartBar');

  if (count === 0) {
    items.innerHTML = '';
    empty.hidden = false;
    foot.hidden = true;
    bar.hidden = true;
    document.body.classList.remove('has-cart');
    return;
  }

  empty.hidden = true;
  foot.hidden = false;
  bar.hidden = false;
  document.body.classList.add('has-cart');
  document.getElementById('cartBarTotal').textContent = formatBRL(cartTotal());
  document.getElementById('cartBarCount').textContent = count;
  items.innerHTML = [...cart.entries()].map(([id, qty]) => {
    const product = products.find((p) => p.id === id);
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <span>${product.priceLabel}</span>
          <div class="cart-qty">
            <button type="button" data-action="dec" data-id="${id}" aria-label="Diminuir quantidade">−</button>
            <span>${qty}</span>
            <button type="button" data-action="inc" data-id="${id}" aria-label="Aumentar quantidade">+</button>
          </div>
          <button type="button" class="cart-item-remove" data-action="remove" data-id="${id}">Remover</button>
        </div>
        <strong class="cart-item-price">${formatBRL(product.price * qty)}</strong>
      </div>
    `;
  }).join('');
  document.getElementById('cartTotal').textContent = formatBRL(cartTotal());
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('is-open');
  document.getElementById('cartOverlay').classList.add('is-visible');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('is-open');
  document.getElementById('cartOverlay').classList.remove('is-visible');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
}

function buildWhatsMessage() {
  const lines = [...cart.entries()].map(([id, qty]) => {
    const product = products.find((p) => p.id === id);
    return `- ${product.name} (${product.priceLabel}) x${qty} = ${formatBRL(product.price * qty)}`;
  });
  return `Olá! Vim pelo site e gostaria de finalizar o seguinte pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatBRL(cartTotal())}`;
}

function checkout() {
  const text = encodeURIComponent(buildWhatsMessage());
  window.open(`https://wa.me/${WHATS_NUMBER}?text=${text}`, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  buildMenu();
  lucide.createIcons();
  renderCart();
  initReveal();

  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', open);
    button.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    lucide.createIcons();
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));

  document.getElementById('cartOpen').addEventListener('click', openCart);
  document.getElementById('cartBarOpen').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  document.getElementById('menuGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    const id = btn.dataset.id;
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    btn.classList.add('is-added');
    setTimeout(() => btn.classList.remove('is-added'), 400);
  });

  document.getElementById('cartItems').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    const qty = cart.get(id) || 0;
    if (action === 'inc') cart.set(id, qty + 1);
    else if (action === 'dec') {
      if (qty <= 1) cart.delete(id);
      else cart.set(id, qty - 1);
    } else if (action === 'remove') cart.delete(id);
    renderCart();
  });

  document.getElementById('cartCheckout').addEventListener('click', checkout);

  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});