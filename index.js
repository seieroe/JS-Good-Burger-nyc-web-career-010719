let burgerMenu = document.querySelector("#burger-menu")
let yourOrders = document.querySelector("#order-list")
let customBurger = document.querySelector("#custom-burger")
/*************************
content loaded
*************************/
document.addEventListener("DOMContentLoaded", () => {

  fetchBurgers()

})
/*************************
fetch & render burger
*************************/
function fetchBurgers(){
  fetch("http://localhost:3000/burgers")
  .then(r=>r.json())
  .then(burgers => renderAllBurgers(burgers))
}
function renderAllBurgers(burgers){
  burgers.forEach(burger => renderSingleBurger(burger))
}
function renderSingleBurger(burger){
  burgerMenu.innerHTML += `
  <div class="burger">
  <h3 class="burger_title">${burger.name}</h3>
  <img src=${burger.image}>
  <p class="burger_description">
  ${burger.description}
  </p>
  <button id="burgerbutton" data-name="${burger.name}" class="button">Add to Order</button>
  <button id="deletebutton" data-delete="${burger.id}" class="button">Delete</button>
  </div>
  `
}
/**************************
adds burger to your orders
***************************/
burgerMenu.addEventListener("click", function(event){
  if (event.target.id === "burgerbutton"){
    yourOrders.innerHTML += `
      <li>${event.target.dataset.name}</li>
    `
  }
  /**************
  deletes burger
  ***************/
  if (event.target.id === "deletebutton"){
    let id = event.target.dataset.delete
    fetch(`http://localhost:3000/burgers/${id}`, {method: "DELETE"})
    .then(burgers => {
      burgerMenu.innerHTML = ""
      fetchBurgers()
    })
  }

})
/*************************
creates custom burger
*************************/
customBurger.addEventListener("submit", function(event){
  let inputName = customBurger.querySelector("#burger-name").value
  let inputDescription = customBurger.querySelector("#burger-description").value
  let inputUrl = customBurger.querySelector("#burger-image").value

  let data =  {
    "name": inputName,
    "description": inputDescription,
    "image": inputUrl
  }

  event.preventDefault()

  fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r=>r.json())
  .then(burger => renderSingleBurger(burger))



})
