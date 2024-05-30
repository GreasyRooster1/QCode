const navbar = document.querySelector(".navbar");
const navbarVisibilityButton = document.querySelector(".navbar-visibility-button");
const userLink = document.querySelector(".username-link");
const accountOptions = document.querySelector(".account-options");

let navbarVisible = true;
let accountOptionsVisible = false;

function initNavbar(){
    userLink.innerHTML = getStoredUser().email;
}

navbarVisibilityButton.addEventListener("click",function (){
    navbarVisible = !navbarVisible;
    if(navbarVisible){
        navbar.style.height = "5vh";
        navbarVisibilityButton.style.transform = "scaleY(1) translateY(0px)";
    }else{
        navbar.style.height = "0";
        navbarVisibilityButton.style.transform = "scaleY(-1) translateY(5px)";
    }
});

userLink.addEventListener("click", function (e){
    e.preventDefault();
    accountOptionsVisible = !accountOptionsVisible;
    if(accountOptionsVisible) {
        accountOptions.style.visibility = "visible";
    }else{
        accountOptions.style.visibility = "hidden";
    }
});



initNavbar();