const loginButton = document.querySelector(".login-button");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

loginButton.addEventListener("click", function(){
    let email = emailInput.value;
    let password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("logged in user");
            currentUser =  userCredential.user;
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
            if(error.message==="INVALID_LOGIN_CREDENTIALS"){
                console.log("login info incorrect");
            }
        });

});