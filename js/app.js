const menu = [
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
  displayMenuItems(menu);
  displaySortingNav();
  activateBtnCart();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    return `<div class="product-card">
        <div class="card-header">
          <p>${item.title}</p>
        </div>
        <div class="card-body">
          <img src=${item.img} alt="cake-image" />
        </div>
        <div class="card-footer">
          <button class="add-cart">
            Add to cart
          </button>
          <p>$${item.price}</p>
        </div>
      </div>`;
  });

  displayMenu = displayMenu.join("");
  productsContainer.innerHTML = displayMenu;
}

function displaySortingNav() {
  const categories = menu.reduce(
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
      const menuCategory = menu.filter(function (menuItem) {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      // console.log(menuCategory);
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
      activateBtnCart();
    });
  });
}

function activateBtnCart() {
  const buttons = [...document.querySelectorAll(".add-cart")];
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.innerText = `In Cart(${++count})`;
      itemsCounter.innerText = count++;
      updateCount();
      console.log("inner");
    });
    return;
  });
}
function updateCount() {
  itemsCounter.style.visibility = "visible";
}
