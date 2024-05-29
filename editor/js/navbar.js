const navbar = document.querySelector(".navbar");
const navbarVisibilityButton = document.querySelector(".navbar-visibility-button");
const userLink = document.querySelector(".username-link");

let navbarVisible = true;

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

function initNavbar(){
   userLink.innerHTML = getStoredUser().email;
}

initNavbar();