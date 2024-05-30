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
        },300);
        navbarVisibilityButton.style.transform = "scaleY(1) translateY(0px)";
    }else{
        navbar.style.height = "0";
        navbarVisibilityButton.style.transform = "scaleY(-1) translateY(5px)";
        setTimeout(function () {
            accountOptionsWrapper.style.display = "none";
        },300);
    }
});

userLink.addEventListener("click", function (e){
    if(userLink.innerHTML==="Login"){
        window.location.href = '../';
        return;
    }

    accountOptionsVisible = !accountOptionsVisible;
    if(accountOptionsVisible) {
        accountOptions.style.height = "200%";
    }else{
        accountOptions.style.height = "0";
    }
});

logoutButton.addEventListener("click", function (e){
    logOutUserDefault();
})


initNavbar();