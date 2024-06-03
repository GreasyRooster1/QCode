const loginButton = document.querySelector(".login-button");
const createButton = document.querySelector(".create-button");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

loginButton.addEventListener("click", function(){
    let username = usernameInput.value;
    let password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(extractEmailFromUsername(username), password)
        .then((userCredential) => {
            console.log("logged in user");
            storeUser(userCredential.user);
            window.location.replace("../");
        })
        .catch((error) => {
            displayAuthErrors(handleAuthErrors(error));
        });
});

createButton.addEventListener("click", function(){
    let username = usernameInput.value;
    let password = passwordInput.value;
    firebase.auth().createUserWithEmailAndPassword(extractEmailFromUsername(username), password)
        .then((userCredential) => {
            console.log("created user");
            storeUser(userCredential.user);
            createUserData(userCredential.user);
        })
        .catch((error) => {
            displayAuthErrors(handleAuthErrors(error));
        });
})

function showAuthError(msg){
    authErrorDisplayWrapper.style.visibility = "true"
    authErrorContent.innerHTML = msg;
}

function createUserData(user) {
    database.ref('userdata/' + user.uid).set({
        badges:{
            0:{id:"user"}
        },
        projects:{},
        username:usernameInput.value,
    });
}