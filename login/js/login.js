const loginButton = document.querySelector(".login-button");
const createButton = document.querySelector(".create-button");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

let retUrl;

loginButton.addEventListener("click", function(){
    let email = emailInput.value;
    let password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("logged in user");
            storeUser(userCredential.user);
            window.location.replace("../");
        })
        .catch((error) => {
            let errorType = handleAuthErrors(error);
            switch (errorType){
                case "invalid credentials": showAuthError("Email or password is incorrect"); return;
                case "invalid email": showAuthError("Incorrect email format");return;
                case "ok": break;
            }
        });
});

createButton.addEventListener("click", function(){
    let email = emailInput.value;
    let password = passwordInput.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("created user");
            storeUser(userCredential.user);
            createUserData(userCredential.user);
        })
        .catch((error) => {
            console.log(error.code);
        });
})

function showAuthError(msg){
    authErrorDisplayWrapper.style.visibility = "true"
    authErrorContent.innerHTML = msg;
}

function initReturnAddress(){
    retUrl = new URLSearchParams(window.location.search).get('retURL');
    console.log(retUrl);
}

function createUserData(user) {
    database.ref('userdata/' + user.uid).set({
        badges:{
            0:{id:"user"}
        }
    });
}

initReturnAddress();