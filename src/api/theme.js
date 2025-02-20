import {ref} from "firebase/database";
import {getStoredUser} from "./auth";
import {db} from "./firebase";


function loadTheme(){
    get(ref(db,"userdata/"+getStoredUser().uid+"/theme")).on((snap)=>{

    })
}

export {loadTheme}