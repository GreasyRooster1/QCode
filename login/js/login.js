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
            let errorType = handleAuthErrors(error.code,error.message);
            switch (errorType){
                case "invalid credentials": break;
                case "invalid email": break;
                case "ok": break;
            }
        });

});