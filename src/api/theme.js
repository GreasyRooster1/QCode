import {onValue, ref, set} from "firebase/database";
import {getStoredUser} from "./auth";
import {db} from "./firebase";


function loadTheme(){
    onValue(ref(db,"userdata/"+getStoredUser().uid+"/theme"),(snap)=>{
        if(!snap.exists()){
            set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),"default");
            return
        }
        let themeId = snap.val();
        get(ref(db,"themes/"+themeId)).then()
        setPageTheme(theme)
    })
}

function setPageTheme(theme){
    let styleEl = document.createElement("link");
    styleEl.rel = "stylesheet";
    styleEl.href =
    document.head.appendChild(document.createElement('style'));
}

function getThemeAddress(theme){
    if(theme.external){
        return name
    }
}

export {loadTheme}