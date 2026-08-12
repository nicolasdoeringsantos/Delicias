import paoBeterraba from '../images/paobete.png';
import bolachaManteiga from '../images/bolachamanteiga.png';
import paoIntegral from '../images/paointegral.png';
import massaCaseira from '../images/massa.jpg';
import bolachaGlaceada from '../images/bolacha1.png';
import rosquinhaChocolate from '../images/bolachacho.png';
import bolachaGoiabada from '../images/bolachagoi.png';
import paoMilho from '../images/paomilho.png';

const WHATS_NUMBER = '5554984163345';

const products = [
  { name: 'Pão rocambole de beterraba', price: 'R$ 10,00', image: paoBeterraba },
  { name: 'Biscoitos amanteigados', price: 'R$ 15,00', image: bolachaManteiga },
  { name: 'Pão integral', price: 'R$ 10,00', image: paoIntegral },
  { name: 'Massa caseira', price: 'R$ 8,00', image: massaCaseira },
  { name: 'Bolachas glaceadas', price: 'R$ 15,00', image: bolachaGlaceada },
  { name: 'Rosquinha de manteiga com chocolate', price: 'R$ 15,00', image: rosquinhaChocolate },
  { name: 'Bolacha de manteiga com goiabada', price: 'R$ 15,00', image: bolachaGoiabada },
  { name: 'Pão de milho', price: 'R$ 10,00', image: paoMilho }
];

function buildMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = products.map((product) => {
    const message = encodeURIComponent(`Olá! Tenho interesse em ${product.name} (${product.price}). Poderia me passar mais informações?`);
    return `<article class="product-card"><div class="product-photo"><img src="${product.image}" alt="${product.name}" loading="lazy"></div><div class="product-info"><h3>${product.name}</h3><strong>${product.price}</strong><a href="https://wa.me/${WHATS_NUMBER}?text=${message}" target="_blank" rel="noopener">Encomendar <i data-lucide="arrow-up-right"></i></a></div></article>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  buildMenu();
  lucide.createIcons();

  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', open);
    button.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
    lucide.createIcons();
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));
});
