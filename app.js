const wrapper = document.querySelector(".wrapper");
const loading = document.querySelector(".lds-ellipsis");
let offset = 1
let perPageCount = 4

const API_URL = "http://dummyjson.com";


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Category Function.


async function  categoryData(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            // Kategoriyalarni saqlash
            localStorage.setItem("categories", JSON.stringify(data));
            categoryList(data);
        })
        .catch(err => console.error("Error fetching categories:", err));
}

document.addEventListener("DOMContentLoaded", () => {
    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
        const categories = JSON.parse(savedCategories);
        categoryList(categories);
    } else {
        // API dan yangi ma'lumot olish
        // categoryData(`${API_URL}/products/category-list`);
    }
});

categoryData(`${API_URL}/products/category-list`);

// Categorylarning ruyxati
function categoryList(data){
    console.log(data);
    data.forEach(product => {
        const category = document.createElement("div")
        category.className = "category";
        category.innerHTML = `<button>${product}</button>`  
        
        category.querySelector("button").addEventListener("click", () => {
            showCategoryDetails(product);
        });
        
        wrapper.appendChild(category)
    })    
}

// Kategoriya ma'lumotlarini olish funksiyasi
async function showCategoryDetails(category) {
    
    try {
        const response = await fetch(`${API_URL}/products/category/${category}`);
        
        console.log(response);
        const data = await response.json();
        displayCategoryProducts(data);
         // Ma'lumotlarni ko'rsatish
        
    } catch (err) {
        console.log(err);
    }
}



function displayCategoryProducts(data) {
    
    const productWrapper = document.getElementById("product-wrapper");
    
    if (!productWrapper) {
        console.error("Element with id 'product-wrapper' not found!");
        return; // Element topilmasa, funksiyani to'xtatish
    }
    
    productWrapper.innerHTML = ""; // Avvalgi ma'lumotlarni o'chirish
    
    data.products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
        <img src=${product.images[0]} alt="">
        <h4>Rating: ${product.rating}</h4>
        <strong>Price: ${product.price} USD</strong>
        <br>
        <button>Buy now</button>
        `;
        
        productWrapper.appendChild(productDiv);
    });
    
}

 






































// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Products Function.

async function  fetchData(api) {
    const responce = await fetch(api)
    responce 
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = "none"
        })
}

fetchData(`${API_URL}/products?limit=${perPageCount * offset}`);

function createCard(data){
    
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }

    // data.products.forEach(product => {
    //     const card = document.createElement("div")
    //     card.className = "card";
    //     card.innerHTML = `
    //         <img src=${product.images[0]} alt="">
    //         <h3>${product.title}</h3>
    //         <strong>${product.price}</strong>
    //         <br>
    //         <button>Buy now</button>
    //     `

    //     wrapper.appendChild(card)
    // })    
    window.scrollTo(0, wrapper.scrollHeight);
}


 
