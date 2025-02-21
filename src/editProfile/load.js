import {ref,get} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";

function loadUserData(){
    loadUsername()
}

function loadUsername(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/username")).then((snap)=>{
        document.querySelector(".profile-username").innerHTML = snap.val();
    })
}

export {loadUserData}