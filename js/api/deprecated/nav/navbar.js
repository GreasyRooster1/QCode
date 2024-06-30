const navWrapper = document.querySelector('brand-nav');
const navbar = document.querySelector(".navbar");
const navbarVisibilityButton = document.querySelector(".navbar-visibility-button");
const userLink = document.querySelector(".username-link");
const accountOptions = document.querySelector(".account-options");
let innerContent;
const logoutButton = document.querySelector(".logout-button");
const homeButton = document.querySelector(".home-link")
const pointsDisplayNum = document.querySelector(".points-display-num");

let navbarVisible = true;
let accountDropdownActive = false;

function initNavbar(){
    initUsername();
    initPoints();
}

function initPoints(){
    reCalculateUserPoints((points) => {
        pointsDisplayNum.innerText = points;
    });
}

function initUsername(){
    database.ref("userdata/"+getStoredUser().uid+"/username").once('value').then((snapshot) => {
        let username = snapshot.val();
        let formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        userLink.innerHTML = formattedUsername;
    });
}


logoutButton.addEventListener("click", function (e){
    logOutUserDefault();
    clearStoredUser();
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html");
    }else {
        window.location.href = "login.html";
    }
})

homeButton.addEventListener("click",function () {
   window.location.href = "index.html";
});

function setVisibilityForInner(vis){
    innerContent.forEach((item) => {
        item.style.visibility = vis;
    })
}

initNavbar();