import {ref,get,set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {promptProfileIconChange} from "../api/nav/navbar";

function loadUserData(){
    loadUsername()
    loadProfileIcon()
    loadTheme()
    setupThemeEvent();
    setupAdvancedEvent()
    loadAdvanced();
    setupChangeProfileEvent();
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
        get(ref(db,"userdata/"+getStoredUser().uid+"/theme")).then((snap)=> {
            let selectedTheme;
            if(snap.val()==="default"){
                selectedTheme = "default";
            }else {
                selectedTheme = snap.val();
            }
            console.log(snap.val())
            let drop = document.getElementById("themes");
            
            for(let [key,value] of Object.entries(themes)){
                checkAllowedThemes().then(()=>{
                    createThemeEl(key,value.isVisible?value.name:(value.name+" (Hidden)"))
                    if(key===selectedTheme) {
                        drop.value = snap.val();
                    }
                }).catch(()=>{
                    if(!value.isVisible){
                        return
                    }
                    createThemeEl(key,value.name)
                })

            }
        });
    })

}

function createThemeEl(val,name){
    let el = document.createElement("option");
    el.innerHTML = name;
    el.value = val;
    document.getElementById("themes").appendChild(el);
}

function checkAllowedThemes(){
    return new Promise((resolve,reject)=>{
        get(ref(db,"userpermissions/"+getStoredUser().uid+"/hasAdminConsoleAccess")).then((snap)=>{
            if(!snap.exists()){
                reject()
            }
            if(snap.val()){
                resolve()
            }
            reject()
        })
    })
}

function setupThemeEvent(){
    let drop = document.getElementById("themes");
    drop.onchange = ()=>{
        set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),drop.value)
    }
}

function setupAdvancedEvent(){
    document.querySelector(".advanced-dropdown").addEventListener("click", ()=>{
        document.querySelector(".advanced-content").classList.toggle("active");
    })
}

function loadAdvanced(){
    createAdvancedDatapoint("uid",getStoredUser().uid)
    createAdvancedUserdataPoint("points")
    createAdvancedUserdataPoint("spentPoints")
    createAdvancedUserdataPoint("theme")
    createAdvancedUserdataPoint("username")
    createAdvancedUserdataPoint("profileIcon")
    get(ref(db,"userpermissions/"+getStoredUser().uid)).then((snapshot)=>{
        if(!snapshot.exists()){
            return;
        }
        let data = snapshot.val();
        for(let [key,value] of Object.entries(data)){
            createAdvancedDatapoint("perm."+key,value)
        }
    })
}

function createAdvancedUserdataPoint(r){
    get(ref(db,"userdata/"+getStoredUser().uid+"/"+r)).then((snap)=>{
        createAdvancedDatapoint(r,snap.val());
    })
}

function createAdvancedDatapoint(name,value){
    let el = document.createElement("div");
    el.innerHTML = name+" : "+value;
    document.querySelector(".advanced-content").appendChild(el);
}

function setupChangeProfileEvent(){
    document.querySelector(".profile-icon-img").addEventListener("click", ()=>{
        promptProfileIconChange()
    })
}



export {loadUserData}