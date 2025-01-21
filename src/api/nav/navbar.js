import {db} from "../firebase";
import {get, getDatabase, ref, set} from "firebase/database";
import {getStoredUser, getStoredUserPermissions, logOutUser} from "../auth";
import {BrandNav} from "../customElements";
import {isValidUrl} from "../util/util";
import {reCalculateUserPoints} from "../util/points";

let navbarVisibilityButton;
let userLink;
let accountOptions;
let innerContent;
let logoutButton;
let changeProfileButton;
let homeButton;
let pointsDisplayNum;

let navDropdownItemCount = 2;

const navWrapper = document.querySelector("brand-nav");

let navbarVisible = true;
let accountDropdownActive = false;

BrandNav.register()

function loadHandles(){
    navbarVisibilityButton = document.querySelector(".navbar-visibility-button");
    userLink = document.querySelector(".username-link");
    accountOptions = document.querySelector(".account-options");
    logoutButton = document.querySelector(".logout-button");
    changeProfileButton = document.querySelector(".change-profile-button");
    homeButton = document.querySelector(".home-link")
    pointsDisplayNum = document.querySelector(".points-display-num");
    innerContent = document.querySelectorAll(".navbar *");
}

function initNavbar(settings){
    loadHandles()
    initUsername();
    initPoints();
    initAdmin();
    addEvents();
    checkSettings(settings);
}
function checkSettings(settings){
    if(settings===undefined){
        return
    }
    if(settings.hideHome){
        removeNavHome()
    }
    if(settings.hideCollapse){
        removeNavArrow()
    }
    if(settings.collapsed){
        navbarVisible= false;
        hideNav()
    }
}

function initPoints(){
    reCalculateUserPoints((points) => {
        pointsDisplayNum.innerText = points;
    });
}

function initUsername(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/username")).then((snapshot) => {
        let username = snapshot.val();
        let formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        userLink.innerHTML = formattedUsername;
    });
}

function initAdmin(){
    if(!getStoredUserPermissions().hasAdminConsoleAccess){
        return;
    }
    navDropdownItemCount++;
    let option = document.createElement("div")
    option.classList.add("option");
    option.classList.add("adminConsole-option");
    option.innerHTML = "Admin Console";
    accountOptions.appendChild(option);

    option.addEventListener("click",function () {
        window.location.href = "./adminConsole.html";
    });
}

function hideNav(){
    navWrapper.style.height = "0";
    navbarVisibilityButton.style.transform = "scaleY(-1) translateY(5px)";
    accountDropdownActive=false;
    setVisibilityForInner("hidden")
}

function showNav(){
    navWrapper.style.height = "var(--navbar-height)";
    setTimeout(function () {
        setVisibilityForInner("visible")
    },500);
    navbarVisibilityButton.style.transform = "scaleY(1) translateY(0px)";
}

function addEvents(){
    navbarVisibilityButton.addEventListener("click",function (){
        navbarVisible = !navbarVisible;
        if(navbarVisible){
            showNav()
        }else{
            hideNav()
        }
    });

    userLink.addEventListener("click", function (e){
        if(userLink.innerHTML==="Login"){
            window.location.href = "./login.html";
            return;
        }

        accountDropdownActive = !accountDropdownActive;
        if(accountDropdownActive) {
            accountOptions.style.height = (navDropdownItemCount*21)+"px";
            userLink.style.borderRadius = "0";
        }else{
            accountOptions.style.height = "0";
            userLink.style.borderRadius = "10px";
        }
    });

    logoutButton.addEventListener("click", function (e){
        logOutUser();
         window.location.href = "./login.html";
    })

    changeProfileButton.addEventListener("click",()=>{
        promptProfileIconChange()
    });

    homeButton.addEventListener("click",function () {
        window.location.href = "index.html";
    });
}


function setVisibilityForInner(vis){
    innerContent.forEach((item) => {
        item.style.visibility = vis;
    })
}

function promptProfileIconChange(){
    let imageLink = prompt("Enter link to image");
    if(isValidUrl(imageLink)){
        set(ref(db,"userdata/"+getStoredUser().uid+"/profileIcon"),imageLink);
    }else{
        console.log("not a url");
    }
}

function removeNavHome(){
    let home = document.querySelector(".home-link");
    home.remove();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

export {initNavbar,promptProfileIconChange}