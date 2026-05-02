let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);
let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map(x => x.itemCount).reduce((x,y) => x+y,0);
    
}

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, itemCount} = x;
            let search = shopItemsData.find(y => y.id === x.id) || [];
            return `
            <div class="cart-item">
                <img width="100px" src="${search.img}"/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick=removeItem("${id}")></i>
                    </div>

                    <div class="cart-buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div class="quantity" id = "${id}" >${itemCount}</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>
                        <p>$ ${itemCount*search.price}<p>
                    </h3>
                </div>
            </div>
            `
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart Is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back To Home</button>
        </a>
        `
    }
}

generateCartItems();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    
    
    if(search === undefined){
        basket.push({
            id: id,
            itemCount: 1,
        });
    }
    else{
        search.itemCount ++;
    }

    generateCartItems();

    // alert(`increment on id: ${id}`);
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(id);
};

let decrement = (id) => {

    let search = basket.find((x) => x.id === id);
    
    if(search === undefined) return;
    if(search.itemCount === 0) return;
    
    search.itemCount --;
    

    // alert(`decrement on id: ${id}`);
    update(id);

    basket = basket.filter(x => x.itemCount !== 0)
    generateCartItems();
    // console.log(basket)
    
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.itemCount);
    document.getElementById(id).innerHTML = search.itemCount;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    // console.log(id)
    basket = basket.filter(x => x.id !== id)
    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    totalAmount();

    calculation();

    update(id);
}

let totalAmount = () => {
    if(basket.length !==0){
        let amount = basket.map(x => {
            let {id, itemCount} = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            return itemCount * search.price
        }).reduce((x,y) => x + y, 0)
        // console.log(amount)
        label.innerHTML = `
        <h2>Total Bill: ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button class="removeAll">Clear</button>
        `; 
    }
    else return
};

totalAmount();