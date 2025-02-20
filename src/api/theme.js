import {ref,set} from "firebase/database";
import {getStoredUser} from "./auth";
import {db} from "./firebase";


function loadTheme(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/theme")).on((snap)=>{
        if(!snap.exists()){
            set(ref(db,"userdata/"+getStoredUser().uid+"/theme"),{
                name:"default",
                external:false,
            });
            return
        }
        let data = snap.val();

    })
}

function setPageTheme(theme){
    let styleEl = document.createElement("link");

    document.head.appendChild(document.createElement('style'));
}

export {loadTheme}