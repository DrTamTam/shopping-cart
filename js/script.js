//open and close cart
let cartsIcon = document.querySelector("#cart-icon")
let carts = document.querySelector(".carts")
let closeCarts = document.querySelector("#close-cart")

cartsIcon.onclick = () => {
    carts.classList.add("active")
}

closeCarts.onclick = () => {
    carts.classList.remove("active")
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

//remove cart item
function ready(){
    let removeCartButtons = document.getElementsByClassName("carts-remove")
    console.log(removeCartButtons)
    for (let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
//change cart quantity
    let quantityInputs = document.getElementsByClassName("carts-quantity")
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }
    //add to cart
    let addCart = document.getElementsByClassName("cart")
    for (let i = 0; i < addCart.length; i++){
        let button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }


}
//remove cart item
function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal()
}
//quantity change
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1 
    }
    updatetotal()
}

//Add to cart
function addCartClicked(event){
    let button = event.target
    let buyItem = button.parentElement
    let title = buyItem.getElementsByClassName("gown-title")[0].innerText
    let price = buyItem.getElementsByClassName("price")[0].innerText
    let productImage = buyItem.getElementsByClassName("gown-img")[0].src
    addProductToCart(title, price, productImage)
    updatetotal()
}
function addProductToCart(title, price, productImage){
    let cartShopBox  = document.createElement("div")
    cartShopBox.classList.add("carts-box")
    let cartItems = document.getElementsByClassName("carts-content")[0]
    let cartItemsNames = cartItems.getElementsByClassName("carts-product-title")
    for (let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText === title){
            alert("You have added this item to cart")
            return
        }
    }
    let cartBoxContent = `
                        <img src="${productImage}" alt="evening dress" class="carts-img">
                        <div class="detail-box">
                            <div class="carts-product-title">${title}</div>
                            <div class="carts-price">${price}</div>
                            <input type="number" value="1" class="carts-quantity">
                        </div>
                        <i class='bx bxs-trash-alt carts-remove' ></i>`
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("carts-remove")[0].addEventListener("click", removeCartItem)
    cartShopBox.getElementsByClassName("carts-quantity")[0].addEventListener("change", quantityChanged)
}

//update total price and count of cart item
function updatetotal(){
    let cartContent = document.getElementsByClassName("carts-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("carts-box")
    let total = 0
    let count = 0
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName("carts-price")[0]
        let quantityElement = cartBox.getElementsByClassName("carts-quantity")[0]
        let price = parseFloat(priceElement.innerText.replace("₦", ""))
        let quantity = quantityElement.value
        total = total + (price * quantity)
        count ++ 
        if (count > 0){
            cartsIcon.classList.add("non-empty")
            let root = document.querySelector(":root")
            root.style.setProperty("--after-content", `"${count}`)
            } else if (count = 0){
                window.location.reload()
            }
    }
        document.getElementsByClassName("total-price")[0].innerText = "₦" + total
}

//count 

//go to login details when buy item is clicked
let loginDetails = document.querySelector(".btn-buy")
let login = document.querySelector(".login")
let closeLogin = document.querySelector("#close-login")

loginDetails.onclick = () => {
    login.classList.add("active")
}

closeLogin.onclick = () => {
    login.classList.remove("active")
}