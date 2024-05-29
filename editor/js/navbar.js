const navbar = document.querySelector(".navbar");
const navbarShrinkButton = document.querySelector(".navbar-shrink-button");

navbarShrinkButton.addEventListener("click",function (){
    navbar.style.height = "0";
});