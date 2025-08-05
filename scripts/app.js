console.log("E-Commerce Website Loaded");

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const productGrid = document.getElementById("productGrid");
  const cartBadge = document.querySelector(".badge");
  const cartPanel = document.getElementById("cartPanel");
  const cartItemsContainer = document.getElementById("cartItems");
  const closeCartBtn = document.getElementById("closeCart");
  const cartIcon = document.querySelector(".cart");

  let cartCount = 0;
  let cartItems = [];

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("mobile-nav");
  });

  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("active");
    updateCartUI();
  });

  closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });

  function updateCartUI() {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <p><strong>${item.title}</strong></p>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
      `).join('');
    }
  }

  // Fetch and display products
  fetch("https://fakestoreapi.com/products?limit=20")
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3>${product.title}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;

        productGrid.appendChild(card);

        const addToCartButton = card.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
          cartCount++;
          cartBadge.textContent = cartCount;

          cartItems.push({
            title: product.title,
            price: product.price,
          });

          updateCartUI();
        });
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
      productGrid.innerHTML = "<p>Failed to load products.</p>";
    });
});
