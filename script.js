const products = [
  { id: 1, name: "Blusa Beige", price: 15000, img: "blusabeige.jpg" },
  { id: 2, name: "Camisa Blanca", price: 18000, img: "camisablanca.jpg" },
  { id: 3, name: "Jean Azul Claro", price: 22000, img: "jeanazulclaro.jpg" },
  { id: 4, name: "Vestido Rosa Palo", price: 28000, img: "vestidorosa.jpg" },
  { id: 5, name: "Sweater Blanco", price: 20000, img: "buzoblanco.jpg" },
  { id: 6, name: "Cartera Nude", price: 17000, img: "carteranude.jpg" },
  { id: 7, name: "Zapatillas Blancas", price: 25000, img: "zapatillasblancas.jpg" },
  { id: 8, name: "Campera Jean", price: 30000, img: "camperajean.jpg" },
  { id: 9, name: "Pollera Beige", price: 16000, img: "pollerabeige.jpg" },
  { id: 10, name: "Blazer Rosa", price: 26000, img: "blazerrosa.jpg" }
];

const container = document.getElementById("products-container");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const message = document.getElementById("message");
const modal = new bootstrap.Modal(document.getElementById("cartModal"));

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Mostrar productos
function renderProducts() {
  container.innerHTML = "";
  products.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">$${p.price}</p>
          <button class="btn btn-outline-pink w-100" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

// Agregar al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCart();
}

// Renderizar carrito
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <div>
        <span>$${item.price * item.quantity}</span>
        <button class="btn btn-sm btn-light ms-2" onclick="removeFromCart(${item.id})">❌</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  totalEl.textContent = total;
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  renderCart();
  cartCount.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
}

// Vaciar y comprar
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCart();
});

document.getElementById("buy").addEventListener("click", () => {
  if (cart.length === 0) return alert("Tu carrito está vacío 💔");

  cart = [];
  saveCart();
  updateCart();
  modal.hide();

  message.classList.remove("d-none");
  setTimeout(() => message.classList.add("d-none"), 2000);
});

// Abrir modal carrito
document.getElementById("cart-btn").addEventListener("click", () => {
  renderCart();
  modal.show();
});

// Inicializar
renderProducts();
updateCart();
