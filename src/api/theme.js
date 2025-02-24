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
            removeTheme()
            return;
        }
        console.log(snap.val(),"themes/"+themeId);
        get(ref(db,"themes/"+themeId)).then((snap)=>{
            console.log(snap.val())
            setPageTheme(snap.val())
        })
    })
}

function setPageTheme(theme){
    removeTheme()
    let styleEl = document.createElement("link");
    styleEl.setAttribute("rel","stylesheet");
    styleEl.setAttribute("href", theme.address);
    styleEl.classList.add("theme-style-el");
    document.head.appendChild(styleEl);
}

function removeTheme(){
    document.querySelector(".theme-style-el")?.remove();
}

export {loadTheme}