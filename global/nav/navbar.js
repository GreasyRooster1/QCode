const navbar = document.querySelector(".navbar");
const navbarVisibilityButton = document.querySelector(".navbar-visibility-button");
const userLink = document.querySelector(".username-link");
const accountOptions = document.querySelector(".account-options");
const accountOptionsWrapper = document.querySelector(".account-dropdown-wrapper");
const logoutButton = document.querySelector(".logout-button");

let navbarVisible = true;
let accountOptionsVisible = false;

function initNavbar(){
    userLink.innerHTML = getStoredUser().email;
}

navbarVisibilityButton.addEventListener("click",function (){
    navbarVisible = !navbarVisible;
    if(navbarVisible){
        navbar.style.height = "5vh";
        setTimeout(function () {
            accountOptionsWrapper.style.display = "block";
        },500);
        navbarVisibilityButton.style.transform = "scaleY(1) translateY(0px)";
    }else{
        navbar.style.height = "0";
        navbarVisibilityButton.style.transform = "scaleY(-1) translateY(5px)";
        accountOptions.style.height = "0";
        accountOptionsVisible=false;
        accountOptionsWrapper.style.display = "none";
    }
});

userLink.addEventListener("click", function (e){
    if(userLink.innerHTML==="Login"){
        if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
            window.location.replace("login/login.html");
        }else {
            window.location.href = "../login/login.html";
        }
        return;
    }

    accountOptionsVisible = !accountOptionsVisible;
    if(accountOptionsVisible) {
        accountOptions.style.height = "20px";
        userLink.style.borderRadius = "0";
    }else{
        accountOptions.style.height = "0";
        userLink.style.borderRadius = "10px";
    }
});

logoutButton.addEventListener("click", function (e){
    logOutUserDefault();
    clearStoredUser();
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html");
    }else {
        window.location.href = "../login/login.html";
    }
})


initNavbar();