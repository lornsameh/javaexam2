let NavHumbergerButton = document.querySelector('.humberger-icon');
let NavHumberger = document.querySelector('.humberger-icon i');
let Navbar = document.querySelector('nav');
let NavButton = document.querySelectorAll('.links button');
let HomeButton = document.querySelector('.home');
let Display = document.querySelector('.Display .container .row');
let SearchButton = document.querySelector('.search');
let loader = document.querySelector(".container .loader");
let MainLoader = document.querySelector(".main-loader");
let Categories = document.querySelector('.categories');
let Area = document.querySelector('.area');
let Ingredients = document.querySelector('.ingredients');
let ContactUsButton = document.querySelector('.contact-us');



// ----- Navbar Section -----
let openNavbar=0;
function DynamicNavbar(){
    openNavbar=!openNavbar;
    if(openNavbar){
        NavHumberger.classList.replace('fa-align-justify','fa-xmark');
        Navbar.classList.toggle('nav-move');
        NavHumbergerButton.classList.add('active');
        for(let i=0;i<NavButton.length;i+=2){
            NavButton[i].classList.remove('left');
        };
        for(let i=1;i<NavButton.length;i+=2){
            NavButton[i].classList.remove('right');
        };
    }
    else{
        NavHumberger.classList.replace('fa-xmark','fa-align-justify');
        Navbar.classList.toggle('nav-move');
        NavHumbergerButton.classList.remove('active');
        for(let i=0;i<NavButton.length;i+=2){
            NavButton[i].classList.add('left');
        };
        for(let i=1;i<NavButton.length;i+=2){
            NavButton[i].classList.add('right');
        };
    }
}

NavHumbergerButton.addEventListener('click' , DynamicNavbar)
// ----- End -----




// ----- Home -----
let meal = '';
async function getmeals(){
    loader.style.display = "block";
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let response = await meals.json();
    currentmeal = response;
    Displaymeals();

    MainLoader.classList.add('hide');
    setTimeout(() => {
        MainLoader.style.display = 'none';
    },1000);

    loader.style.display = "none";
};
getmeals(meal);

HomeButton.addEventListener('click',function(){
    DynamicNavbar();
    Display.innerHTML='';
    getmeals(meal);
});

function Displaymeals(){
    cartona = ``;

    for(let i=0 ; i<20 ; i++){
        cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                    <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                        <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMealThumb}">
                        <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                            <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    };
    
    Display.innerHTML=cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
};
// ----- End -----


// ----- Search -----
async function DisplayResultName(meal){
    let cartona = ``;
    loader.style.display = "block";
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    let response = await meals.json();
    currentmeal = response;

    
    if(currentmeal.meals){
        let count = Math.min(currentmeal.meals.length, 20);
        for(let i=0 ; i<count ; i++){
            cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                            <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMeal}">
                            <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        };
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }
    

    loader.style.display = "none";
    SearchResult.innerHTML = cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
};

async function DisplayResultLetter(meal){
    let cartona = ``;
    loader.style.display = "block";
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`);
    let response = await meals.json();
    currentmeal = response;

    
    if(currentmeal.meals){
        let count = Math.min(currentmeal.meals.length, 20);
        for(let i=0 ; i<count ; i++){
            cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                            <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMeal}">
                            <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        };
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }
    

    loader.style.display = "none";
    SearchResult.innerHTML = cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
};

SearchButton.addEventListener('click',function(){
    DynamicNavbar();

    Display.innerHTML=`<div class="col-md-6 mt-5">
                    <input type="text" class="form-control " id="SearchName" placeholder="Search By Name...">
                </div>

                <div class="col-md-6 mt-5">
                    <input type="text" maxlength="1" class="form-control" id="SearchLetter" placeholder="Search By First Letter...">
                </div>  
                
                <div class="row Result"></div>`;

     SearchName = document.querySelector('#SearchName');
     SearchLetter = document.querySelector('#SearchLetter');
     SearchResult = document.querySelector('.Result')

    SearchName.addEventListener('input',function(){
        let SearchByName = SearchName.value;
        SearchResult.innerHTML=`<span class="loader"></span>`;
        if (!SearchByName==""){
        DisplayResultName(SearchByName);
        }
        else{
            SearchResult.innerHTML="";
        }
    });

    SearchLetter.addEventListener('input',function(){
        let SearchByLetter = SearchLetter.value;
        SearchResult.innerHTML=`<span class="loader"></span>`;
        if (!SearchByLetter==""){
            DisplayResultLetter(SearchByLetter);
        }
        else{
            SearchResult.innerHTML="";
        }
        
    });

});
// ----- End -----


// ----- Show Details -----
async function DisplayMealDetails(m){
    let cartona=``;
    loader.style.display = "block";
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m}`);
    let response = await meal.json();
    currentmeal = response;

    
    let ingredients = '';
            for (let i = 1; i <12; i++) {
                let ingredient = currentmeal.meals[0][`strIngredient${i}`];
                ingredients += `<p class="col-2 border-1 text-black p-1">${ingredient}</p>`;
            }

    if(currentmeal.meals){
            cartona = `
                <div class="d-flex justify-content-center align-items-center vh-100">
                    <div class="row w-100 g-3">
                        <div class="col-md-4 text-center">
                            <img class="w-100 rounded-2" src="${currentmeal.meals[0].strMealThumb}" alt="">
                            <p class="text-black fw-bold mt-3 fs-1">${currentmeal.meals[0].strMeal}</p>
                        </div>
                        <div class="col-md-8">
                            <h3 class="text-black fw-bold">Instructions</h3>
                            <p class="text-black mb-3">${currentmeal.meals[0].strInstructions}</p>
                            <h3 class="text-black fw-bold mb-3">Area : <span class="fs-6">${currentmeal.meals[0].strArea}</span></h3>
                            <h3 class="text-black fw-bold mb-3">Category : <span class="fs-6">${currentmeal.meals[0].strCategory}</span></h3>
                            <h3 class="text-black fw-bold">Recipes : </h3>
                            <div class="row p-3">
                                ${ingredients}
                            </div>
                            <h3 class="text-black fw-bold">Tags : </h3>
                            <a class="btn btn-success text-white" href="${currentmeal.meals[0].strSource}">Source</a>
                            <a class="btn btn-danger text-white" href="${currentmeal.meals[0].strYoutube}">Youtube</a>
                        </div>
                    </div>
                </div>`;
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;
}
// ----- End -----


// ----- Show Categories -----
async function ShowCategories() {
    let cartona=``;
    loader.style.display = "block";
    let category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await category.json();
    currentcategory = response;

    for(let i=0 ; i<currentcategory.categories.length ; i++){
        cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal bg-white rounded-2 position-relative overflow-hidden bg-transparent"  data-name="${currentcategory.categories[i].strCategory}">
                            <img class="w-100" src="${currentcategory.categories[i].strCategoryThumb}" alt="${currentcategory.categories[i].strCategoryThumb}">
                            <div class="meal-name text-center row text-center position-absolute top-0 bottom-0 end-0 start-0 w-100  d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentcategory.categories[i].strCategory}</h3>
                                <p class="text-black">${currentcategory.categories[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                            </div>
                        </div>
                    </div>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let categoryDivs = document.querySelectorAll('.meal[data-name]');

    categoryDivs.forEach(div => {
        div.addEventListener('click', function() {
            let selectedCategory = this.dataset.name;
            DisplayMealsByCategory(selectedCategory);
        });
    });

};

Categories.addEventListener('click',function(){
    DynamicNavbar();
    ShowCategories();
});

async function DisplayMealsByCategory(c){
    let cartona=``;
    loader.style.display = "block";
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`);
    let response = await meal.json();
    currentmeal = response;

    if(currentmeal.meals){
        let count = Math.min(currentmeal.meals.length, 20);
        for(let i=0 ; i<count ; i++){
            cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                            <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMeal}">
                            <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        };
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
}
// ----- End -----



// ----- Shaow Area -----
async function ShowArea() {
    let cartona=``;
    loader.style.display = "block";
    let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await area.json();
    currentarea = response;

    for(let i=0 ; i<currentarea.meals.length ; i++){
        cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal bg-white rounded-2 position-relative overflow-hidden bg-transparent text-center"  data-name="${currentarea.meals[i].strArea}">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <div class="mt-2 text-center text-black">
                                <h3 class="text-black">${currentarea.meals[i].strArea}</h3>
                            </div>
                        </div>
                    </div>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let areaDivs = document.querySelectorAll('.meal[data-name]');

    areaDivs.forEach(div => {
        div.addEventListener('click', function() {
            let selectedCategory = this.dataset.name;
            DisplayMealsByArea(selectedCategory);
        });
    });

};

Area.addEventListener('click',function(){
    DynamicNavbar();
    ShowArea();
});

async function DisplayMealsByArea(a){
    let cartona=``;
    loader.style.display = "block";
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`);
    let response = await meal.json();
    currentmeal = response;

    if(currentmeal.meals){
        let count = Math.min(currentmeal.meals.length, 20);
        for(let i=0 ; i<count ; i++){
            cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                            <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMeal}">
                            <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        };
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
}
// ----- End -----



// ----- Shaow Ingredients -----
async function ShowIngredients() {
    let cartona=``;
    loader.style.display = "block";
    let Ingredient = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await Ingredient.json();
    currentIngredient = response;

    for(let i=0 ; i<20 ; i++){
        cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal bg-white rounded-2 position-relative overflow-hidden bg-transparent text-center"  data-name="${currentIngredient.meals[i].strIngredient}">
                            <img class="w-100" src="${currentIngredient.meals[i].strThumb}" alt="${currentIngredient.meals[i].strThumb}">
                            <div class="mt-2 text-center text-black">
                                <h3 class="text-black">${currentIngredient.meals[i].strIngredient}</h3>
                                <p class="text-black">${currentIngredient.meals[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
                            </div>
                        </div>
                    </div>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let IngredientDivs = document.querySelectorAll('.meal[data-name]');

    IngredientDivs.forEach(div => {
        div.addEventListener('click', function() {
            let selectedIngredient = this.dataset.name;
            DisplayMealsByIngredient(selectedIngredient);
        });
    });

};

Ingredients.addEventListener('click',function(){
    DynamicNavbar();
    ShowIngredients();
});

async function DisplayMealsByIngredient(i){
    let cartona=``;
    loader.style.display = "block";
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`);
    let response = await meal.json();
    currentmeal = response;

    if(currentmeal.meals){
        let count = Math.min(currentmeal.meals.length, 20);
        for(let i=0 ; i<count ; i++){
            cartona+=`<div class="col-lg-3 col-md-4 col-sm-6 col-12 p-3">
                        <div class="meal shadow bg-white rounded-2 position-relative overflow-hidden" data-id="${currentmeal.meals[i].idMeal}">
                            <img class="w-100" src="${currentmeal.meals[i].strMealThumb}" alt="${currentmeal.meals[i].strMeal}">
                            <div class="meal-name text-center position-absolute top-0 bottom-0 end-0 start-0 w-100 d-flex justify-content-center align-items-center rounded-2">
                                <h3 class="text-black">${currentmeal.meals[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
        };
    } else {
        cartona = `<h3 class="text-center text-black mt-5">No results found</h3>`;
    }

    loader.style.display = "none";
    Display.innerHTML = cartona;

    let details  = document.querySelectorAll('.meal[data-id]');

    details .forEach(div => {
        div.addEventListener('click', function() {
            let selectedmeal = this.dataset.id;
            DisplayMealDetails(selectedmeal);
        });
    });
}
// ----- End -----







// ----- Contact us -----
ContactUsButton.addEventListener('click',function(){
    DynamicNavbar();
    Display.innerHTML = `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="col-lg-8 col-md-10 col-12">
                <div class="row g-3">

                <div class="col-md-6">
                    <input type="text" class="form-control" id="Name" placeholder="Enter Your Name">
                    <small class="text-danger d-none" id="NameError">Name must be at least 3 letters</small>
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control" id="Email" placeholder="Enter Your Email">
                    <small class="text-danger d-none" id="EmailError">Enter a valid email</small>
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control" id="Phone" placeholder="Enter Your Phone">
                    <small class="text-danger d-none" id="PhoneError">Enter a valid phone number</small>
                </div>

                <div class="col-md-6">
                    <input type="text" class="form-control" id="Age" placeholder="Enter Your Age">
                    <small class="text-danger d-none" id="AgeError">Age must be between 10 and 90</small>
                </div>

                <div class="col-md-6">
                    <input type="password" class="form-control" id="Password" placeholder="Enter Your Password">
                    <small class="text-danger d-none" id="PasswordError">Password must be 6+ chars with letters & numbers</small>
                </div>

                <div class="col-md-6">
                    <input type="password" class="form-control" id="Repassword" placeholder="Enter Your Repassword">
                    <small class="text-danger d-none" id="RepasswordError">Passwords do not match</small>
                </div>

                <div class="col-12 d-flex justify-content-center mt-3">
                    <button id="sendBtn" class="btn btn-primary col-md-2" disabled>Send Message</button>
                </div>

                </div>
            </div>
        </div>`;


    startValidation();
});

function startValidation() {
    let Name = document.getElementById("Name");
    let Email = document.getElementById("Email");
    let Phone = document.getElementById("Phone");
    let Age = document.getElementById("Age");
    let Password = document.getElementById("Password");
    let Repassword = document.getElementById("Repassword");

    let sendBtn = document.getElementById("sendBtn");

    let NameError = document.getElementById("NameError");
    let EmailError = document.getElementById("EmailError");
    let PhoneError = document.getElementById("PhoneError");
    let AgeError = document.getElementById("AgeError");
    let PasswordError = document.getElementById("PasswordError");
    let RepasswordError = document.getElementById("RepasswordError");

    function checkAllValid() {
        let allValid = 
            /^[A-Za-z ]{3,}$/.test(Name.value.trim()) &&
            /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(Email.value.trim()) &&
            /^[0-9]{10,12}$/.test(Phone.value.trim()) &&
            (Age.value >= 10 && Age.value <= 90) &&
            /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(Password.value) &&
            (Repassword.value === Password.value && Repassword.value !== "");
        
        sendBtn.disabled = !allValid;
    }

    Name.addEventListener("input", function() {
        NameError.classList.toggle("d-none", /^[A-Za-z ]{3,}$/.test(Name.value.trim()));
        Name.classList.toggle("is-valid", /^[A-Za-z ]{3,}$/.test(Name.value.trim()));
        Name.classList.toggle("is-invalid", !/^[A-Za-z ]{3,}$/.test(Name.value.trim()) && Name.value !== "");
        checkAllValid();
    });

    Email.addEventListener("input", function() {
        EmailError.classList.toggle("d-none", /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(Email.value.trim()));
        Email.classList.toggle("is-valid", /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(Email.value.trim()));
        Email.classList.toggle("is-invalid", !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(Email.value.trim()) && Email.value !== "");
        checkAllValid();
    });

    Phone.addEventListener("input", function() {
        PhoneError.classList.toggle("d-none", /^[0-9]{10,12}$/.test(Phone.value.trim()));
        Phone.classList.toggle("is-valid", /^[0-9]{10,12}$/.test(Phone.value.trim()));
        Phone.classList.toggle("is-invalid", !/^[0-9]{10,12}$/.test(Phone.value.trim()) && Phone.value !== "");
        checkAllValid();
    });

    Age.addEventListener("input", function() {
        AgeError.classList.toggle("d-none", Age.value >= 10 && Age.value <= 90);
        Age.classList.toggle("is-valid", Age.value >= 10 && Age.value <= 90);
        Age.classList.toggle("is-invalid", !(Age.value >= 10 && Age.value <= 90) && Age.value !== "");
        checkAllValid();
    });

    Password.addEventListener("input", function() {
        let passValid = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(Password.value);
        PasswordError.classList.toggle("d-none", passValid);
        Password.classList.toggle("is-valid", passValid);
        Password.classList.toggle("is-invalid", !passValid && Password.value !== "");

        if (Repassword.value !== "") {
            let repassValid = Repassword.value === Password.value;
            RepasswordError.classList.toggle("d-none", repassValid);
            Repassword.classList.toggle("is-valid", repassValid);
            Repassword.classList.toggle("is-invalid", !repassValid);
        }

        checkAllValid();
    });

    Repassword.addEventListener("input", function() {
        let repassValid = Repassword.value === Password.value && Repassword.value !== "";
        RepasswordError.classList.toggle("d-none", repassValid);
        Repassword.classList.toggle("is-valid", repassValid);
        Repassword.classList.toggle("is-invalid", !repassValid && Repassword.value !== "");
        checkAllValid();
    });

    sendBtn.addEventListener("click", function () {
        Name.value = "";
        Email.value = "";
        Phone.value = "";
        Age.value = "";
        Password.value = "";
        Repassword.value = "";

        NameError.classList.add("d-none");
        EmailError.classList.add("d-none");
        PhoneError.classList.add("d-none");
        AgeError.classList.add("d-none");
        PasswordError.classList.add("d-none");
        RepasswordError.classList.add("d-none");

        Name.classList.remove("is-valid","is-invalid");
        Email.classList.remove("is-valid","is-invalid");
        Phone.classList.remove("is-valid","is-invalid");
        Age.classList.remove("is-valid","is-invalid");
        Password.classList.remove("is-valid","is-invalid");
        Repassword.classList.remove("is-valid","is-invalid");

        sendBtn.disabled = true;
    });
}
// ----- End -----

