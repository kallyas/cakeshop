// get variables
const productsContainer = document.querySelector(".products-container");
const sortingNav = document.querySelector(".sorting-nav ul");
const itemsCounter = document.querySelector(".count");
const totalPrice = document.querySelector(".total-p");
let count = 0;
let total = 0;
let cart = [];
let inCart = [];
// load Items
window.addEventListener("DOMContentLoaded", () => {
  displaycakesItems(cakes);
  displaySortingNav();
  activateBtnCart();
});

function displaycakesItems(cakesItems) {
  let displaycakes = cakesItems.map((item) => {
    return `<div class="product-card">
        <div class="card-header">
          <p>${item.title}</p>
        </div>
        <div class="card-body">
          <img src=${item.img} alt="cake-image" />
        </div>
        <div class="card-footer">
          <button class="add-cart" data-id="${item.id}">
            Add to cart
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
      const category = e.currentTarget.dataset.id;
      const cakesCategory = cakes.filter(
        (cakesItem) => cakesItem.category === category
      );
      // console.log(cakesCategory);
      if (category === "all") {
        displaycakesItems(cakes);
      } else {
        displaycakesItems(cakesCategory);
      }
      activateBtnCart();
    });
  });
}

function activateBtnCart() {
  const buttons = [...document.querySelectorAll(".add-cart")];
  buttons.forEach((button) => {
    let count = 0;
    let id = button.dataset.id;
    button.addEventListener("click", (e) => {
      if (e.target.dataset.id === id) {
        e.target.innerText = `In Cart(${(count += 1)})`;
        let counter = cart.push(
          cakes.filter((cake) => cake.id === parseInt(id))[0]
        );
        total = cart
          .map((item) => item.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2);
        addPrice(total);
        console.log(`Added product with Id ${id}`);
        itemsCounter.style.visibility = "visible";
        itemsCounter.innerText = counter;
      }
    });
  });
}

function addPrice(price) {
  totalPrice.innerText = `$${price}`;
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
