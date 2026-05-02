let shop = document.getElementById('shop');

let shopItemsData = [{
    id: '1',
    name:"Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing",
    img: "images/img-1.jpg"
},
{
    id: '2',
    name:"Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing",
    img: "images/img-2.jpg"
},
{
    id: '3',
    name:"T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing",
    img: "images/img-3.jpg"
},
{
    id: '4',
    name:"Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing",
    img: "images/img-4.jpg"
},
];

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) =>{
        let {id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        console.log(search.itemCount);
        return `
    <div class="item" id = "product-id-${id}">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div class="quantity" id = "${id}" >${search.itemCount === undefined ? 0 : search.itemCount}</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""));
}

// console.log(basket)

generateShop();


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
    
    // console.log(basket)
    
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.itemCount);
    document.getElementById(id).innerHTML = search.itemCount;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map(x => x.itemCount).reduce((x,y) => x+y,0);
    
}

calculation();