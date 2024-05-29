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
            if(error.code==="auth/internal-error"){
                let errorObj = JSON.parse(error.message).error;
                if(errorObj.message==="INVALID_LOGIN_CREDENTIALS"){
                    console.log("credentials invalid");
                }
            }
            if(error.code==="auth/invalid-email"){
                console.log("email is invalid");
            }
        });

});