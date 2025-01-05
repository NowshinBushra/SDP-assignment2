
const searchItem = () => {
    
    document.getElementById('item-cont').innerHTML = "";
    // document.getElementById('error-msg').innerHTML = "";

    const searchBox = document.getElementById('search-box');
    const searchName = searchBox.value;
    searchBox.value = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`)
    .then(res => res.json())
    .then(data => {
        if (data.length == 0){
            showError();
        }
    else{
        showSearchResult(data);
    }
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
            // div.classList.add("card");

            console.log(element);

            div.innerHTML = `
            <img class="card-img" src=${element.strDrinkThumb} alt=""/>
            <h4>Name: ${element.strDrink}</h4>
            <h6>Category: ${element.strCategory}</h6>
            <p>Instructions: ${element.strInstructions.slice(0, 15)}...</p>

            <div>
                <button onclick="handleAddToCart('${element.idDrink}', '${element?.strDrink}')">Add to cart</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleItem('${element.idDrink}')">Details</button>
            </div>
            `;
            itemContainer.appendChild(div);
        });
    });
};
//--------------------------------------------------------------------------------
const showSearchResult = items => {
    const searchResult = document.getElementById('item-cont');
    let allItems = Object.values(items);
    allItems.forEach(item => {
        console.log(item);

        item.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card rounded-3 w-75 h-100 ms-5">
            <img src="${element.strDrinkThumb}" class="card-img-top w-50 mx-auto mt-2" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${element.strDrink}</h5>
                <h6>${element.strCategory}</h6>
                <p>Instructions: ${element.strInstructions.slice(0, 15)}...</p>
                <p class="card-text"></p>
            </div>
            <div>
                <button onclick="handleAddToCart('${element.idDrink}', '${element?.strDrink}')">Add to cart</button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleItem('${element.idDrink}')">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    });
    
}

//-------------------------------------------------------------------------------------
const handleAddToCart = (id, name) => {
    console.log(id, name);
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

loadItems()