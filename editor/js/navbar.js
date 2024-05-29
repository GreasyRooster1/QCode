const navbar = document.querySelector(".navbar");
const navbarShrinkButton = document.querySelector(".navbar-shrink-button");
const navbarGrowButton = document.querySelector(".navbar-grow-button");

navbarShrinkButton.addEventListener("click",function (){
    navbar.style.height = "0";
});
navbarGrowButton.addEventListener("click",function (){
    navbar.style.height = "5vh";
});