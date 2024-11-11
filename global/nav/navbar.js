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
    initAdmin();
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

function initAdmin(){
    if(getStoredUserPermissions().hasAdminConsoleAccess){
        return;
    }
    let option = document.createElement("div")
    option.classList.add("option");
    option.classList.add("admin-option");
    option.innerHTML = "Admin Console";
    accountOptions.appendChild(option);

    option.addEventListener("click",function () {
        window.location.replace("admin/adminConsole.html");
    });
}

navbarVisibilityButton.addEventListener("click",function (){
    innerContent = document.querySelectorAll(".navbar *");
    navbarVisible = !navbarVisible;
    if(navbarVisible){
        navWrapper.style.height = "var(--navbar-height)";
        setTimeout(function () {
            setVisibilityForInner("visible")
        },500);
        navbarVisibilityButton.style.transform = "scaleY(1) translateY(0px)";
    }else{
        navWrapper.style.height = "0";
        navbarVisibilityButton.style.transform = "scaleY(-1) translateY(5px)";
        accountDropdownActive=false;
        setVisibilityForInner("hidden")
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

    accountDropdownActive = !accountDropdownActive;
    if(accountDropdownActive) {
        accountOptions.style.height = "42px";
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

homeButton.addEventListener("click",function () {
   window.location.href = "../";
});

function setVisibilityForInner(vis){
    innerContent.forEach((item) => {
        item.style.visibility = vis;
    })
}

initNavbar();