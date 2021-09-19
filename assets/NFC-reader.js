
"use strict";

const body = document.body;
const bgColorsBody = ["#2a9d8f;"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");
class Post {
  constructor(title, img) {
    this.title = title;
    this.img = img;
  }}
  
  
  const app = new Vue({
  el: '#app',
  data: {
    search: '',
    postList: [
    new Post(
    'Nfc Card 1',
    './assets/images/nfc_card.png'),
  
    new Post(
    'Nfc Card 4',
    './assets/images/nfc_card.png'),
  
  
  
    new Post(
    'Nfc Card 3',
      './assets/images/nfc_card.png'),
    new Post(
      'Nfc Card 5',
        './assets/images/nfc_card.png'),
  
    new Post(
    'Nfc Card 2',
      './assets/images/nfc_card.png')] },
  
  
  
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    } } });

function clickItem(item, index) {

  menu.style.removeProperty("--timeOut");

  if (activeItem == item) return;

  if (activeItem) {
    activeItem.classList.remove("active");
  }


  item.classList.add("active");
  body.style.backgroundColor = bgColorsBody[index];
  activeItem = item;
  offsetMenuBorder(activeItem, menuBorder);

}
function fensterOeffnen() {
  var x = document.getElementById("start");
  var y = document.getElementById("next");
  // If selected element is hidden
  if (x.style.display === "none") {
  
    // Show the hidden element
    x.style.display = "block";
    y.style.display = "none";
    // Else if the selected element is shown
  } else {
  
    // Hide the element
    x.style.display = "none";
    y.style.display = "block";
  }
}


function offsetMenuBorder(element, menuBorder) {

  const offsetActiveItem = element.getBoundingClientRect();
  const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
  menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

  item.addEventListener("click", () => clickItem(item, index));

});

window.addEventListener("resize", () => {
  offsetMenuBorder(activeItem, menuBorder);
  menu.style.setProperty("--timeOut", "none");
});