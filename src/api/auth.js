//https://stackoverflow.com/questions/59935608/solved-get-user-auth-data-from-firebase-add-it-to-firebase-db

import {auth, db} from "./firebase";
import {get, ref} from "firebase/database";
import {assert} from "./util/util";

function createUserDefault(email, password){
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("created user");
            storeUser(userCredential.user);
        })
        .catch((error) => {
            handleAuthErrors(error);
        });
}

function logInUserDefault(email,password){
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("logged in user");
            storeUser(userCredential.user);
        })
        .catch((error) => {
            handleAuthErrors(error);
        });

}

function logOutUser(){
    clearStoredUser()
    auth.signOut().then(() => {
        console.log("logged out user");
        clearStoredUser();
    }).catch((error) => {
        handleAuthErrors(error);
    });
}

function handleAuthErrors(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    console.error("Auth error: ",errorCode,errorMessage);
    if(errorCode==="auth/internal-error"){
        let errorObj = JSON.parse(errorMessage).error;
        if(errorObj.message==="INVALID_LOGIN_CREDENTIALS"){
           return "invalid-credentials";
        }
    }

    return errorCode+", "+errorMessage;
}

function storeUser(user,next){
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser",JSON.stringify(user));
    console.log(user);

    get(ref(db,"userdata/"+user.uid+"/username")).then((snapshot)=> {
        let obj = JSON.parse(JSON.stringify(user));
        obj.username = snapshot.val();
        localStorage.setItem("currentUser",JSON.stringify(obj));
        if(next) {
            next()
        }
    })
}

function storeUserPermissions(perms){
    localStorage.setItem("currentUserPermissions",JSON.stringify(perms));
}

function clearStoredUser(){
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("currentUser",null);
    localStorage.setItem("currentUserPermissions",null);

}

function getStoredUser(){
    let jsonUser = localStorage.getItem("currentUser")
    if(jsonUser!==null){
        return JSON.parse(jsonUser);
    }
    return null;
}
function getStoredUserPermissions(){
    let jsonUserPerms = localStorage.getItem("currentUserPermissions")
    if(jsonUserPerms!==null){
        return JSON.parse(jsonUserPerms);
    }
    return null;
}

function isLoggedIn(){
    return localStorage.getItem("isLoggedIn")==="true";
}

function extractEmailFromUsername(username){
    return username+"@esporterz.com"
}

function extractUsernameFromEmail(email){
    return email.replace("@esporterz.com","");
}

function getCrypt(){
    return new Promise((resolve, reject) => {
        get(ref(db,"crypt")).then((snapshot)=>{
            resolve(snapshot.val());
        })
    })
}

function verifyCryptMetadata(data){
    assert(data.method,"rsa")
}

export {
    extractUsernameFromEmail,
    extractEmailFromUsername,
    isLoggedIn,
    getStoredUserPermissions,
    getStoredUser,
    storeUserPermissions,
    logOutUser,
    storeUser,
    handleAuthErrors
}