const loginButton = document.querySelector(".login-button");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

const requiredUserData = [
    {name:"projects",val:{}},
    {name:"badges",val:{0:{id:"user"}}},
    {name:"points",val:0},
    {name:"spentPoints",val:0},
    {name:"profileIcon",val:"https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/user.png?raw=true"},
]

let returnURL = "../";

loginButton.addEventListener("click", function(){
    let username = usernameInput.value;
    let password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(extractEmailFromUsername(username), password)
        .then((userCredential) => {
            console.log("logged in user");
            storeUser(userCredential.user);

            database.ref("userdata/"+userCredential.user.uid).once("value").then((snap)=>{
                if(!snap.exists()){
                    createUser(userCredential.user.uid,username)
                }
                window.location.href = "../";
            })
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
        database.ref("userdata/" + uid+"/"+dataPoint.name).set(dataPoint.val);
    }
    database.ref("userdata/" + uid+"/username").set(username);
}

getReturnURL();