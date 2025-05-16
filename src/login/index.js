import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../api/firebase";
import {extractEmailFromUsername, handleAuthErrors, storeUser} from "../api/auth";
import {get, ref, set,update} from "firebase/database";


const loginButton = document.querySelector(".login-button");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

let returnURL = "./index.html";

loginButton.addEventListener("click", function(){
    let username = usernameInput.value;
    let password = passwordInput.value;
    let email = extractEmailFromUsername(username)

    signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            debugger
            console.log("logged in user");
            storeUser(userCredential.user, () => {
                get(ref(db,"userdata/"+userCredential.user.uid)).then((snap)=>{
                    if(!snap.exists()){
                        createUser(userCredential.user.uid,username)
                    }
                    window.location.href = returnURL;
                })
            });
        })
        .catch((error) => {
            displayAuthErrors(handleAuthErrors(error));
        });
});

function displayAuthErrors(errorType){
    switch (errorType){
        case "invalid-credentials": showAuthError("Username or password is incorrect"); return;
        case "auth/invalid-email": showAuthError("That username is not valid");return;
        case "auth/email-already-in-use": showAuthError("That account already exists!");return;
        case "auth/network-request-failed": showAuthError("Bad network!");return;
    }
    showAuthError(errorType);
}
function showAuthError(msg){
    authErrorDisplayWrapper.style.display = "block"
    authErrorContent.innerHTML = msg;
}

function getReturnURL(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("retUrl")) {
        returnURL = atob(searchParams.get("retUrl"));
    }
}

function createUser(uid,username){
    for(let dataPoint of requiredUserData) {
        update(ref(db,"userdata/" + uid+"/"+dataPoint.name),dataPoint.val);
    }
    set(ref(db,"userdata/" + uid+"/username"),username);
}

getReturnURL();