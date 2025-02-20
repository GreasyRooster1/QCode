import {onValue, ref, set,get} from "firebase/database";
import {getStoredUser} from "./auth";
import {db} from "./firebase";


function loadTheme(){
    onValue(ref(db,"userdata/"+getStoredUser().uid+"/theme"),(snap)=>{
        if(!snap.exists()){
            set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),"default");
            return
        }
        let themeId = snap.val();
        if(themeId==="default"){
            return;
        }
        get(ref(db,"themes/"+themeId)).then((snap)=>{
            console.log(snap.val())
            setPageTheme(snap.val())
        })
    })
}

function setPageTheme(theme){
    debugger;
    document.querySelector(".theme-style-el")?.remove();
    let styleEl = document.createElement("link");
    styleEl.rel = "stylesheet";
    styleEl.href = theme.address
    styleEl.classList.add("theme-style-el");
    document.head.appendChild(document.createElement('style'));
}

export {loadTheme}