
const loadItems = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((res) => res.json())
        .then((data) => {
            displayItem(data);
        });
};

const displayItem = (items) => {
                                                        console.log(items);
    const itemContainer = document.getElementById("item-cont")
    
    let allItems = Object.values(items);
    allItems.forEach(item => {
                                                        console.log(item);
        
        item.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("card");
            
                                                        console.log(element);

            div.innerHTML = `
            <img class="card-img" src=${element.strDrinkThumb} alt=""/>
            <h4>Name: ${element.strDrink}</h4>
            <h6>Category: ${element.strCategory}</h6>
            <p>Instructions: ${element.strInstructions.slice(0,15)}...</p>

            <div>
                <button onclick="handleAddToCart('${element.idDrink}', '${element?.strDrink}')">Add to cart</button>
                <button>Details</button>
            </div>
            `;
            itemContainer.appendChild(div);
        });
    });
}


const handleAddToCart = (id,name) =>{
    console.log(id,name);
    const container = document.getElementById("cart-items");

    const div = document.createElement("div");
    div.classList.add("orders")
    div.innerHTML = `     
        <h5>1.</h5>
        <img src="" alt="">
        <h5>${id}</h5>
        <h5>${name}</h5>
    `;
    container.appendChild(div)
};

loadItems()