import {ref,get} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";

function loadUserData(){
    loadUsername()
    loadProfileIcon()
}

function loadUsername(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/username")).then((snap)=>{
        document.querySelector(".profile-username").innerHTML = snap.val();
    })
}

function loadProfileIcon(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/profileIcon")).then((snap)=>{
        document.querySelector(".profile-icon-img").setAttribute("src",snap.val());
    })
}

export {loadUserData}