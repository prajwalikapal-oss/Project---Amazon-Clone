let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function addToCart(name,price){

let item = cart.find(p => p.name === name);

if(item){
item.qty += 1;
}else{
cart.push({name,price,qty:1});
}

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert("Item added to cart");

}

function updateCartCount(){

let count = cart.reduce((sum,item)=> sum + item.qty ,0);

let cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.innerText = count;
}

}

function loadCart(){

let container = document.getElementById("cart-items");

if(!container) return;

container.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

let div = document.createElement("div");

div.className="cart-item";

div.innerHTML = `
<span>${item.name}</span>

<div>
<button onclick="decreaseQty(${index})">-</button>
${item.qty}
<button onclick="increaseQty(${index})">+</button>
</div>

<span>₹${item.price * item.qty}</span>

<button onclick="removeItem(${index})">Remove</button>
`;

container.appendChild(div);

});

document.getElementById("total-price").innerText = total;

}

function increaseQty(i){

cart[i].qty++;

saveCart();

}

function decreaseQty(i){

if(cart[i].qty>1){
cart[i].qty--;
}else{
cart.splice(i,1);
}

saveCart();

}

function removeItem(i){

cart.splice(i,1);

saveCart();

}

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

updateCartCount();

}

loadCart();