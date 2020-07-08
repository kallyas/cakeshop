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
];

// get variables
const productsContainer = document.querySelector(".products-container");
const sortingNav = document.querySelector(".sorting-nav ul");
const itemsCounter = document.querySelector(".count");
let count = 0;
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
    button.addEventListener("click", (e) => {
      if (e.target.data - id === item.id) {
        e.target.innerText = `In Cart(${++count})`;
        console.log(e.target.value);
        itemsCounter.innerText = count++;
        updateCount();
        console.log("inner");
      }
    });
    return;
  });
}
function updateCount() {
  itemsCounter.style.visibility = "visible";
}
