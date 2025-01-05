
const searchItem = () => {

    document.getElementById('item-cont').innerHTML = "";
    document.getElementById('error-msg').innerHTML = "";

    const searchBox = document.getElementById('search-box');
    const searchName = searchBox.value;
    searchBox.value = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`)
        .then(res => res.json())
        .then(data => {
            if (data.length == null) {
                showError();
            // }
            // else {
            }
            displayItem(data);
        });
}
//------------------------------------------------------------------------------------------

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
            div.classList.add('col');
            div.innerHTML = `
        <div class="card rounded-3 w-75 h-100 ms-5">
            <img src="${element.strDrinkThumb}" class="card-img-top img-fluid mx-auto" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">Name: ${element.strDrink}</h5>
                <h6>Category: ${element.strCategory}</h6>
                <p>Instructions: ${element.strInstructions.slice(0, 15)}...</p>
                <p class="card-text"></p>
                <br>
                <button onclick="handleAddToCart('${element.idDrink}', '${element?.strDrink}')">Add to cart</button>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleItem('${element.idDrink}')">Details</button>
            </div>
        </div>
            `;
            itemContainer.appendChild(div);
        });
    });
};
//-------------------------------------------------------------------------------------
let drinkCount = 1;
const handleAddToCart = (id, name) => {
    if (drinkCount > 7) {
        alert("You can't add more than 7 drinks to the cart.");
        return; 
    }
    console.log(id, name);
    const container = document.getElementById("cart-items");

    const div = document.createElement("div");
    div.classList.add("orders")
    div.innerHTML = `
        <h5>${drinkCount}.</h5>
        <h5>${name}</h5>
    `;
    container.appendChild(div);
    drinkCount++;
};

//------------------------------------------------------------------------------------------

const getSingleItem = (id) => {
    console.log(id);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((json) => showDetail(json));
};

const showDetail = (item) => {
    // console.log(item);
    const itemDetail = document.getElementById("modal-body");

    let showItem = Object.values(item);
    showItem.forEach(element => {
        console.log(element);
        element.forEach(e => {
            console.log(e);

            itemDetail.innerHTML = `
            <img class="card-img" src=${e.strDrinkThumb} alt=""/>
            <h4>Id: ${e.idDrink}</h4>
            <h3>Name: ${e.strDrink}</h3>
            <h6>Alcoholic: ${e.strAlcoholic}</h6>
            <h6>Category: ${e.strCategory}</h6>
            <p>Instructions: ${e.strInstructions}</p>
            `;

        });
    });
};
// -----------------error handle----------------
const showError = () => {
    document.getElementById('error-msg').innerHTML = `
    <p class="card w-25 border border-warning text-center shadow-lg p-1 bg-body rounded">No item found</p>
    `;
}

loadItems()