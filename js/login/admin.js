const loginButton = document.querySelector(".login-button");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

loginButton.addEventListener("click", function(){
    let email = emailInput.value;
    let password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;
            console.log(user);
            database.ref("userpermissions/"+user.uid).once("value").then(function (snap) {
                let data = snap.val();
                console.log(data);

                if(data===null){
                    showAuthError("It appears you aren't an admin!");
                    return;
                }

                if (data.hasAdminConsoleAccess){
                    handleAuthAdminLogin(user,data);
                }else{
                    showAuthError("It appears you aren't an admin!");
                }
            });
        })
        .catch((error) => {
            showAuthError(handleAuthErrors(error));
        });
});

function handleAuthAdminLogin(user,perms){
    storeUserPermissions(perms)
    storeUser(user);
    console.log("logged in user");
    window.location.replace("../admin/adminConsole.html");
}

function showAuthError(msg){
    authErrorDisplayWrapper.style.display = "block"
    authErrorContent.innerHTML = msg;
}