import {ref,get,set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";

function loadUserData(){
    loadUsername()
    loadProfileIcon()
    loadTheme()
    setupThemeEvent();
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

function loadTheme(){
    get(ref(db,"themes")).then((snap)=> {
        let themes = snap.val();
        console.log(themes);
        for(let [key,value] of Object.entries(themes)){
            let el = document.createElement("option");
            el.innerHTML = value.name;
            el.value = key;
            document.getElementById("themes").appendChild(el);
        }
    }).then(()=>{
        get(ref(db,"userdata/"+getStoredUser().uid+"/theme")).then((snap)=> {
            if(snap.val()==="default"){
                return;
            }
            let drop = document.getElementById("themes");
            drop.value = snap.val();
        });
    })
}

function setupThemeEvent(){
    let drop = document.getElementById("themes");
    drop.onchange = ()=>{
        set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),drop.value)
    }
}

export {loadUserData}