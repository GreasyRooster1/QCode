import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../api/firebase";
import {displayAuthErrors, extractEmailFromUsername, handleAuthErrors, storeUser} from "../api/auth";
import {get, ref, set} from "firebase/database";


const loginButton = document.querySelector(".login-button");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

const requiredUserData = [
    {name:"projects",val:{
        "bouncing-rainbow-squares":{
            name:"Bouncing Rainbow Squares",
            code:"\n\nfunction setup() {\n\n}\n\nfunction draw() {\n\n}\n",
            currentChapter:0,
            currentStep:1,
            lessonId:"bouncing-rainbow-squares",
            timestamp:Date.now()/1000,
        }
    }},
    {name:"badges",val:{0:{id:"user"}}},
    {name:"points",val:0},
    {name:"spentPoints",val:0},
    {name:"profileIcon",val:"https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/user.png?raw=true"},
]

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
                    window.location.href = "../";
                })
            });
        })
        .catch((error) => {
            displayAuthErrors(handleAuthErrors(error));
        });
});

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
        set(ref(db,"userdata/" + uid+"/"+dataPoint.name),dataPoint.val);
    }
    set(ref(db,"userdata/" + uid+"/username"),username);
}


getReturnURL();