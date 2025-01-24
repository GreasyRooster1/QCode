import {getStoredUser} from "../api/auth";
import {db} from "../api/firebase";
import {get, ref} from "firebase/database";

function lockToAdminAuth() {
    if (getStoredUser() === null) {
        redirect()
    } else {
        get(ref(db,"userpermissions/" + getStoredUser().uid)).then((snapshot) => {
            let data = snapshot.val();
            if (data === null) {
                redirect();
            }
            if (data.hasAdminConsoleAccess) {
                console.log("authorized");
            } else {
                redirect();
            }
        });
    }
}

function redirect(){
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html?retUrl="+btoa(window.location.href));
    }else {
        window.location.href = "../login/login.html?retUrl="+btoa(window.location.href);
    }
}


export {lockToAdminAuth}