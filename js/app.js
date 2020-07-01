// get variables
const itemsCounter = document.querySelector(".count");
const buttons = [...document.querySelectorAll(".add-cart")];
let count = 0;
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.innerText = `In Cart(${++count})`;
    itemsCounter.innerText = count++;
    updateCount();
  });
  return;
});

function updateCount() {
  itemsCounter.style.visibility = "visible";
}
