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

let errorMessagePairs = {
    "auth/invalid-credential": "Incorrect username or password",
    "auth/user-disabled" :"Account disabled! Contact an admin if you think this is a mistake",
    "too-many-requests":"Too many login requests! Please dont spam the button!"
}

loginButton.addEventListener("click", function(){
    let username = usernameInput.value;
    let password = passwordInput.value;
    if(username.length <= 1||password.length <= 1){
        return;
    }
    let email = extractEmailFromUsername(username)
    passwordInput.value = "";

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
            console.log(error.code)
            displayAuthErrors(error);
        });
});

function displayAuthErrors(error){
    if(error.code in errorMessagePairs){
        showAuthError(errorMessagePairs[error.code]);
        return;
    }
    showAuthError(error.message);
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