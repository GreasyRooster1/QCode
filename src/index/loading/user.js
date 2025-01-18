import {database} from "../../api/firebase";
import {getStoredUser} from "../../api/auth";
import {promptProfileIconChange} from "../../api/nav/navbar.js"

const usernameTitle = document.querySelector('.username-title');
const profileDisplayImg = document.querySelector('.user-profile-img');
const pointsDisplayBar = document.querySelector('.user-points-progress-bar');

function loadUserData(){
    loadUsername();
    loadProfileIcon();
    renderPoints();
}

function loadUsername(){
    database.ref("userdata/"+getStoredUser().uid+"/username").once("value").then(function(snapshot){
        usernameTitle.innerHTML = snapshot.val();
    })
}

function loadProfileIcon(){
    database.ref("userdata/"+getStoredUser().uid+"/profileIcon").once("value").then(function(snapshot){
        profileDisplayImg.setAttribute("src", snapshot.val());
    })
}

function renderPoints(){
    database.ref("userdata/"+getStoredUser().uid+"/points").once("value").then((snapshot)=>{
        pointsDisplayBar.setAttribute("value",snapshot.val());
    })

}

function addProfileListener() {
    profileDisplayImg.addEventListener("click", function () {
        promptProfileIconChange();
    });
}

export {loadUserData,addProfileListener};