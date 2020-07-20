const cakes = [
  {
    id: 1,
    title: "Black Forest",
    category: "cakes",
    price: 15.99,
    img: "./images/black-forest.png",
  },
  {
    id: 2,
    title: "Black Forest",
    category: "cup cakes",
    price: 13.99,
    img: "./images/cake-2.png",
  },
  {
    id: 3,
    title: "Black Forest",
    category: "bread",
    price: 6.99,
    img: "./images/double-choc_1.jpg",
  },
  {
    id: 4,
    title: "Black Forest",
    category: "breakfast",
    price: 20.99,
    img: "./images/double-choc_1.jpg",
  },
  {
    id: 5,
    title: "Black Forest",
    category: "bakery",
    price: 22.99,
    img: "./images/sponge-cake-recipe.png",
    id: 6,
    title: "Black Forest",
    category: "bakery",
    price: 18.99,
    img: "./images/StrawberryFields.png",
  },
  {
    id: 7,
    title: "Black Forest",
    category: "cup cakes",
    price: 8.99,
    img: "./images/white-mud-cake.png",
  },
  {
    id: 8,
    title: "Black Forest",
    category: "cakes",
    price: 12.99,
    img: "./images/black_10.jpg",
  },
  {
    id: 9,
    title: "Black Forest",
    category: "bakery",
    price: 16.99,
    img: "./images/cake-2.png",
  },
  {
    id: 10,
    title: "Black Forest",
    category: "bread",
    price: 39.99,
    img: "./images/black-forest.png",
  },
  {
    id: 11,
    title: "Yellow Butter Cake",
    category: "cake",
    price: 20.56,
    img: "./images/yellowbuttercake.png",
  },
  {
    id: 12,
    title: "Lemon Iced Cake",
    category: "Bakery",
    price: 20.56,
    img: "./images/lemonIced.png",
  },
  {
    id: 13,
    title: "Lemon Loaf Cake",
    category: "cup",
    price: 30.56,
    img: "./images/Lemonloaf.png",
  },
];

// get variables
const productsContainer = document.querySelector(".products-container");
const sortingNav = document.querySelector(".sorting-nav ul");
const itemsCounter = document.querySelector(".count");
let count = 0;
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
      const cakesCategory = cakes.filter(function (cakesItem) {
        // console.log(cakesItem.category);
        if (cakesItem.category === category) {
          return cakesItem;
        }
      });
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
        let counter = cart.push(cakes.title);
        console.log(`Added product with Id ${id}`);
        itemsCounter.style.visibility = "visible";
        itemsCounter.innerText = counter;
      }
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
