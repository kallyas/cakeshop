// get variables
const productsContainer = document.querySelector(".products-container");
const sortingNav = document.querySelector(".sorting-nav ul");
const itemsCounter = document.querySelector(".count");
const totalPrice = document.querySelector(".total-p");
const cartContainer = document.querySelector(".quickviewContainer");
const btnCart = document.querySelector("#cart");
const btnClose = document.querySelector(".close");
const cartList = document.querySelector(".cart-ctn");
let cart = [];

// load Items
window.addEventListener("DOMContentLoaded", () => {
  displaycakesItems(cakes);
  displaySortingNav();
  activateBtnCart();
  loadCartFromStorage();
});

btnClose.addEventListener("click", () => {
  cartContainer.style.right = "-100%";
});

btnCart.addEventListener("click", () => {
  cartContainer.style.right = "0";
  displayCart();
});

function saveCartToStorage() {
  localStorage.setItem("cakeShopCart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("cakeShopCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
    displayCart();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
  if (totalItems > 0) {
    itemsCounter.style.visibility = "visible";
    itemsCounter.innerText = totalItems;
  } else {
    itemsCounter.style.visibility = "hidden";
  }
  
  totalPrice.innerText = `$${total}`;
}

function displayCart() {
  if (cart.length === 0) {
    cartList.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    return;
  }

  let cartHTML = cart.map((item) => {
    return `
      <div class="cart-item">
        <div class="cart-item-header">
          <span class="cart-item-title">${item.title}</span>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
        <div class="cart-item-details">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <div class="cart-item-controls">
            <button class="decrease-qty" data-id="${item.id}">-</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="increase-qty" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
  cartHTML += `
    <div class="cart-total">
      <div class="cart-total-label">Total Amount</div>
      <div class="cart-total-amount">$${total}</div>
    </div>
  `;

  cartList.innerHTML = cartHTML;

  // Add event listeners for cart actions
  document.querySelectorAll(".increase-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      increaseQuantity(parseInt(e.target.dataset.id));
    });
  });

  document.querySelectorAll(".decrease-qty").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      decreaseQuantity(parseInt(e.target.dataset.id));
    });
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeFromCart(parseInt(e.target.dataset.id));
    });
  });
}

function addToCart(productId) {
  const product = cakes.find((cake) => cake.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  displayCart();
  saveCartToStorage();
  updateAddToCartButton(productId);
}

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
    updateCartUI();
    displayCart();
    saveCartToStorage();
    updateAddToCartButton(productId);
  }
}

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(productId);
      return;
    }
    updateCartUI();
    displayCart();
    saveCartToStorage();
    updateAddToCartButton(productId);
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  displayCart();
  saveCartToStorage();
  updateAddToCartButton(productId);
}

function updateAddToCartButton(productId) {
  const button = document.querySelector(`.add-cart[data-id="${productId}"]`);
  if (!button) return;

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    button.innerText = `In Cart (${cartItem.quantity})`;
  } else {
    button.innerText = "Add to cart";
  }
}

function displaycakesItems(cakesItems) {
  let displaycakes = cakesItems.map((item) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    const buttonText = cartItem ? `In Cart (${cartItem.quantity})` : "Add to cart";
    
    return `<div class="product-card">
        <div class="card-header">
          <p>${item.title}</p>
        </div>
        <div class="card-body">
          <img src=${item.img} alt="cake-image" />
        </div>
        <div class="card-footer">
          <button class="add-cart" data-id="${item.id}">
            ${buttonText}
          </button>
          <p>$${item.price}</p>
        </div>
      </div>`;
  });

  displaycakes = displaycakes.join("");
  productsContainer.innerHTML = displaycakes;
}

function displaySortingNav() {
  const categories = cakes.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map((category) => {
      return `<li class="filter" data-id=${category}>${category}</li>`;
    })
    .join("");
  sortingNav.innerHTML = categoryBtns;
  const filterBtns = sortingNav.querySelectorAll(".filter");
  
  // filter items
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      e.currentTarget.classList.add('active');
      
      const category = e.currentTarget.dataset.id;
      const cakesCategory = cakes.filter(
        (cakesItem) => cakesItem.category === category
      );

      if (category === "all") {
        displaycakesItems(cakes);
      } else {
        displaycakesItems(cakesCategory);
      }
      activateBtnCart();
    });
  });
  
  // Set 'all' as active by default
  if (filterBtns.length > 0) {
    filterBtns[0].classList.add('active');
  }
}

function activateBtnCart() {
  const buttons = [...document.querySelectorAll(".add-cart")];
  buttons.forEach((button) => {
    let id = parseInt(button.dataset.id);
    
    // Remove old event listeners by cloning
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    newButton.addEventListener("click", (e) => {
      addToCart(id);
    });
  });
}

// var cartCount = 0,
// 	 buy = $('.btn'),
// 	 span = $('.number'),
// 	 cart = $('.cart'),
// 	 quickview = $('.quickviewContainer'),
// 	 quickViewBtn = $('.quickview'),
// 	 close = $('.quickviewContainer .close'),
// 	 minicart = [],
// 	 totalPrice = [],
// 	 miniCartPrice;

// buy.on('click', addToCart);
// quickViewBtn.on('click', quickView);
// cart.on('click', showMiniCart);
// close.on('click', function(){
// 	quickview.removeClass('active');
// });

// function quickView() {
// 	var description = $(this).parent().find('.description').text(),
// 		 header = $(this).parent().find('.header').text(),
// 		 price = $(this).find('.price'),
// 		 quickViewHeader = $('.quickviewContainer .headline'),
// 		 quickViewDescription = $('.quickviewContainer .description');
// 	clearTimeout(timeQuick);
// 		if(quickview.hasClass('active')){
// 			quickview.removeClass('active');
// 			var timeQuick = setTimeout(function(){
// 				quickview.addClass('active');
// 			}, 300);
// 		} else{
// 			quickview.addClass('active');
// 		}

// 	quickViewHeader.text(header);
// 	quickViewDescription.text(description);
// }

// function showMiniCart() {
// 	$('.mini').toggleClass('visible');
// }

// function addToCart() {
// 	var self = $(this),
// 		 productName = $(this).parent().find('.header').text(),
// 		 miniCartNames = $('.products'),
// 		 names = $('.names'),
// 		 price = $(this).parent().find('.price').text(),
// 		 priceInt = parseInt(price);

// 	totalPrice.push(priceInt);
// 	miniCartPrice = totalPrice.reduce(function(a,b){  return a+b });
// 	$('.miniprice').text('Total amount: ' + miniCartPrice + ",-");
// 	minicart.push(productName);
// 	lastProduct = minicart[minicart.length - 1];
// 	miniCartNames.text('Your cart lines: ');
// 	names.append('<p>' + lastProduct + '</p>');

// 	cartCount++;
// 	span.text(cartCount);
// 	clearTimeout(time);
// 	if(span.hasClass('update')){
// 		span.removeClass('update');
// 		span.addClass('updateQuantity');
// 		var time = setTimeout(function(){
// 			span.removeClass('updateQuantity');
// 			span.addClass('update');
// 		}, 700);
// 	} else{
// 		span.addClass('update');
// 	}
// 	if (cartCount == 1){
// 		cart.toggleClass('icon-basket icon-basket-loaded');
// 	}

// 	$(this).addClass('ok');
// 	var timeOk = setTimeout(function(){
// 		self.removeClass('ok');
// 	}, 1000);
// }
