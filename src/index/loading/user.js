import {db} from "../../api/firebase";
import {getStoredUser} from "../../api/auth";
import {promptProfileIconChange} from "../../api/nav/navbar.js"
import {get, ref} from "firebase/database";

const usernameTitle = document.querySelector('.username-title');
const profileDisplayImg = document.querySelector('.user-profile-img');
const pointsDisplayBar = document.querySelector('.user-points-progress-bar');

function loadUserData(){
    loadUsername();
    loadProfileIcon();
    renderPoints();
}

function loadUsername(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/username")).then(function(snapshot){
        usernameTitle.innerHTML = snapshot.val();
    })
}

function loadProfileIcon(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/profileIcon")).then(function(snapshot){
        profileDisplayImg.setAttribute("src", snapshot.val());
    })
}

function renderPoints(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/points")).then((snapshot)=>{
        pointsDisplayBar.setAttribute("value",snapshot.val());
    })

}

function addProfileListener() {
    profileDisplayImg.addEventListener("click", function () {
        promptProfileIconChange();
    });
}

export {loadUserData,addProfileListener};